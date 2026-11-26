# VDI Hamburger Bezirksverein e. V. – Young Engineers – Website

Website der Young Engineers im VDI Hamburger Bezirksverein e. V.: Termine (automatisch von vdi.de), Stammtisch-Karte, Mitmachen und Kontakt.

**Live:** https://young-engineers.vdi-hh.de (Test: https://vdiye.foerster.engineer)

- **Statisch mit [Hugo](https://gohugo.io)**: keine Datenbank, kein Backend
- **Datensparsam**: keine Cookies, kein Tracking, keine externen Ressourcen (Schriften lokal), kein Zugriffsprotokoll auf dem Server
- **Barrierearm**: WCAG 2.2 AA / EN 301 549 als Maßstab, Tastaturbedienung, Terminliste ohne JavaScript
- **VDI-CI**: Rajdhani und Nunito Sans, VDI-Blau `#003DA4`, Hellblau `#9DD0F4`, Orange `#FE5A00`, Young-Engineers-Signet

## Lokal starten

Voraussetzungen: [Hugo extended](https://gohugo.io/installation/) ab 0.160, Python ab 3.11 (nur für die Termine).

```sh
python3 tools/vdi_termine.py   # Termine von vdi.de holen → data/vdi.json (nicht im Git)
hugo server                    # http://localhost:1313
```

Ohne `data/vdi.json` baut die Seite trotzdem, dann nur mit eigenen Terminen.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `content/` | Seiten in Markdown: Startseite (`_index.md`), Impressum, Datenschutz, Barrierefreiheit, eigene Termine |
| `data/kontakt.yaml` | E-Mail, WhatsApp, Community-Link, Leitungsteam |
| `data/stammtische.yaml` | Vergangene Stammtische für Karte und Fotostreifen |
| `data/angebote.yaml` | Kacheln „Mehr vom VDI“ |
| `data/verein.yaml` | Angaben für Impressum und Datenschutz (Vorstand, Register) |
| `data/termine_anpassungen.yaml` | Termine von vdi.de ausblenden oder ergänzen (Icon, Hinweis, Tags) |
| `assets/fotos/`, `assets/team/` | Originalbilder; Hugo erzeugt verkleinerte WebP-Versionen |
| `assets/css/`, `assets/js/` | Gestaltung und Interaktion (Swipe-Karten, Karte, Quiz vor WhatsApp) |
| `layouts/` | Hugo-Templates |
| `static/fonts/` | Hausschriften als WOFF2 (SIL OFL 1.1) |
| `tools/vdi_termine.py` | Holt Termine von vdi.de (nur Python-Standardbibliothek), Einstellungen in `tools/vdi_termine.toml` |
| `deploy/` | Betrieb auf der Proxmox-VM: Build-Skript, systemd-Timer, Caddy ([Anleitung](deploy/README.md)) |

## Häufige Änderungen

**Stammtisch-Prognose:** `data/stammtisch.yaml` (letzter Dienstag im Monat, Feiertage, Ausfälle). Steht ein echter Termin auf vdi.de, ersetzt er die Prognose.

**Rückblick „Raus aus Hamburg“:** Formate in `data/formate.yaml`, Treffen in `data/ueberregional.yaml`, Fotos in `assets/rueckblick/`.

**Neuer Stammtisch auf der Karte:** Eintrag oben in `data/stammtische.yaml`, Foto (4:3) nach `assets/fotos/` und als `foto:` eintragen.

**Termin von vdi.de korrigieren oder ausblenden:** Slug aus der vdi.de-Adresse in `data/termine_anpassungen.yaml` eintragen.

**Eigener Termin, der nicht auf vdi.de steht:** neue Datei `content/termine/2026-12-29-stammtisch.md`:

```yaml
---
title: Young Engineers Netzwerktreffen Dezember
start: 2026-12-29T18:30:00+01:00
end: 2026-12-29T21:30:00+01:00
place: Name der Location
address: Straße 1, 20095 Hamburg
geo: [53.55, 9.99]
icon: stammtisch          # Namen siehe ICONS in assets/js/app.js
group: ye                 # ye, yenet, hh, nord
tags: [Erster Drink frei]
# url: https://www.vdi.de/…  # sobald es eine Anmeldeseite gibt
---
Erster Absatz der Beschreibung.

Zweiter Absatz.
```

**Vorstand oder Kontakt geändert:** `data/verein.yaml` bzw. `data/kontakt.yaml`.

## WhatsApp-Schutz (Quiz + ALTCHA)

WhatsApp ist der Hauptkontaktweg, die E-Mail-Adresse steht immer klein daneben. Nummer und Community-Link stehen nie im Klartext im HTML:

1. `tools/wa_schutz.py` erzeugt bei jedem Build eine neue [ALTCHA](https://altcha.org)-Aufgabe (Proof of Work, PBKDF2) und verschlüsselt die WhatsApp-Ziele mit einem Schlüssel, der nur aus deren Lösung entsteht → `data/wa_schutz.json` (nicht im Git).
2. Im Browser fragt ein Dialog, wofür V, D oder I in „VDI“ steht. Gleichzeitig löst das unsichtbare ALTCHA-Widget (selbst gehostet unter `static/js/altcha/`, MIT, ohne Cookies) die Aufgabe.
3. Erst wenn beides passt, werden die Links entschlüsselt und „WhatsApp öffnen“ erscheint.

Ohne `data/wa_schutz.json` (lokale Entwicklung) fällt die Seite auf Base64 zurück. Fragen: `QUIZ` in `assets/js/app.js`.

## Lizenz

- **Code** (Templates, CSS, JavaScript, Skripte): [MIT](LICENSE)
- **Inhalte** (Texte, Fotos, Porträts): alle Rechte vorbehalten, nicht unter der MIT-Lizenz
- **VDI-Logo und Young-Engineers-Signet**: Marken des VDI e. V., nicht frei verwendbar
- **Schriften** Rajdhani und Nunito Sans: [SIL Open Font License 1.1](static/fonts/OFL.txt)
- **Kartengeometrie**: © OpenStreetMap-Mitwirkende, [ODbL](https://www.openstreetmap.org/copyright)
- **ALTCHA** (`static/js/altcha/`): MIT-Lizenz, Version 3.5.0
