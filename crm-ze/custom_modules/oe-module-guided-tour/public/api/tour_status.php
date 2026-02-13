<?php

/**
 * crmZ.E Guided Tour - Status API
 *
 * GET  ?action=check  - Returns {"completed": true/false}
 * POST ?action=complete - Marks tour as completed for current user
 * POST ?action=reset    - Resets tour so it shows again
 */

require_once(__DIR__ . '/../../../../../globals.php');

header('Content-Type: application/json');

$userId = $_SESSION['authUserID'] ?? 0;
if (!$userId) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$action = $_REQUEST['action'] ?? 'check';
$label = 'crmze_tour_completed';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'check') {
    $row = sqlQuery(
        "SELECT setting_value FROM user_settings WHERE setting_user = ? AND setting_label = ?",
        [$userId, $label]
    );
    $completed = !empty($row) && $row['setting_value'] === '1';
    echo json_encode(['completed' => $completed]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'complete') {
    $existing = sqlQuery(
        "SELECT setting_value FROM user_settings WHERE setting_user = ? AND setting_label = ?",
        [$userId, $label]
    );
    if ($existing) {
        sqlStatement(
            "UPDATE user_settings SET setting_value = '1' WHERE setting_user = ? AND setting_label = ?",
            [$userId, $label]
        );
    } else {
        sqlStatement(
            "INSERT INTO user_settings (setting_user, setting_label, setting_value) VALUES (?, ?, '1')",
            [$userId, $label]
        );
    }
    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'reset') {
    sqlStatement(
        "DELETE FROM user_settings WHERE setting_user = ? AND setting_label = ?",
        [$userId, $label]
    );
    echo json_encode(['success' => true]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
}
