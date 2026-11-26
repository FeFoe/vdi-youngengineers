#!/usr/bin/env python3
"""Verschlüsselt die WhatsApp-Ziele für die Website mit einer ALTCHA-Rechenaufgabe (Proof of Work).

Schreibt data/wa_schutz.json (nicht im Git). Läuft vor jedem Build (deploy/aktualisieren.sh),
damit Aufgabe und Schlüssel regelmäßig wechseln. Nur Python-Standardbibliothek.

Ablauf: Es wird eine Zahl N gezogen. Die ALTCHA-Aufgabe verlangt, N durch Probieren zu finden
(PBKDF2/SHA-256, wie im ALTCHA-Widget v3). Die Links sind mit einem Schlüssel verschlüsselt,
der ebenfalls nur aus N (mit gleichem Rechenaufwand) entsteht. Ohne die Rechenarbeit gibt es
also weder Nummer noch Community-Link – auch nicht für Bots, die den Quelltext lesen.
"""
from __future__ import annotations

import hashlib
import hmac
import json
import re
import secrets
import sys
import urllib.parse
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
KOSTEN = 1500          # PBKDF2-Iterationen je Versuch
BEREICH = 4000         # N liegt zwischen 0 und BEREICH (Erwartung: BEREICH / 2 Versuche)


def kontakt() -> dict:
    """Liest „schlüssel: wert“-Zeilen aus data/kontakt.yaml und data/kontakt_whatsapp.yaml (nicht im Git)."""
    werte = {}
    for name in ("kontakt.yaml", "kontakt_whatsapp.yaml"):
        pfad = WURZEL / "data" / name
        if not pfad.exists():
            continue
        for zeile in pfad.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^(\w+):\s*(.+?)\s*(#.*)?$", zeile)
            if m:
                werte[m.group(1)] = m.group(2).strip('"\'')
    return werte


def pbkdf2(passwort: bytes, salz: bytes) -> bytes:
    return hashlib.pbkdf2_hmac("sha256", passwort, salz, KOSTEN, 32)


def verschluesseln(schluessel: bytes, name: str, klartext: str) -> dict:
    daten = klartext.encode("utf-8")
    strom = b"".join(hashlib.sha256(schluessel + i.to_bytes(4, "big")).digest() for i in range(len(daten) // 32 + 1))
    geheim = bytes(a ^ b for a, b in zip(daten, strom))
    pruef = hmac.new(schluessel, name.encode() + geheim, hashlib.sha256).hexdigest()
    return {"ct": geheim.hex(), "tag": pruef}


def main() -> int:
    k = kontakt()
    if "whatsapp" not in k or "community" not in k:
        print("data/kontakt_whatsapp.yaml fehlt (Vorlage: data/kontakt_whatsapp.beispiel.yaml), WhatsApp-Ziele nicht erzeugt.", file=sys.stderr)
        return 1
    nummer = k["whatsapp"]
    text = f"Hi {k.get('whatsappName', '')}, habt ihr gerade einen Rabattcode für die VDI-Mitgliedschaft?"
    ziele = {
        "nummer": nummer,
        "community": k["community"],
        "chat": f"https://wa.me/{nummer}",
        "rabatt": f"https://wa.me/{nummer}?text={urllib.parse.quote(text)}",
    }

    n = secrets.randbelow(BEREICH)
    nonce, salz, salz2 = secrets.token_bytes(16), secrets.token_bytes(16), secrets.token_bytes(16)
    passwort = nonce + n.to_bytes(4, "big")      # wie PasswordBuffer im ALTCHA-Worker (uint32, big endian)
    ziel_schluessel = pbkdf2(passwort, salz)       # ALTCHA sucht genau diesen Schlüssel
    link_schluessel = pbkdf2(passwort, salz2)      # entschlüsselt die Links, gleicher Aufwand

    ausgabe = {
        "challenge": {"parameters": {
            "algorithm": "PBKDF2/SHA-256", "nonce": nonce.hex(), "salt": salz.hex(),
            "cost": KOSTEN, "keyLength": 32, "keyPrefix": ziel_schluessel.hex(),
        }},
        "salt2": salz2.hex(),
        "ziele": {name: verschluesseln(link_schluessel, name, wert) for name, wert in ziele.items()},
    }
    pfad = WURZEL / "data" / "wa_schutz.json"
    pfad.write_text(json.dumps(ausgabe, indent=1), encoding="utf-8")
    print(f"WhatsApp-Ziele verschlüsselt: {pfad}".encode("ascii", "replace").decode())
    return 0


if __name__ == "__main__":
    sys.exit(main())
