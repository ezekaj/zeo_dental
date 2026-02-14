<?php

/**
 * crmZ.E Guided Tour Module Bootstrap
 *
 * Injects shepherd.js tour assets and a floating "Tour" button into the main tabs page.
 */

use OpenEMR\Events\Main\Tabs\RenderEvent;

$eventDispatcher->addListener(RenderEvent::EVENT_BODY_RENDER_POST, function () {
    $webroot = $GLOBALS['webroot'] ?? '';
    $modulePath = $webroot . '/interface/modules/custom_modules/oe-module-guided-tour';
    $userId = $_SESSION['authUserID'] ?? 0;

    $langCode = 'en';
    if (!empty($_SESSION['language_choice'])) {
        $langId = $_SESSION['language_choice'];
        $row = sqlQuery("SELECT lang_code FROM lang_languages WHERE lang_id = ?", [$langId]);
        if (!empty($row['lang_code'])) {
            $langCode = $row['lang_code'];
        }
    }

    $config = json_encode([
        'userId' => (int)$userId,
        'webroot' => $webroot,
        'modulePath' => $modulePath,
        'langCode' => $langCode,
    ]);

    $btnLabel = ($langCode === 'sq') ? 'Udh&euml;zuesi' : 'Tour';

    echo <<<HTML
<link rel="stylesheet" href="{$modulePath}/public/assets/shepherd/shepherd.min.css">
<link rel="stylesheet" href="{$modulePath}/public/assets/tour.css">
<script src="{$modulePath}/public/assets/shepherd/shepherd.min.js"></script>
<script>window.crmzeTourConfig = {$config};</script>
<script src="{$modulePath}/public/assets/tour.js"></script>
<button id="crmze-tour-btn" onclick="window.crmzeTourRestart()" title="{$btnLabel}" style="position:fixed;bottom:20px;right:20px;z-index:99999;width:50px;height:50px;border-radius:50%;background:#1a5276;color:#fff;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 10px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">?</button>
HTML;
});
