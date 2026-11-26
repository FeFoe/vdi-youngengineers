#!/usr/bin/env bash
# Holt den neuesten Stand aus Git, aktualisiert bei Bedarf die Termine von vdi.de und baut die Website.
# Läuft per systemd-Timer auf der VM (siehe deploy/README.md). Keine CI nötig.
#
#   aktualisieren.sh            # alle paar Minuten: nur bauen, wenn sich im Git etwas geändert hat
#   aktualisieren.sh --termine  # täglich: Termine neu holen und immer bauen
set -euo pipefail

REPO="${YE_REPO:-/srv/ye-website/repo}"
ZIEL="${YE_ZIEL:-/srv/ye-website/public}"
ZWEIG="${YE_ZWEIG:-main}"
export HUGO_BASEURL="${HUGO_BASEURL:-https://young-engineers.vdi-hh.de/}"

cd "$REPO"
vorher=$(git rev-parse HEAD)
git fetch --quiet origin "$ZWEIG"
git reset --quiet --hard "origin/$ZWEIG"
nachher=$(git rev-parse HEAD)

bauen=0
[ "$vorher" != "$nachher" ] && bauen=1
[ ! -d "$ZIEL" ] && bauen=1

if [ "${1:-}" = "--termine" ] || [ ! -f data/vdi.json ]; then
  # Fehler beim Abruf dürfen die Seite nicht leeren: alte data/vdi.json bleibt dann stehen
  if python3 tools/vdi_termine.py --ausgabe data/vdi.json.neu; then
    mv data/vdi.json.neu data/vdi.json
  else
    echo "Termine konnten nicht geholt werden, alter Stand bleibt." >&2
    rm -f data/vdi.json.neu
  fi
  bauen=1
fi

[ "$bauen" = 0 ] && exit 0

# WhatsApp-Ziele bei jedem Build mit neuer ALTCHA-Aufgabe verschlüsseln
python3 tools/wa_schutz.py || echo "WhatsApp-Ziele nicht verschlüsselt (data/kontakt_whatsapp.yaml fehlt?)" >&2

neu="$ZIEL.neu"
rm -rf "$neu"
hugo --gc --minify --cleanDestinationDir --destination "$neu"
# Atomar tauschen, damit nie eine halbe Seite ausgeliefert wird
if [ -d "$ZIEL" ]; then mv "$ZIEL" "$ZIEL.alt"; fi
mv "$neu" "$ZIEL"
rm -rf "$ZIEL.alt"
echo "Gebaut: $(git log -1 --format='%h %s')"
