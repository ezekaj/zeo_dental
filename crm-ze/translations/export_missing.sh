#!/bin/bash
# Export missing Albanian translations from ManagerCRM
set -e

CONTAINER="${COMPOSE_PROJECT_NAME:-crm-ze}-crm-ze-app-1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Exporting missing Albanian constants..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -N -e "
  SELECT lc.constant_name
  FROM lang_constants lc
  WHERE lc.cons_id NOT IN (
    SELECT cons_id FROM lang_definitions WHERE lang_id = 32
  )
  ORDER BY lc.cons_id;
" > "$SCRIPT_DIR/missing_constants.txt" 2>/dev/null

COUNT=$(wc -l < "$SCRIPT_DIR/missing_constants.txt" | tr -d ' ')
echo "Exported $COUNT missing constants to missing_constants.txt"
