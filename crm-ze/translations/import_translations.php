<?php

/**
 * crmZ.E Albanian Translation Importer
 *
 * Reads a CSV file (constant_name,definition) and inserts missing
 * Albanian translations into the lang_definitions table.
 *
 * Usage: php import_translations.php /path/to/translations.csv
 */

$csvFile = $argv[1] ?? '/tmp/albanian_translations.csv';
$langId = 32; // Albanian

$dbHost = getenv('DB_HOST') ?: 'crm-ze-db';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: 'root';
$dbName = getenv('DB_NAME') ?: 'openemr';

if (!file_exists($csvFile)) {
    echo "Error: CSV file not found: $csvFile\n";
    exit(1);
}

$pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$handle = fopen($csvFile, 'r');
if (!$handle) {
    echo "Error: Cannot open CSV file\n";
    exit(1);
}

// Skip header
$header = fgetcsv($handle, 0, ',', '"', '');

$stmtFind = $pdo->prepare("SELECT cons_id FROM lang_constants WHERE BINARY constant_name = ?");
$stmtCheck = $pdo->prepare("SELECT def_id FROM lang_definitions WHERE cons_id = ? AND lang_id = ?");
$stmtInsert = $pdo->prepare("INSERT INTO lang_definitions (cons_id, lang_id, definition) VALUES (?, ?, ?)");

$created = 0;
$skipped = 0;
$notFound = 0;

while (($row = fgetcsv($handle, 0, ',', '"', '')) !== false) {
    if (count($row) < 2) {
        $skipped++;
        continue;
    }

    $constant = trim($row[0]);
    $definition = trim($row[1]);

    if (empty($constant) || empty($definition)) {
        $skipped++;
        continue;
    }

    $stmtFind->execute([$constant]);
    $result = $stmtFind->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        $notFound++;
        continue;
    }

    $consId = $result['cons_id'];

    $stmtCheck->execute([$consId, $langId]);
    $existing = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        $skipped++;
        continue;
    }

    $stmtInsert->execute([$consId, $langId, $definition]);
    $created++;
}

fclose($handle);

echo "Import complete: Created=$created, Skipped=$skipped, NotFound=$notFound\n";
