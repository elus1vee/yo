#!/usr/bin/env bash
# Dumps the database and the uploads volume into ./backups (run from cron on the
# server). Keeps 14 days. Copy ./backups off the server too.
set -euo pipefail
cd "$(dirname "$0")/.."

out="${1:-backups}"
stamp="$(date +%F_%H%M)"
mkdir -p "$out"

docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' \
  | gzip > "$out/db_$stamp.sql.gz"
docker compose exec -T app tar czf - -C /app media > "$out/media_$stamp.tar.gz"

find "$out" -type f -mtime +14 -delete
echo "Backup written to $out/ ($stamp)"
