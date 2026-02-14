#!/bin/bash
# crmZ.E Setup Script
# Applies branding, guided tour, and Albanian translations to a running crmZ.E instance

set -e

CONTAINER="${COMPOSE_PROJECT_NAME:-crm-ze}-crm-ze-app-1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== crmZ.E Setup ==="
echo ""

# Wait for crmZ.E to be ready
echo "[1/10] Waiting for crmZ.E to start..."
until docker exec "$CONTAINER" curl -sf --insecure https://localhost/meta/health/readyz > /dev/null 2>&1; do
    sleep 10
    echo "  Still waiting..."
done
echo "  crmZ.E is ready!"

# Update application name in database
echo "[2/10] Setting application name to crmZ.E..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  UPDATE globals SET gl_value='crmZ.E' WHERE gl_name='openemr_name';
  UPDATE globals SET gl_value='crm-ze' WHERE gl_name='machine_name';
"

# Copy logos
echo "[3/10] Replacing logos..."
docker cp "$SCRIPT_DIR/branding/logos/login/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/login/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/menu/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/favicon/favicon.ico" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/favicon/favicon.ico
docker exec "$CONTAINER" rm -f /var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.svg

# Patch navbar link
echo "[4/10] Updating navbar brand link..."
docker exec "$CONTAINER" sed -i 's|href="https://www.open-emr.org" title="OpenEMR.*" rel="noopener" target="_blank"|href="/interface/main/tabs/main.php" title="crmZ.E"|g' /var/www/localhost/htdocs/openemr/interface/main/tabs/main.php

# Replace OpenEMR Foundation with Z.E Digital Tech in registration modal
echo "[5/10] Applying Z.E Digital Tech branding..."
docker exec "$CONTAINER" sed -i \
  -e 's/OpenEMR Foundation/Z.E Digital Tech/g' \
  -e 's/improving OpenEMR/improving crmZ.E/g' \
  /var/www/localhost/htdocs/openemr/templates/product_registration/product_registration_modal.html.twig
docker exec "$CONTAINER" sed -i \
  's/OpenEMR Product Registration/crmZ.E Registration/g' \
  /var/www/localhost/htdocs/openemr/templates/product_registration/product_reg.js.twig

# Install Guided Tour module
echo "[6/10] Installing Guided Tour module..."
MODULE_DIR="/var/www/localhost/htdocs/openemr/interface/modules/custom_modules/oe-module-guided-tour"
docker exec "$CONTAINER" mkdir -p "$MODULE_DIR/src" "$MODULE_DIR/public/assets/shepherd" "$MODULE_DIR/public/api"
docker cp "$SCRIPT_DIR/custom_modules/oe-module-guided-tour/." "$CONTAINER":"$MODULE_DIR/"
docker exec "$CONTAINER" chown -R apache:apache "$MODULE_DIR"
docker exec "$CONTAINER" chmod -R 755 "$MODULE_DIR"
# Register module in database
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  INSERT INTO modules (mod_name, mod_active, mod_ui_name, mod_relative_link, mod_directory, directory, mod_parent, mod_type, mod_description, mod_nick_name, type, date, sql_run, mod_ui_active, sql_version, acl_version)
  SELECT 'GuidedTour', 1, 'Guided Tour', '', 'oe-module-guided-tour', '', '', '', 'crmZ.E Guided Tour', '', 0, NOW(), 1, 0, '', ''
  FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM modules WHERE mod_directory = 'oe-module-guided-tour');
  UPDATE modules SET mod_active = 1 WHERE mod_directory = 'oe-module-guided-tour';
"
echo "  Guided Tour module installed!"

# Inject tour directly into main.php (bypasses module event system for reliability)
echo "[7/10] Injecting tour into main page..."
MAIN_PHP="/var/www/localhost/htdocs/openemr/interface/main/tabs/main.php"
docker exec "$CONTAINER" sed -i '/<\/body>/i\
<?php\
    $tourModulePath = $GLOBALS["webroot"] . "/interface/modules/custom_modules/oe-module-guided-tour";\
    $tourUserId = $_SESSION["authUserID"] ?? 0;\
    $tourLangCode = "en";\
    if (!empty($_SESSION["language_choice"])) {\
        $tourLangId = $_SESSION["language_choice"];\
        $tourRow = sqlQuery("SELECT lang_code FROM lang_languages WHERE lang_id = ?", [$tourLangId]);\
        if (!empty($tourRow["lang_code"])) { $tourLangCode = $tourRow["lang_code"]; }\
    }\
    $tourConfig = json_encode(["userId" => (int)$tourUserId, "webroot" => $GLOBALS["webroot"], "modulePath" => $tourModulePath, "langCode" => $tourLangCode]);\
    $tourBtnLabel = ($tourLangCode === "sq") ? "Udhëzuesi" : "Tour";\
?>\
<link rel="stylesheet" href="<?php echo attr($tourModulePath); ?>/public/assets/shepherd/shepherd.min.css">\
<link rel="stylesheet" href="<?php echo attr($tourModulePath); ?>/public/assets/tour.css">\
<script src="<?php echo attr($tourModulePath); ?>/public/assets/shepherd/shepherd.min.js"><\/script>\
<script>window.crmzeTourConfig = <?php echo $tourConfig; ?>;<\/script>\
<script src="<?php echo attr($tourModulePath); ?>/public/assets/tour.js"><\/script>\
<button id="crmze-tour-btn" onclick="window.crmzeTourRestart()" title="<?php echo attr($tourBtnLabel); ?>" style="position:fixed;bottom:20px;right:20px;z-index:99999;width:50px;height:50px;border-radius:50%;background:#1a5276;color:#fff;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">?<\/button>
' "$MAIN_PHP"
echo "  Tour injected into main.php!"

# Import Albanian translations
echo "[8/10] Importing Albanian translations..."
if [ -f "$SCRIPT_DIR/translations/albanian_translations.csv" ]; then
  docker cp "$SCRIPT_DIR/translations/albanian_translations.csv" "$CONTAINER":/tmp/albanian_translations.csv
  docker cp "$SCRIPT_DIR/translations/import_translations.php" "$CONTAINER":/tmp/import_translations.php
  docker exec "$CONTAINER" php /tmp/import_translations.php /tmp/albanian_translations.csv
  docker exec "$CONTAINER" rm -f /tmp/albanian_translations.csv /tmp/import_translations.php
  echo "  Albanian translations imported!"
else
  echo "  Skipped - albanian_translations.csv not found"
fi

# Set Albanian as default language
echo "[9/10] Configuring Albanian as default language..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  UPDATE globals SET gl_value = 'Albanian' WHERE gl_name = 'language_default';
"

# Clear template caches
echo "[10/10] Clearing caches..."
docker exec "$CONTAINER" rm -rf /var/www/localhost/htdocs/openemr/sites/default/documents/smarty/main/* 2>/dev/null || true
docker exec "$CONTAINER" rm -rf /var/www/localhost/htdocs/openemr/sites/default/documents/smarty/gacl/* 2>/dev/null || true

echo ""
echo "=== crmZ.E Setup Complete ==="
echo ""
echo "  URL:      http://localhost:${CRM_ZE_HTTP_PORT:-8300}"
echo "  Login:    admin / pass"
echo "  Language: Albanian (default)"
echo "  Tour:     Will start automatically on first login"
echo ""
