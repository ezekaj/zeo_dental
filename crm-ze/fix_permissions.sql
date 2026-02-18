-- ═══════════════════════════════════════════════════════════
-- Zeo Dental Clinic - Fix User Permissions
-- Grants all staff full access to clinical features
-- (appropriate for a small dental clinic with 2-3 users)
-- ═══════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────
-- 1. ADD ALL USERS TO ADMIN GROUP (full access)
-- ───────────────────────────────────────────────────────────
-- For a small clinic, all staff need access to:
-- patients, encounters, fee sheet, billing, calendar, forms

SET @admin_group = (SELECT id FROM gacl_aro_groups WHERE value = 'admin' LIMIT 1);

-- Add every user to the admin group (keeps existing group too)
INSERT IGNORE INTO gacl_groups_aro_map (group_id, aro_id)
SELECT @admin_group, ga.id FROM gacl_aro ga
WHERE ga.id NOT IN (
    SELECT aro_id FROM gacl_groups_aro_map WHERE group_id = @admin_group
);

-- ───────────────────────────────────────────────────────────
-- 2. ENABLE GLOBAL FEATURES needed for dental workflow
-- ───────────────────────────────────────────────────────────

-- Enable fee sheet
UPDATE globals SET gl_value = '1' WHERE gl_name = 'enable_fee_sheet' AND gl_value != '1';

-- Enable encounter forms
UPDATE globals SET gl_value = '1' WHERE gl_name = 'enable_encounter_form' AND gl_value != '1';

-- Enable calendar
UPDATE globals SET gl_value = '1' WHERE gl_name = 'disable_calendar' AND gl_value = '1';

-- Enable billing
UPDATE globals SET gl_value = '0' WHERE gl_name = 'disable_charge_sheet' AND gl_value = '1';

-- Enable patient notes
UPDATE globals SET gl_value = '1' WHERE gl_name = 'enable_patient_notes' AND gl_value != '1';

-- Allow any user to create encounters (not just physicians)
UPDATE globals SET gl_value = '0' WHERE gl_name = 'lock_encounters' AND gl_value = '1';

-- Disable forced password expiration (annoying for clinic staff)
UPDATE globals SET gl_value = '0' WHERE gl_name = 'password_expiration_days' AND gl_value != '0';

-- ───────────────────────────────────────────────────────────
-- 3. ENABLE ALL USERS AS PROVIDERS (can be assigned encounters)
-- ───────────────────────────────────────────────────────────

-- Set authorized flag so users can create/sign encounters
UPDATE users SET authorized = 1 WHERE active = 1 AND authorized = 0;

-- Set calendar UI flag so users appear in calendar
UPDATE users SET calendar = 1 WHERE active = 1 AND calendar = 0;

-- ───────────────────────────────────────────────────────────
-- 4. ENABLE DENTAL-RELEVANT MENU ITEMS
-- ───────────────────────────────────────────────────────────

-- Make sure Fee Sheet appears in encounter menu
UPDATE menu_entries SET menu_status = 1 WHERE menu_id IN (
    SELECT menu_id FROM (SELECT menu_id FROM menu_entries WHERE entry LIKE '%fee%' OR entry LIKE '%Fee%') tmp
);

-- Make sure Billing menu is visible
UPDATE menu_entries SET menu_status = 1 WHERE menu_id IN (
    SELECT menu_id FROM (SELECT menu_id FROM menu_entries WHERE entry LIKE '%bill%' OR entry LIKE '%Bill%') tmp
);

-- ───────────────────────────────────────────────────────────
-- 5. ENSURE ENCOUNTER FORM INCLUDES DENTAL CATEGORIES
-- ───────────────────────────────────────────────────────────

-- Activate all dental appointment categories
UPDATE openemr_postcalendar_categories SET pc_active = 1
WHERE pc_catname IN (
    'Pastrim Dentar', 'Ekzaminim Dentar', 'Mbushje Dentare',
    'Trajtim i Kanalit', 'Nxjerrje Dhëmbi', 'Kurorë Dentare',
    'Implant Dentar', 'Konsultë Ortodontike', 'Vizitë Ortodontike',
    'Zbardhim Dhëmbësh', 'Radiografi Dentare', 'Urgjencë Dentare',
    'Veshje Dentare', 'Protezë Dentare', 'Trajtim Periodontal',
    'Dental Pediatrike',
    -- Also English names in case translations haven't been applied yet
    'Dental Cleaning', 'Dental Exam', 'Filling', 'Root Canal',
    'Extraction', 'Crown', 'Implant', 'Orthodontic Consultation',
    'Orthodontic Visit', 'Teeth Whitening', 'Dental X-Ray',
    'Emergency Dental', 'Veneer', 'Denture', 'Periodontal Treatment',
    'Pediatric Dental'
);

-- ───────────────────────────────────────────────────────────
-- DONE
-- ───────────────────────────────────────────────────────────
SELECT 'Permissions fixed! Log out and log back in for changes to take effect.' AS result;
