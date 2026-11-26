#!/usr/bin/env bash
# Richtet die Website auf einer frischen Debian-VM/LXC ein (idempotent, erneut ausführbar).
#
#   sudo ./einrichten.sh --vorschau PASSWORT   # nicht indexiert, Passwortschutz (Benutzer: vdi)
#   sudo ./einrichten.sh --live                # öffentlich
#
# Umgebung (optional):
#   YE_DOMAINS="vdiye.foerster.engineer, young-engineers.vdi-hh.de"   Domains für Caddy
#   YE_BASEURL="https://vdiye.foerster.engineer/"                     Basis-URL der Website
#   YE_REPO_URL="https://github.com/FeFoe/vdi-youngengineers.git"
set -euo pipefail

MODUS="${1:-}"
PASSWORT="${2:-}"
case "$MODUS" in
  --vorschau) [ -n "$PASSWORT" ] || { echo "Passwort fehlt: --vorschau PASSWORT" >&2; exit 1; } ;;
  --live) ;;
  *) echo "Aufruf: $0 --vorschau PASSWORT | --live" >&2; exit 1 ;;
esac

HUGO_VERSION="0.169.0"
REPO_URL="${YE_REPO_URL:-https://github.com/FeFoe/vdi-youngengineers.git}"
DOMAINS="${YE_DOMAINS:-vdiye.foerster.engineer}"
BASEURL="${YE_BASEURL:-https://vdiye.foerster.engineer/}"
BASIS=/srv/ye-website

echo "== Pakete"
apt-get update -qq
apt-get install -y -qq git python3 caddy curl ca-certificates >/dev/null

if ! hugo version 2>/dev/null | grep -q "v${HUGO_VERSION}"; then
  echo "== Hugo ${HUGO_VERSION}"
  ARCH=$(dpkg --print-architecture)
  curl -fsSLo /tmp/hugo.deb "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${ARCH}.deb"
  apt-get install -y -qq /tmp/hugo.deb >/dev/null
  rm -f /tmp/hugo.deb
fi

echo "== Benutzer und Repository"
id ye-website >/dev/null 2>&1 || adduser --system --group --home "$BASIS" ye-website
install -d -o ye-website -g ye-website "$BASIS"
if [ ! -d "$BASIS/repo/.git" ]; then
  runuser -u ye-website -- git clone -q "$REPO_URL" "$BASIS/repo"
fi
chmod +x "$BASIS/repo/deploy/aktualisieren.sh"
if [ ! -f "$BASIS/repo/data/kontakt_whatsapp.yaml" ]; then
  runuser -u ye-website -- cp "$BASIS/repo/data/kontakt_whatsapp.beispiel.yaml" "$BASIS/repo/data/kontakt_whatsapp.yaml"
  echo "!! Bitte WhatsApp-Nummer und Community-Link eintragen: $BASIS/repo/data/kontakt_whatsapp.yaml"
fi

echo "== Umgebung (/etc/default/ye-website)"
VORSCHAU=0; [ "$MODUS" = "--vorschau" ] && VORSCHAU=1
cat > /etc/default/ye-website <<EOF
HUGO_BASEURL=$BASEURL
HUGO_VORSCHAU=$VORSCHAU
EOF

echo "== systemd"
cp "$BASIS/repo/deploy/systemd/"ye-* /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now ye-website.timer ye-termine.timer >/dev/null

echo "== Caddy"
mkdir -p /etc/systemd/system/caddy.service.d
cat > /etc/systemd/system/caddy.service.d/ye-domains.conf <<EOF
[Service]
Environment="YE_DOMAINS=$DOMAINS"
EOF
if [ "$VORSCHAU" = 1 ]; then
  HASH=$(caddy hash-password --plaintext "$PASSWORT")
  cat > /etc/caddy/ye-zugang.caddy <<EOF
basicauth {
	vdi $HASH
}
header X-Robots-Tag "noindex, nofollow"
EOF
else
  : > /etc/caddy/ye-zugang.caddy
fi
cp "$BASIS/repo/deploy/Caddyfile" /etc/caddy/Caddyfile
systemctl daemon-reload
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
systemctl restart caddy

echo "== Erster Build (mit Terminen)"
systemctl start ye-termine.service
systemctl --no-pager --lines=5 status ye-termine.service || true

echo "Fertig. Modus: $MODUS · Domains: $DOMAINS"
[ "$VORSCHAU" = 1 ] && echo "Zugang: Benutzer „vdi“, Passwort wie angegeben."
