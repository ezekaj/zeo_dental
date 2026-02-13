<?php

/**
 * crmZ.E Guided Tour Module Bootstrap
 *
 * Provides a first-time user guided tour for the crmZ.E interface.
 */

use OpenEMR\Modules\GuidedTour\Bootstrap;

$classLoader = new \OpenEMR\Core\ModulesClassLoader($GLOBALS['fileroot']);
$classLoader->registerNamespaceIfNotExists(
    'OpenEMR\\Modules\\GuidedTour\\',
    __DIR__ . DIRECTORY_SEPARATOR . 'src'
);

$bootstrap = new Bootstrap($eventDispatcher, $GLOBALS['kernel']);
$bootstrap->subscribeToEvents();
