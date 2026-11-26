#!/usr/bin/env python3
"""Holt Veranstaltungen von vdi.de und schreibt sie nach data/vdi.json.

Quellen und Regeln stehen in tools/vdi_termine.toml. Nur Python-Standardbibliothek (ab 3.11).

    python3 tools/vdi_termine.py                 # Termine holen, data/vdi.json schreiben
    python3 tools/vdi_termine.py --ohne-geo      # ohne Geokodierung (Nominatim)
    python3 tools/vdi_termine.py --max-seiten 2  # zum Testen

Die Website liest data/vdi.json beim Bauen (layouts/partials/termine.html).
"""
from __future__ import annotations

import argparse
import codecs
import datetime as dt
import html
import json
import math
import re
import sys
import time
import tomllib
import urllib.parse
import urllib.request
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
BASIS = "https://www.vdi.de"
DETAIL = "/mitgliedschaft/veranstaltungen/detail/"
HH = (53.5503, 9.9920)
MONATE = {m: i + 1 for i, m in enumerate(
    "januar februar märz april mai juni juli august september oktober november dezember".split())}


# ---------- Abruf ----------

def _cp1252_fallback(err: UnicodeDecodeError):
    """vdi.de liefert teils gemischt UTF-8 und Windows-1252: einzelne Bytes als cp1252 lesen."""
    return err.object[err.start:err.start + 1].decode("cp1252", errors="replace"), err.start + 1


codecs.register_error("cp1252_fallback", _cp1252_fallback)


class Abruf:
    def __init__(self, cfg: dict):
        self.ua = cfg["user_agent"]
        self.pause = float(cfg.get("pause_s", 1.0))
        self._letzter = 0.0

    def get(self, url: str, still: bool = False) -> str | None:
        warte = self.pause - (time.monotonic() - self._letzter)
        if warte > 0:
            time.sleep(warte)
        self._letzter = time.monotonic()
        req = urllib.request.Request(url, headers={"User-Agent": self.ua, "Accept-Language": "de"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", errors="cp1252_fallback")
        except Exception as e:  # noqa: BLE001 – einzelne Fehler dürfen den Lauf nicht abbrechen
            if not still:
                print(f"  ! {url}: {e}", file=sys.stderr)
            return None


# ---------- HTML-Helfer ----------

def text(fragment: str) -> str:
    fragment = re.sub(r"<(script|style|svg)\b.*?</\1\s*>", " ", fragment, flags=re.S | re.I)
    fragment = re.sub(r"<br\s*/?>", "\n", fragment, flags=re.I)
    fragment = re.sub(r"</(p|div|li|dd|h\d)>", "\n", fragment, flags=re.I)
    fragment = re.sub(r"<[^>]+>", " ", fragment)
    fragment = html.unescape(fragment).replace("\xa0", " ")
    zeilen = [re.sub(r"[ \t\r\f\v]+", " ", z).strip() for z in fragment.split("\n")]
    return "\n".join(z for z in zeilen if z)


def abschnitt(seite: str, klasse: str) -> str:
    """Inhalt des ersten Elements mit dieser CSS-Klasse (bis zum passenden schließenden Tag)."""
    m = re.search(r'<(\w+)[^>]*class="[^"]*\b' + re.escape(klasse) + r'\b[^"]*"[^>]*>', seite)
    if not m:
        return ""
    tag, pos, tiefe = m.group(1), m.end(), 1
    for t in re.finditer(r"<(/?)" + tag + r"\b[^>]*>", seite[pos:]):
        tiefe += -1 if t.group(1) else 1
        if tiefe == 0:
            return seite[pos:pos + t.start()]
    return seite[pos:]


# ---------- Zeit ----------

def berlin_offset(tag: dt.date, stunde: int = 12) -> str:
    """UTC-Offset für Europe/Berlin (EU-Sommerzeit: letzter So. im März bis letzter So. im Oktober)."""
    def letzter_sonntag(jahr: int, monat: int) -> dt.date:
        d = dt.date(jahr, monat, 31)
        return d - dt.timedelta(days=(d.weekday() + 1) % 7)
    beginn, ende = letzter_sonntag(tag.year, 3), letzter_sonntag(tag.year, 10)
    sommer = beginn < tag < ende or (tag == beginn and stunde >= 2) or (tag == ende and stunde < 3)
    return "+02:00" if sommer else "+01:00"


def datum(s: str) -> dt.date | None:
    m = re.search(r"(\d{1,2})\.(\d{1,2})\.(\d{4})", s)
    if m:
        return dt.date(int(m.group(3)), int(m.group(2)), int(m.group(1)))
    m = re.search(r"(\d{1,2})\.\s*([A-Za-zäÄ]+)\s+(\d{4})", s)
    if m and m.group(2).lower() in MONATE:
        return dt.date(int(m.group(3)), MONATE[m.group(2).lower()], int(m.group(1)))
    return None


def iso(tag: dt.date, hhmm: str) -> str:
    h, m = (int(x) for x in hhmm.split(":"))
    return f"{tag.isoformat()}T{h:02d}:{m:02d}:00{berlin_offset(tag, h)}"


# ---------- Geokodierung (optional, mit Zwischenspeicher) ----------

class Geo:
    def __init__(self, cfg: dict, abruf: Abruf, aktiv: bool):
        self.aktiv = aktiv and bool(cfg.get("geokodierung", True))
        self.abruf = abruf
        self.datei = WURZEL / ".cache" / "geo.json"
        try:
            self.cache = json.loads(self.datei.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            self.cache = {}

    def suche(self, adresse: str) -> list[float] | None:
        if not adresse:
            return None
        if adresse in self.cache:
            return self.cache[adresse]
        if not self.aktiv:
            return None
        q = urllib.parse.urlencode({"q": adresse, "format": "json", "limit": 1, "countrycodes": "de"})
        roh = self.abruf.get("https://nominatim.openstreetmap.org/search?" + q)
        try:
            treffer = json.loads(roh or "[]")
            wert = [round(float(treffer[0]["lat"]), 5), round(float(treffer[0]["lon"]), 5)] if treffer else None
        except (ValueError, KeyError, IndexError):
            wert = None
        self.cache[adresse] = wert
        return wert

    def speichern(self):
        self.datei.parent.mkdir(exist_ok=True)
        self.datei.write_text(json.dumps(self.cache, ensure_ascii=False, indent=1), encoding="utf-8")


def km(a, b) -> float:
    r = math.pi / 180
    h = math.sin((b[0] - a[0]) * r / 2) ** 2 + math.cos(a[0] * r) * math.cos(b[0] * r) * math.sin((b[1] - a[1]) * r / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))


# ---------- Liste und Detailseite ----------

def detail_links(seite: str) -> list[str]:
    return list(dict.fromkeys(re.findall(r'href="(' + re.escape(DETAIL) + r'[^"#?]+)"', seite)))


def detail(seite: str, url: str, cfg: dict) -> dict | None:
    titel = text(abschnitt(seite, "element-header")).split("\n")[0] if "element-header" in seite else ""
    seitenleiste = abschnitt(seite, "event-detail__sidebar")
    if not titel or not seitenleiste:
        return None
    felder = [text(dd) for dd in re.findall(r"<dd\b[^>]*>(.*?)</dd>", seitenleiste, flags=re.S)]
    start_tag = end_tag = None
    zeit_von = zeit_bis = None
    rest = []
    for f in felder:
        einzeilig = " ".join(f.split())
        if start_tag is None and re.fullmatch(r"\d{2}\.\d{2}\.\d{4}( ?- ?\d{2}\.\d{2}\.\d{4})?", einzeilig):
            tage = re.findall(r"\d{2}\.\d{2}\.\d{4}", einzeilig)
            start_tag, end_tag = datum(tage[0]), datum(tage[-1])
        elif zeit_von is None and re.fullmatch(r"\d{1,2}:\d{2}( ?- ?\d{1,2}:\d{2})? Uhr", einzeilig):
            zeiten = re.findall(r"\d{1,2}:\d{2}", einzeilig)
            zeit_von, zeit_bis = zeiten[0], (zeiten[1] if len(zeiten) > 1 else None)
        elif f and not re.match(r"(Ansprechperson|Anfahrt planen)", einzeilig):
            rest.append(f.split("\n"))
    if not start_tag:
        return None
    veranstalter = rest[0] if rest else []
    ort_zeilen = rest[1] if len(rest) > 1 else []
    inhalt = abschnitt(seite, "event-detail__content")
    absaetze = [text(p) for p in re.findall(r"<p\b[^>]*>(.*?)</p>", inhalt, flags=re.S)]
    absaetze = [" ".join(a.split()) for a in absaetze if a.strip()]
    volltext = " ".join(absaetze)

    slug = url.rstrip("/").rsplit("/", 1)[-1]
    mehrtaegig = end_tag and end_tag != start_tag
    e = {
        "id": slug,
        "title": titel,
        "org": " · ".join(veranstalter),
        "orgRoh": veranstalter,
        "place": ort_zeilen[0] if ort_zeilen else "",
        "address": ", ".join(ort_zeilen[1:]) if len(ort_zeilen) > 1 else "",
        "desc": absaetze[:6],
        "url": BASIS + DETAIL + slug,
    }
    if zeit_von and not mehrtaegig:
        e["start"] = iso(start_tag, zeit_von)
        e["end"] = iso(start_tag, zeit_bis) if zeit_bis else None
    else:
        e["allday"] = True
        e["start"] = start_tag.isoformat()
        e["end"] = (end_tag or start_tag).isoformat()

    m = re.search(r"Anmeldeschluss[^.]{0,40}?(\d{1,2}\.\s*(?:\d{1,2}\.|[A-Za-zäÄ]+)\s*\d{4})", volltext)
    if m and (d := datum(m.group(1))):
        e["deadline"] = f"{d.isoformat()}T23:59:00{berlin_offset(d)}"
    if re.search(r"\bausgebucht\b|Anmeldung (ist )?geschlossen", volltext, flags=re.I):
        e["closed"] = "Ausgebucht, die Anmeldung ist geschlossen"
    m = re.search(r"(noch \d+ (Rest)?plätze[^.]*)", volltext, flags=re.I)
    if m:
        e["spots"] = m.group(1)

    satz = re.split(r"(?<=[.!?])\s", volltext)
    teaser = ""
    for s in satz:
        if len(teaser) + len(s) > 220:
            break
        teaser = (teaser + " " + s).strip()
    e["teaser"] = teaser or volltext[:200]
    return e


def karten(seite: str, quelle: dict) -> list[dict]:
    """Termine direkt aus den Karten einer Übersicht lesen (für Detailseiten hinter /intern/,
    die laut robots.txt nicht abgerufen werden dürfen, z. B. VDI-Webinare)."""
    ergebnis = []
    for li in re.findall(r'<li class="item-list-item">(.*?)</li>\s*(?=<li class="item-list-item">|</ul>)', seite, flags=re.S):
        href = re.search(r'href="([^"]+)"', li)
        titel = re.search(r"<h6[^>]*>(.*?)</h6>", li, flags=re.S)
        tage = re.findall(r"\d{2}\.\d{2}\.\d{4}", text(li))
        if not (href and titel and tage):
            continue
        start, ende = datum(tage[0]), datum(tage[-1])
        teaser = re.search(r"<p>(.*?)</p>", li, flags=re.S)
        teaser = " ".join(text(teaser.group(1)).split()).rstrip("…") + "…" if teaser else ""
        slug = href.group(1).rstrip("/").rsplit("/", 1)[-1]
        ergebnis.append({
            "id": slug, "title": " ".join(text(titel.group(1)).split()),
            "allday": True, "zeitoffen": True, "start": start.isoformat(), "end": ende.isoformat(),
            "place": quelle.get("ort", "Online"), "address": "", "org": quelle.get("veranstalter", "VDI"),
            "teaser": teaser, "desc": [teaser] if teaser else [], "url": BASIS + quelle["pfad"],
            "group": quelle.get("gruppe", "vdi"), "mode": quelle.get("modus", "online"),
            "icon": quelle.get("icon", "gespraech"), "tags": quelle.get("tags", []),
        })
    return ergebnis


def typografie(t: str) -> str:
    """Halbgeviertstrich statt Bindestrich als Gedankenstrich, „e. V.“ mit Leerzeichen (DIN 5008)."""
    t = re.sub(r"\s-\s", " – ", t)
    return re.sub(r"\be\.V\.", "e. V.", t)


def arbeitskreise_laden() -> dict:
    """data/arbeitskreise.toml: gemeinsame Tabelle für Zuordnung (hier) und Auswahlliste (Hugo)."""
    datei = WURZEL / "data" / "arbeitskreise.toml"
    if not datei.exists():
        return {}
    tabelle = tomllib.loads(datei.read_text(encoding="utf-8"))
    return {k: {"ak": re.compile(v["ak"], flags=re.I), "stichworte": re.compile(v["stichworte"], flags=re.I)}
            for k, v in tabelle.items()}


def arbeitskreis_zuordnen(e: dict, zeilen: list[str], aks: dict) -> None:
    """Setzt e["ak"] (Schlüssel aus data/arbeitskreise.toml) und e["akArt"]:
    "ak"    – Arbeitskreis steht auf der Detailseite (Zeile „AK …“ / „Arbeitskreis …“), auch bei anderen BVs;
              e["akVon"] nennt dann den Bezirksverein, wenn es nicht Hamburg ist
    "thema" – kein Arbeitskreis angegeben, Stichworte in Titel oder Teaser passen (auch mehrere)"""
    if not aks or e.get("group") == "ye":
        return
    ak_zeilen = [z for z in zeilen if re.match(r"\s*(AK|Arbeitskreis)\b", z)]
    treffer = [k for k, r in aks.items() if any(r["ak"].search(z) for z in ak_zeilen)]
    if treffer:
        e["ak"], e["akArt"] = treffer[:1], "ak"
        bv = zeilen[0] if zeilen else ""
        if bv and not re.search(r"Hamburger Bezirksverein", bv, flags=re.I):
            e["akVon"] = typografie(bv)
        return
    text_ = e.get("title", "") + " " + e.get("teaser", "")
    treffer = [k for k, r in aks.items() if r["stichworte"].search(text_)]
    if treffer:
        e["ak"], e["akArt"] = treffer, "thema"


def einordnen(e: dict, cfg: dict, geo: Geo, aks: dict | None = None) -> dict:
    zeilen = e.pop("orgRoh", [])
    org = " ".join(zeilen)
    for feld in ("title", "org", "place", "teaser"):
        e[feld] = typografie(e.get(feld) or "")
    e["teaser"] = e["teaser"].rstrip(":").strip()
    regeln = cfg["gruppen"]
    if re.search(regeln["ye"], org, flags=re.I):
        e["group"] = "ye"
    elif re.search(regeln["yenet"], org + " " + e["title"], flags=re.I):
        e["group"] = "yenet"
    elif re.search(regeln["hh"], org, flags=re.I):
        e["group"] = "hh"
    else:
        e["group"] = "nord"

    online = re.search(r"\bonline\b|zoom|webex|teams", e["place"] + " " + e["title"], flags=re.I)
    if online and not e["address"]:
        e["mode"] = "online"
        e["place"] = e["place"] or "Online"
    else:
        e["geo"] = geo.suche(e["address"] or e["place"])
        plz_ort = re.search(r"\b(\d{5})\s+([^,]+)$", e["address"])
        if not e["geo"] and plz_ort:  # Rückfall: nur PLZ und Ort
            e["geo"] = geo.suche(f"{plz_ort.group(1)} {plz_ort.group(2)}")
        if e["geo"]:
            weit = km(HH, e["geo"]) > cfg.get("umland_km", 60)
        else:  # ohne Koordinaten: Hamburger PLZ (20xxx–22xxx) gilt als nah, alles andere als unterwegs
            weit = not (plz_ort and plz_ort.group(1)[:2] in ("20", "21", "22"))
            e.pop("geo")
        e["mode"] = "reise" if weit else "hh"
        if online:
            e["tags"] = ["Hybrid"]
        # Young-Engineers-Treffen in anderen Städten nicht wie eigene behandeln (sonst immer sichtbar)
        if e["group"] == "yenet" and e["mode"] == "reise" and not re.search(cfg.get("ye_bundesweit", "$^"), e["title"], flags=re.I):
            e["group"] = "nord"

    e["icon"] = "gespraech"
    for icon, muster in cfg["icons"].items():
        if re.search(muster, e["title"] + " " + e["teaser"], flags=re.I):
            e["icon"] = icon
            break
    e.setdefault("tags", [])
    arbeitskreis_zuordnen(e, zeilen, aks or {})
    return e


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--ohne-geo", action="store_true", help="keine Geokodierung über Nominatim")
    ap.add_argument("--max-seiten", type=int, default=None, help="Seiten je Liste begrenzen")
    ap.add_argument("--ausgabe", default=str(WURZEL / "data" / "vdi.json"))
    args = ap.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    cfg = tomllib.loads((WURZEL / "tools" / "vdi_termine.toml").read_text(encoding="utf-8"))
    abruf = Abruf(cfg)
    geo = Geo(cfg, abruf, not args.ohne_geo)
    heute = dt.date.today()
    ausschluss = re.compile(cfg["ausschliessen"], flags=re.I)
    aks = arbeitskreise_laden()

    links: list[str] = []
    for liste in cfg["listen"]:
        for nr in range(1, (args.max_seiten or liste.get("max_seiten", 5)) + 1):
            url = BASIS + liste["pfad"] + ("" if nr == 1 else f"/seite/{nr}")
            print(f"Liste {url}")
            seite = abruf.get(url, still=nr > 1)  # Ende der Blätterung liefert 404
            neu = [l for l in detail_links(seite or "") if l not in links]
            if not neu:
                break
            links += neu

    termine = []
    for pfad in links:
        slug = pfad.rsplit("/", 1)[-1]
        seite = abruf.get(BASIS + pfad)
        e = detail(seite or "", pfad, cfg)
        if not e:
            print(f"  – übersprungen (nicht lesbar): {slug}")
            continue
        ende = dt.date.fromisoformat(((e.get("end") or e["start"]))[:10])
        if ende < heute:
            continue
        if ausschluss.search(e["title"] + " " + " ".join(e["org"].split(" · "))):
            print(f"  – ausgeschlossen: {e['title']}")
            continue
        termine.append(einordnen(e, cfg, geo, aks))
        print(f"  + {e['start'][:10]} {e['title']}")

    # Übersichten, deren Karten direkt gelesen werden (Blättern über die Links der Seite, inkl. cHash)
    for quelle in cfg.get("karten", []):
        url, gesehen = BASIS + quelle["pfad"], set()
        for nr in range(1, quelle.get("max_seiten", 3) + 1):
            print(f"Karten {url}")
            seite = abruf.get(url) or ""
            neu = [e for e in karten(seite, quelle) if e["id"] not in gesehen]
            for e in neu:
                gesehen.add(e["id"])
                if dt.date.fromisoformat(e["end"]) >= heute and e["id"] not in {t["id"] for t in termine}:
                    arbeitskreis_zuordnen(e, [], aks)
                    termine.append(e)
                    print(f"  + {e['start']} {e['title']}")
            weiter = re.findall(r'href="([^"]*currentPage%5D=(\d+)[^"]*)"', seite)
            naechste = [html.unescape(h) for h, n in weiter if int(n) == nr + 1]
            if not neu or not naechste:
                break
            url = BASIS + naechste[0]

    geo.speichern()
    termine.sort(key=lambda x: x["start"])
    ausgabe = Path(args.ausgabe)
    ausgabe.parent.mkdir(parents=True, exist_ok=True)
    ausgabe.write_text(json.dumps({
        "stand": dt.datetime.now().astimezone().isoformat(timespec="seconds"),
        "quelle": "vdi.de",
        "termine": termine,
    }, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(termine)} Termine → {ausgabe}")
    return 0 if termine or not links else 1


if __name__ == "__main__":
    sys.exit(main())
