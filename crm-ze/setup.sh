#!/bin/bash
# ManagerCRM Setup Script
# Applies branding, guided tour, and Albanian translations to a running ManagerCRM instance

set -e

CONTAINER="${COMPOSE_PROJECT_NAME:-crm-ze}-crm-ze-app-1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== ManagerCRM Setup ==="
echo ""

# Wait for ManagerCRM to be ready
echo "[1/11] Waiting for ManagerCRM to start..."
until docker exec "$CONTAINER" curl -sf --insecure https://localhost/meta/health/readyz > /dev/null 2>&1; do
    sleep 10
    echo "  Still waiting..."
done
echo "  ManagerCRM is ready!"

# Update application name in database
echo "[2/11] Setting application name to ManagerCRM..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  UPDATE globals SET gl_value='ManagerCRM' WHERE gl_name='openemr_name';
  UPDATE globals SET gl_value='managercrm' WHERE gl_name='machine_name';
"

# Copy logos
echo "[3/11] Replacing logos..."
docker cp "$SCRIPT_DIR/branding/logos/login/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/login/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/menu/logo.png" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.png
docker cp "$SCRIPT_DIR/branding/logos/favicon/favicon.ico" "$CONTAINER":/var/www/localhost/htdocs/openemr/public/images/logos/core/favicon/favicon.ico
docker exec "$CONTAINER" rm -f /var/www/localhost/htdocs/openemr/public/images/logos/core/menu/primary/logo.svg

# Patch navbar link
echo "[4/11] Updating navbar brand link..."
docker exec "$CONTAINER" sed -i 's|href="https://www.open-emr.org" title="OpenEMR.*" rel="noopener" target="_blank"|href="/interface/main/tabs/main.php" title="ManagerCRM"|g' /var/www/localhost/htdocs/openemr/interface/main/tabs/main.php

# Replace OpenEMR Foundation with Z.E Digital Tech in registration modal
echo "[5/11] Applying Z.E Digital Tech branding..."
docker exec "$CONTAINER" sed -i \
  -e 's/OpenEMR Foundation/Z.E Digital Tech/g' \
  -e 's/improving OpenEMR/improving ManagerCRM/g' \
  /var/www/localhost/htdocs/openemr/templates/product_registration/product_registration_modal.html.twig
docker exec "$CONTAINER" sed -i \
  's/OpenEMR Product Registration/ManagerCRM Registration/g' \
  /var/www/localhost/htdocs/openemr/templates/product_registration/product_reg.js.twig

# Install Guided Tour module
echo "[6/11] Installing Guided Tour module..."
MODULE_DIR="/var/www/localhost/htdocs/openemr/interface/modules/custom_modules/oe-module-guided-tour"
docker exec "$CONTAINER" mkdir -p "$MODULE_DIR/src" "$MODULE_DIR/public/assets/shepherd" "$MODULE_DIR/public/api"
docker cp "$SCRIPT_DIR/custom_modules/oe-module-guided-tour/." "$CONTAINER":"$MODULE_DIR/"
docker exec "$CONTAINER" chown -R apache:apache "$MODULE_DIR"
docker exec "$CONTAINER" chmod -R 755 "$MODULE_DIR"
# Register module in database
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  INSERT INTO modules (mod_name, mod_active, mod_ui_name, mod_relative_link, mod_directory, directory, mod_parent, mod_type, mod_description, mod_nick_name, type, date, sql_run, mod_ui_active, sql_version, acl_version)
  SELECT 'GuidedTour', 1, 'Guided Tour', '', 'oe-module-guided-tour', '', '', '', 'ManagerCRM Guided Tour', '', 0, NOW(), 1, 0, '', ''
  FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM modules WHERE mod_directory = 'oe-module-guided-tour');
  UPDATE modules SET mod_active = 1 WHERE mod_directory = 'oe-module-guided-tour';
"
echo "  Guided Tour module installed!"

# Inject tour directly into main.php (bypasses module event system for reliability)
echo "[7/11] Injecting tour into main page..."
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
<link rel="stylesheet" href="<?php echo attr($tourModulePath); ?>/public/assets/helpbot.css">\
<script src="<?php echo attr($tourModulePath); ?>/public/assets/shepherd/shepherd.min.js"><\/script>\
<script>window.crmzeTourConfig = <?php echo $tourConfig; ?>;<\/script>\
<script src="<?php echo attr($tourModulePath); ?>/public/assets/tour.js"><\/script>\
<script src="<?php echo attr($tourModulePath); ?>/public/assets/helpbot.js"><\/script>
' "$MAIN_PHP"
echo "  Tour injected into main.php!"

# Import Albanian translations
echo "[8/11] Importing Albanian translations..."
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
echo "[9/11] Configuring Albanian as default language..."
docker exec "$CONTAINER" mysql -h crm-ze-db -u root -proot openemr -e "
  UPDATE globals SET gl_value = 'Albanian' WHERE gl_name = 'language_default';
"

# Remove all visible OpenEMR references from UI
echo "[10/11] Removing OpenEMR references from UI..."
# Login page app name
docker exec "$CONTAINER" sed -i "s/\$emr_app\['\*OpenEMR'\]/\$emr_app['\*ManagerCRM']/g" /var/www/localhost/htdocs/openemr/interface/login/login.php
# Login fallback
docker exec "$CONTAINER" sed -i 's/OpenEMR requires Javascript/ManagerCRM requires Javascript/g' /var/www/localhost/htdocs/openemr/interface/login_screen.php
# Globals fallback name
docker exec "$CONTAINER" sed -i "s/\$openemr_name = 'OpenEMR'/\$openemr_name = 'ManagerCRM'/g" /var/www/localhost/htdocs/openemr/interface/globals.php
docker exec "$CONTAINER" sed -i "s/OpenEMR Error : OpenEMR/ManagerCRM Error : ManagerCRM/g" /var/www/localhost/htdocs/openemr/interface/globals.php
# Error page templates
docker exec "$CONTAINER" sed -i 's/OpenEMR Error/ManagerCRM Error/g; s/OpenEMR 404 Error/ManagerCRM 404 Error/g; s/OpenEMR 400 Error/ManagerCRM 400 Error/g' /var/www/localhost/htdocs/openemr/templates/error/general_http_error.html.twig
docker exec "$CONTAINER" sed -i 's/OpenEMR 404 Error/ManagerCRM 404 Error/g' /var/www/localhost/htdocs/openemr/templates/error/404.html.twig /var/www/localhost/htdocs/openemr/templates/error/404.json.twig
docker exec "$CONTAINER" sed -i 's/OpenEMR 400 Error/ManagerCRM 400 Error/g' /var/www/localhost/htdocs/openemr/templates/error/400.html.twig /var/www/localhost/htdocs/openemr/templates/error/400.json.twig
# About page links
docker exec "$CONTAINER" sed -i 's|https://www.open-emr.org/donate|#|g; s|https://open-emr.org/wiki/index.php/OpenEMR_|#|g' /var/www/localhost/htdocs/openemr/templates/core/about.html.twig
docker exec "$CONTAINER" sed -i 's|open-emr.org/wiki/index.php/OpenEMR_|#|g' /var/www/localhost/htdocs/openemr/interface/main/about_page.php
# OAuth2 pages
docker exec "$CONTAINER" sed -i 's/OpenEMR Authorization/ManagerCRM Authorization/g; s/OpenEMR Login/ManagerCRM Login/g' /var/www/localhost/htdocs/openemr/templates/oauth2/patient-select.html.twig /var/www/localhost/htdocs/openemr/templates/oauth2/scope-authorize.html.twig /var/www/localhost/htdocs/openemr/templates/oauth2/oauth2-login.html.twig
# MFA page
docker exec "$CONTAINER" sed -i 's/your OpenEMR login password/your ManagerCRM login password/g' /var/www/localhost/htdocs/openemr/interface/usergroup/mfa_totp.php
# Admin emails
docker exec "$CONTAINER" sed -i 's/Administrator OpenEMR/Administrator ManagerCRM/g; s/Admin OpenEMR/Admin ManagerCRM/g' /var/www/localhost/htdocs/openemr/interface/usergroup/usergroup_admin.php

# Clear template caches
echo "[11/11] Clearing caches..."
docker exec "$CONTAINER" rm -rf /var/www/localhost/htdocs/openemr/sites/default/documents/smarty/main/* 2>/dev/null || true
docker exec "$CONTAINER" rm -rf /var/www/localhost/htdocs/openemr/sites/default/documents/smarty/gacl/* 2>/dev/null || true

echo ""
echo "=== ManagerCRM Setup Complete ==="
echo ""
echo "  URL:      http://localhost:${CRM_ZE_HTTP_PORT:-8300}"
echo "  Login:    admin / pass"
echo "  Language: Albanian (default)"
echo "  Tour:     Will start automatically on first login"
echo ""
