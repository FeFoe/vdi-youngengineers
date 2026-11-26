# Betrieb auf der Proxmox-VM

Ziel: Die VM baut die Seite selbst, ohne GitHub Actions. Ein systemd-Timer schaut alle 5 Minuten nach neuen Commits auf `main` und baut dann neu. Ein zweiter Timer holt zweimal täglich die Termine von vdi.de. Caddy liefert die fertigen Dateien mit automatischem HTTPS aus.

```
GitHub (main) ──git fetch──▶ VM: /srv/ye-website/repo ──hugo──▶ /srv/ye-website/public ──Caddy──▶ Internet
                               ▲
                 vdi.de ──tools/vdi_termine.py (05:30 Uhr, 17:30 Uhr)
```

## 1. VM einrichten (Debian 13)

Empfehlung: 1 vCPU, 1 GB RAM, 8 GB Speicher. Als LXC-Container geht es genauso.

```sh
apt update && apt install -y git python3 caddy
# Hugo extended in der Version aus README.md (Debian-Paket ist meist zu alt)
HUGO=0.169.0
curl -fsSLo /tmp/hugo.deb "https://github.com/gohugoio/hugo/releases/download/v${HUGO}/hugo_extended_${HUGO}_linux-amd64.deb"
apt install -y /tmp/hugo.deb && hugo version

adduser --system --group --home /srv/ye-website ye-website
sudo -u ye-website git clone https://github.com/OWNER/vdi-youngengineers.git /srv/ye-website/repo
chmod +x /srv/ye-website/repo/deploy/aktualisieren.sh
# WhatsApp-Nummer und Community-Link einmalig anlegen (nicht im Git)
sudo -u ye-website cp /srv/ye-website/repo/data/kontakt_whatsapp.beispiel.yaml /srv/ye-website/repo/data/kontakt_whatsapp.yaml
sudo -u ye-website nano /srv/ye-website/repo/data/kontakt_whatsapp.yaml
sudo -u ye-website /srv/ye-website/repo/deploy/aktualisieren.sh --termine   # erster Build
```

## 2. Timer aktivieren

```sh
cp /srv/ye-website/repo/deploy/systemd/* /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now ye-website.timer ye-termine.timer
systemctl list-timers 'ye-*'
journalctl -u ye-website -u ye-termine -n 50     # Protokoll
```

## 3. Caddy

```sh
cp /srv/ye-website/repo/deploy/Caddyfile /etc/caddy/Caddyfile
systemctl reload caddy
```

Caddy holt die Zertifikate selbst. Vorher müssen Port 80 und 443 aus dem Internet auf die VM zeigen (Portweiterleitung bzw. Proxmox-Firewall).

Zum Schreiben des Journals (Fehler beim Bauen) gilt die Standardaufbewahrung von journald. Für die Datenschutzerklärung („Fehlerprotokolle nach spätestens 7 Tagen gelöscht“): `/etc/systemd/journald.conf` → `MaxRetentionSec=7day`, dann `systemctl restart systemd-journald`.

## 4. DNS

| Name | Typ | Ziel |
|---|---|---|
| `vdiye.foerster.engineer` | A / AAAA | öffentliche IP der VM |
| `young-engineers.vdi-hh.de` | CNAME | `vdiye.foerster.engineer.` |

Den CNAME setzt, wer die Domain `vdi-hh.de` verwaltet (Geschäftsstelle des Bezirksvereins). Bis er steht, ist die Seite unter `vdiye.foerster.engineer` erreichbar. Caddy bekommt das Zertifikat für `young-engineers.vdi-hh.de` automatisch, sobald der CNAME auflöst.

Solange nur die Testadresse läuft, in beiden `.service`-Dateien `HUGO_BASEURL=https://vdiye.foerster.engineer/` setzen, damit Links und Kalender-Abo stimmen.

## Updates

Inhalte ändern = Commit auf `main`. Spätestens 5 Minuten später ist die Seite neu gebaut. Termine sofort neu holen:

```sh
systemctl start ye-termine.service
```
