#!/bin/bash
# crmZ.E Setup Script
# Applies branding to a running crmZ.E instance

set -e

CONTAINER="${COMPOSE_PROJECT_NAME:-crm-ze}-crm-ze-app-1"

echo "=== crmZ.E Setup ==="
echo ""

# Wait for crmZ.E to be ready
echo "[1/4] Waiting for crmZ.E to start..."
until docker exec "$CONTAINER" curl -sf --insecure https://localhost/meta/health/readyz > /dev/null 2>&1; do
    sleep 10
    echo "  Still waiting..."
done
echo "  crmZ.E is ready!"

# Update application name in database
echo "[2/4] Setting application name to crmZ.E..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  UPDATE globals SET gl_value='crmZ.E' WHERE gl_name='openemr_name';
  UPDATE globals SET gl_value='crm-ze' WHERE gl_name='machine_name';
"

# Copy logos
echo "[3/4] Replacing logos..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
docker cp "$SCRIPT_DIR/branding/logos/login/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/login/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/menu/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/favicon/favicon.ico" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/favicon/favicon.ico
# Remove old SVG menu logo if exists
docker exec "$CONTAINER" rm -f /var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.svg

# Patch navbar link
echo "[4/4] Updating navbar brand link..."
docker exec "$CONTAINER" sed -i 's|href="https://www.open-emr.org" title="OpenEMR.*" rel="noopener" target="_blank"|href="/interface/main/tabs/main.php" title="crmZ.E"|g' /var/www/localhost/htdocs/openemr/interface/main/tabs/main.php

echo ""
echo "=== crmZ.E Setup Complete ==="
echo ""
echo "  URL:      http://localhost:${CRM_ZE_HTTP_PORT:-8300}"
echo "  Login:    admin / pass"
echo ""
