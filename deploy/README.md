# Betrieb auf der VM

Die VM baut die Seite selbst. GitHub Actions prüft nur (siehe `.github/workflows/pruefen.yml`) und braucht keinen Zugang zur VM.

```
GitHub (main) ──git fetch alle 5 min──▶ /srv/ye-website/repo ──hugo──▶ /srv/ye-website/public ──Caddy──▶ Internet
                                          ▲
                        vdi.de ── tools/vdi_termine.py (05:30 Uhr, 17:30 Uhr)
```

## Einrichten (Debian 13, VM oder LXC)

Empfehlung: 1 vCPU, 1 GB RAM, 8 GB Speicher. Port 80 und 443 müssen aus dem Internet auf die VM zeigen.

```sh
curl -fsSLO https://raw.githubusercontent.com/FeFoe/vdi-youngengineers/main/deploy/einrichten.sh
sudo YE_DOMAINS="vdiye.foerster.engineer" YE_BASEURL="https://vdiye.foerster.engineer/" \
     bash einrichten.sh --vorschau vdi
```

Das Skript ist idempotent und erledigt alles:

- Pakete (git, python3, caddy) und Hugo extended in der passenden Version
- Systembenutzer `ye-website` und Klon des Repos nach `/srv/ye-website/repo`
- `data/kontakt_whatsapp.yaml` aus der Vorlage (danach echte Werte eintragen, siehe unten)
- systemd-Timer: `ye-website.timer` (alle 5 min neue Commits), `ye-termine.timer` (Termine zweimal täglich)
- Caddy mit automatischem HTTPS, ohne Zugriffsprotokoll
- erster Build

WhatsApp-Daten eintragen (einmalig, nicht im Git):

```sh
sudo -u ye-website nano /srv/ye-website/repo/data/kontakt_whatsapp.yaml
sudo systemctl start ye-termine.service     # neu bauen
```

## Vorschau oder live

| Modus | Aufruf | Wirkung |
|---|---|---|
| Vorschau | `einrichten.sh --vorschau PASSWORT` | Passwortschutz (Benutzer `vdi`), `robots.txt` verbietet alles, `noindex` in Meta-Tag und Header |
| Live | `einrichten.sh --live` | öffentlich, Suchmaschinen erlaubt |

Umschalten = Skript erneut mit dem anderen Modus aufrufen. Der Modus steht in `/etc/default/ye-website` (`HUGO_VORSCHAU`) und `/etc/caddy/ye-zugang.caddy`.

## Domains

| Name | Typ | Ziel |
|---|---|---|
| `vdiye.foerster.engineer` | A / AAAA | öffentliche IP der VM |
| `young-engineers.vdi-hh.de` | CNAME | `vdiye.foerster.engineer.` |

Sobald der CNAME steht (setzt die Geschäftsstelle des Bezirksvereins), das Skript erneut aufrufen:

```sh
sudo YE_DOMAINS="young-engineers.vdi-hh.de, vdiye.foerster.engineer" YE_BASEURL="https://young-engineers.vdi-hh.de/" \
     bash /srv/ye-website/repo/deploy/einrichten.sh --live
```

## Alltag

```sh
systemctl list-timers 'ye-*'                      # nächste Läufe
journalctl -u ye-website -u ye-termine -n 50      # Protokoll
sudo systemctl start ye-website.service           # sofort neu bauen
sudo systemctl start ye-termine.service           # Termine sofort neu holen
```

Für die Datenschutzerklärung („Fehlerprotokolle nach spätestens 7 Tagen gelöscht“): in `/etc/systemd/journald.conf` `MaxRetentionSec=7day` setzen, dann `systemctl restart systemd-journald`.
