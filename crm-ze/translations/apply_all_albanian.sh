#!/bin/bash
# ============================================
# ManagerCRM - Apply All Albanian Translations
# ============================================
#
# Run this script on the machine where the CRM is running.
# It will apply all Albanian translations, CDT code translations,
# fee updates, and UI fixes in the correct order.
#
# Usage:
#   chmod +x apply_all_albanian.sh
#   ./apply_all_albanian.sh
#
# Or if using Docker:
#   docker exec -i crm-ze-crm-ze-app-1 bash < apply_all_albanian.sh
#

# Configuration - adjust these if your setup differs
CONTAINER="crm-ze-crm-ze-app-1"
DB_USER="root"
DB_PASS="root"
DB_NAME="openemr"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "============================================"
echo "ManagerCRM Albanian Translation Installer"
echo "============================================"
echo ""

# Function to run SQL file
run_sql() {
    local file="$1"
    local desc="$2"
    if [ -f "$file" ]; then
        echo "[+] $desc..."
        if command -v docker &> /dev/null && docker ps -q --filter "name=$CONTAINER" | grep -q .; then
            # Docker mode
            docker exec -i "$CONTAINER" mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$file" 2>/dev/null
        else
            # Direct MySQL mode
            mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$file" 2>/dev/null
        fi
        echo "    Done."
    else
        echo "[!] Skipped: $file (not found)"
    fi
}

# Step 1: Update fee schedule (CDT code prices)
run_sql "$SCRIPT_DIR/../update_fees.sql" "Updating fee schedule with clinic prices"

# Step 2: Setup dental chart form (Kartela Dentare - patient intake)
run_sql "$SCRIPT_DIR/../setup_dental_chart.sql" "Creating Kartela Dentare form (medical history, consent)"

# Step 3: Translate all dental-specific content (CDT codes, appointment categories, document categories)
run_sql "$SCRIPT_DIR/translate_all_dental.sql" "Translating dental codes and categories to Albanian"

# Step 4: Fix Albanian UI translations (Provider→Doktor, OpenEMR→ManagerCRM, etc.)
run_sql "$SCRIPT_DIR/fix_albanian_ui.sql" "Fixing Albanian UI translations"

# Step 5: Import 9,543 Albanian UI translations from CSV
echo "[+] Importing Albanian UI translations from CSV..."
CSV_FILE="$SCRIPT_DIR/albanian_translations.csv"
if [ -f "$CSV_FILE" ]; then
    if command -v docker &> /dev/null && docker ps -q --filter "name=$CONTAINER" | grep -q .; then
        # Docker mode - copy CSV and run PHP inside container
        docker cp "$CSV_FILE" "$CONTAINER:/tmp/albanian_translations.csv"
        docker cp "$SCRIPT_DIR/import_translations.php" "$CONTAINER:/tmp/import_translations.php"
        docker exec "$CONTAINER" php /tmp/import_translations.php /tmp/albanian_translations.csv
    else
        # Direct PHP mode
        php "$SCRIPT_DIR/import_translations.php" "$CSV_FILE"
    fi
    echo "    Done."
else
    echo "[!] Skipped: albanian_translations.csv (not found)"
fi

echo ""
echo "============================================"
echo "All Albanian translations applied!"
echo ""
echo "Next steps:"
echo "1. Log out of ManagerCRM"
echo "2. Log back in and select 'Albanian' as the language"
echo "3. All menus, dental codes, and UI should now be in Albanian"
echo "============================================"
