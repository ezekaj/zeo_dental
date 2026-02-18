-- ═══════════════════════════════════════════════════════════
-- Zeo Dental Clinic - Kartela Dentare (Dental Chart Form)
-- Creates a custom patient intake form matching the clinic's
-- paper dental chart (KARTELE DENTARE)
-- ═══════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────
-- 1. CREATE YES/NO LIST (Po/Jo) for radio buttons
-- ───────────────────────────────────────────────────────────

INSERT IGNORE INTO list_options (list_id, option_id, title, seq, is_default, activity)
VALUES
('lists', 'yesno_sq', 'Po/Jo', 0, 0, 1);

INSERT IGNORE INTO list_options (list_id, option_id, title, seq, is_default, activity)
VALUES
('yesno_sq', 'Po', 'Po', 10, 0, 1),
('yesno_sq', 'Jo', 'Jo', 20, 1, 1);

-- ───────────────────────────────────────────────────────────
-- 2. REGISTER THE LBF FORM
-- ───────────────────────────────────────────────────────────

-- Register in the encounter forms list
INSERT IGNORE INTO list_options (list_id, option_id, title, seq, is_default, activity, option_value)
VALUES
('lbfnames', 'LBFdental', 'Kartela Dentare', 10, 0, 1, 3);

-- Register in the forms registry
INSERT IGNORE INTO registry (name, state, directory, sql_run, unpackaged, category, date, priority, aco_spec)
VALUES
('Kartela Dentare', 1, 'LBFdental', 1, 1, 'Clinical', NOW(), 0, 'encounters|notes');

-- ───────────────────────────────────────────────────────────
-- 3. DEFINE FORM FIELDS (layout_options)
-- ───────────────────────────────────────────────────────────

-- Clean up any existing fields for this form
DELETE FROM layout_options WHERE form_id = 'LBFdental';

-- ═══════════════════════════════════════
-- GROUP 1: Anamneza Mjekësore (Medical History)
-- ═══════════════════════════════════════

INSERT INTO layout_options
(form_id, field_id, group_id, title, seq, data_type, uor, fld_length, max_length, list_id, titlecols, datacols, default_value, edit_options, description, fld_rows)
VALUES
-- Cardiovascular
('LBFdental', 'kardiovaskulare', '1Anamneza Mjekësore', 'Sëmundje kardiovaskulare', 10, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Sëmundje të zemrës dhe enëve të gjakut', 0),

-- Blood diseases
('LBFdental', 'semundje_gjaku', '1Anamneza Mjekësore', 'Sëmundje të gjakut', 20, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Anemi, hemofili, etj.', 0),

-- Pulmonary
('LBFdental', 'pulmonare', '1Anamneza Mjekësore', 'Sëmundje pulmonare (astma etj)', 30, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Astmë, bronkit kronik, etj.', 0),

-- Kidney
('LBFdental', 'renale', '1Anamneza Mjekësore', 'Sëmundje renale', 40, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Sëmundje të veshkave', 0),

-- Liver
('LBFdental', 'hepatit', '1Anamneza Mjekësore', 'Sëmundje të heparit (hepatit etj)', 50, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Hepatit, cirrozë, etj.', 0),

-- Tumoral
('LBFdental', 'tumorale', '1Anamneza Mjekësore', 'Sëmundje tumorale', 60, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Kancer ose tumore', 0),

-- Thyroid
('LBFdental', 'tiroides', '1Anamneza Mjekësore', 'Sëmundje të tiroides', 70, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Hipertiroidizëm, hipotiroidizëm', 0),

-- Neurological
('LBFdental', 'neurologjike', '1Anamneza Mjekësore', 'Sëmundje neurologjike (depresion, ankth, epilepsi)', 80, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Depresion, ankthi, epilepsi, etj.', 0),

-- GI tract
('LBFdental', 'gastrointestinale', '1Anamneza Mjekësore', 'Sëmundje të traktit gastrointestinal', 90, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Ulçerë, refluks, etj.', 0),

-- Infectious
('LBFdental', 'infektive', '1Anamneza Mjekësore', 'Sëmundje infektive (SST, HIV/AIDS etj)', 100, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'HIV, Hepatit B/C, SST', 0),

-- Diabetes
('LBFdental', 'diabet', '1Anamneza Mjekësore', 'Diabet', 110, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Diabet tipi 1 ose 2', 0),

-- Tuberculosis
('LBFdental', 'tuberkuloz', '1Anamneza Mjekësore', 'Tuberkuloz', 120, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Tuberkuloz aktive ose e kaluar', 0),

-- Sinus problems
('LBFdental', 'sinuset', '1Anamneza Mjekësore', 'Probleme me sinuset', 130, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Sinuzit kronik', 0),

-- Arthritis/Osteoporosis
('LBFdental', 'artrit', '1Anamneza Mjekësore', 'Artrit / Osteoporozë', 140, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Artrit, osteoporozë', 0),

-- Drug addiction
('LBFdental', 'droga', '1Anamneza Mjekësore', 'Varësi ndaj drogërave', 150, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', '', 0),

-- Tobacco
('LBFdental', 'duhan', '1Anamneza Mjekësore', 'Duhan', 160, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Pirës aktiv i duhanit', 0),

-- Alcohol
('LBFdental', 'alkol', '1Anamneza Mjekësore', 'Alkol', 170, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Përdorim i rregullt i alkoolit', 0),

-- Pregnant
('LBFdental', 'shtatzene', '1Anamneza Mjekësore', 'Shtatzënë', 180, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Vetëm për paciente femra', 0),

-- Allergies
('LBFdental', 'alergji', '1Anamneza Mjekësore', 'Alergji (medikamente, anestezia, latex etj)', 190, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', 'Alergji ndaj medikamenteve, anestezisë, lateksit, etj.', 0);

-- ═══════════════════════════════════════
-- GROUP 2: Historiku Kirurgjikal & Mjekimor
-- ═══════════════════════════════════════

INSERT INTO layout_options
(form_id, field_id, group_id, title, seq, data_type, uor, fld_length, max_length, list_id, titlecols, datacols, default_value, edit_options, description, fld_rows)
VALUES
-- Previous surgeries yes/no
('LBFdental', 'kirurgji_para', '2Historiku', 'A i jeni nënshtruar ndonjë ndërhyrjeje kirurgjikale?', 10, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', '', 0),

-- Surgery details
('LBFdental', 'kirurgji_detaje', '2Historiku', 'Lloji i ndërhyrjes kirurgjikale', 20, 2, 1, 60, 255, '', 1, 3, '', '', 'Përshkruani ndërhyrjen kirurgjikale nëse ka', 2),

-- Current medications yes/no
('LBFdental', 'mjekim_para', '2Historiku', 'A merrni ndonjë mjekim?', 30, 27, 1, 0, 0, 'yesno_sq', 1, 1, 'Jo', '', '', 0),

-- Medication details
('LBFdental', 'mjekim_detaje', '2Historiku', 'Medikamentet që merrni', 40, 2, 1, 60, 255, '', 1, 3, '', '', 'Listoni medikamentet aktuale', 2),

-- Allergy details
('LBFdental', 'alergji_detaje', '2Historiku', 'Detaje mbi alergjitë', 50, 2, 1, 60, 255, '', 1, 3, '', '', 'Përshkruani alergjitë nëse ka', 2),

-- General notes
('LBFdental', 'shenime', '2Historiku', 'Shënime të tjera', 60, 2, 1, 60, 500, '', 1, 3, '', '', 'Shënime shtesë mjekësore', 3);

-- ═══════════════════════════════════════
-- GROUP 3: Pëlqimi (Consent)
-- ═══════════════════════════════════════

INSERT INTO layout_options
(form_id, field_id, group_id, title, seq, data_type, uor, fld_length, max_length, list_id, titlecols, datacols, default_value, edit_options, description, fld_rows)
VALUES
-- Consent checkbox
('LBFdental', 'pelqimi', '3Pëlqimi', 'Pacienti ka lexuar dhe pranuar formularin e pëlqimit', 10, 21, 1, 0, 0, '', 1, 3, '', '', 'Pacienti konfirmon që ka lexuar, kuptuar dhe pranuar kushtet e trajtimit', 0),

-- Parent/guardian consent
('LBFdental', 'pelqimi_prind', '3Pëlqimi', 'Nënshkrimi i prindit/kujdestarit (nëse pacient i mitur)', 20, 2, 1, 40, 100, '', 1, 3, '', '', 'Plotësohet vetëm nëse pacienti është nën 18 vjeç', 1),

-- Photo consent
('LBFdental', 'pelqimi_foto', '3Pëlqimi', 'Autorizim për fotografi para/pas trajtimit', 30, 21, 1, 0, 0, '', 1, 3, '', '', 'Pacienti autorizon fotografimin para dhe pas trajtimit për qëllime informative-shkencore', 0);

-- ═══════════════════════════════════════════════════════════
-- 4. ENCOUNTER FORM SIMPLIFICATION
-- ═══════════════════════════════════════════════════════════

-- Hide confusing/irrelevant fields from the encounter form
-- Sensitivity field (not needed for dental)
UPDATE layout_options SET uor = 0 WHERE form_id = 'NE' AND field_id = 'sensitivity';

-- Referral source (not relevant)
UPDATE layout_options SET uor = 0 WHERE form_id = 'NE' AND field_id = 'referral_source';

-- Onset date (confusing for receptionist)
UPDATE layout_options SET uor = 0 WHERE form_id = 'NE' AND field_id = 'onset_date';

-- Make key encounter fields Albanian
UPDATE layout_options SET title = 'Data e Vizitës' WHERE form_id = 'NE' AND field_id = 'date';
UPDATE layout_options SET title = 'Arsyeja e Vizitës' WHERE form_id = 'NE' AND field_id = 'reason';
UPDATE layout_options SET title = 'Klinika' WHERE form_id = 'NE' AND field_id = 'facility_id';
UPDATE layout_options SET title = 'Klinika e Faturimit' WHERE form_id = 'NE' AND field_id = 'billing_facility';
UPDATE layout_options SET title = 'Doktori' WHERE form_id = 'NE' AND field_id = 'provider_id';
UPDATE layout_options SET title = 'Kategoria' WHERE form_id = 'NE' AND field_id = 'pc_catid';
UPDATE layout_options SET title = 'Dhëmbi/Zona' WHERE form_id = 'NE' AND field_id = 'pos_code';

-- ═══════════════════════════════════════════════════════════
-- 5. SIMPLIFY DEMOGRAPHICS FORM - Albanian Labels
-- ═══════════════════════════════════════════════════════════

-- Patient demographics - make labels Albanian for key fields
UPDATE layout_options SET title = 'Emër' WHERE form_id = 'DEM' AND field_id = 'fname';
UPDATE layout_options SET title = 'Mbiemër' WHERE form_id = 'DEM' AND field_id = 'lname';
UPDATE layout_options SET title = 'Datëlindje' WHERE form_id = 'DEM' AND field_id = 'DOB';
UPDATE layout_options SET title = 'Gjinia' WHERE form_id = 'DEM' AND field_id = 'sex';
UPDATE layout_options SET title = 'Numër Telefoni' WHERE form_id = 'DEM' AND field_id = 'phone_home';
UPDATE layout_options SET title = 'Celular' WHERE form_id = 'DEM' AND field_id = 'phone_cell';
UPDATE layout_options SET title = 'E-mail' WHERE form_id = 'DEM' AND field_id = 'email';
UPDATE layout_options SET title = 'Adresa' WHERE form_id = 'DEM' AND field_id = 'street';
UPDATE layout_options SET title = 'Qyteti' WHERE form_id = 'DEM' AND field_id = 'city';
UPDATE layout_options SET title = 'Shteti' WHERE form_id = 'DEM' AND field_id = 'state';
UPDATE layout_options SET title = 'Kodi Postar' WHERE form_id = 'DEM' AND field_id = 'postal_code';
UPDATE layout_options SET title = 'Profesioni' WHERE form_id = 'DEM' AND field_id = 'occupation';
UPDATE layout_options SET title = 'Statusi Martesor' WHERE form_id = 'DEM' AND field_id = 'status';
UPDATE layout_options SET title = 'Emri i Mesëm' WHERE form_id = 'DEM' AND field_id = 'mname';
UPDATE layout_options SET title = 'Numri i Kartelës' WHERE form_id = 'DEM' AND field_id = 'pubpid';
UPDATE layout_options SET title = 'Gjuha' WHERE form_id = 'DEM' AND field_id = 'language';
UPDATE layout_options SET title = 'Raca' WHERE form_id = 'DEM' AND field_id = 'race';
UPDATE layout_options SET title = 'Përkatësia Etnike' WHERE form_id = 'DEM' AND field_id = 'ethnicity';
UPDATE layout_options SET title = 'Kontakti Urgjent' WHERE form_id = 'DEM' AND field_id = 'emergency_contact';
UPDATE layout_options SET title = 'Telefoni Urgjent' WHERE form_id = 'DEM' AND field_id = 'emergency_phone';

-- Hide irrelevant US-specific demographic fields
UPDATE layout_options SET uor = 0 WHERE form_id = 'DEM' AND field_id = 'ss';           -- SSN
UPDATE layout_options SET uor = 0 WHERE form_id = 'DEM' AND field_id = 'drivers_license'; -- Driver's license
UPDATE layout_options SET uor = 0 WHERE form_id = 'DEM' AND field_id = 'race';          -- Race (US-specific)
UPDATE layout_options SET uor = 0 WHERE form_id = 'DEM' AND field_id = 'ethnicity';     -- Ethnicity (US-specific)

-- ═══════════════════════════════════════════════════════════
-- 6. TRANSLATE GROUP NAMES (Tab Headers)
-- ═══════════════════════════════════════════════════════════

-- Demographics form group names
UPDATE layout_options SET group_id = REPLACE(group_id, 'Who', 'Identiteti') WHERE form_id = 'DEM' AND group_id LIKE '%Who%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Contact', 'Kontakti') WHERE form_id = 'DEM' AND group_id LIKE '%Contact%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Choices', 'Zgjedhjet') WHERE form_id = 'DEM' AND group_id LIKE '%Choices%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Employer', 'Punëdhënësi') WHERE form_id = 'DEM' AND group_id LIKE '%Employer%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Stats', 'Statistikat') WHERE form_id = 'DEM' AND group_id LIKE '%Stats%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Misc', 'Të Tjera') WHERE form_id = 'DEM' AND group_id LIKE '%Misc%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Guardian', 'Kujdestari') WHERE form_id = 'DEM' AND group_id LIKE '%Guardian%';

-- Insurance group names (already optional from setup_dental.sql)
UPDATE layout_options SET group_id = REPLACE(group_id, 'Primary Insurance', 'Siguracioni Primar') WHERE form_id = 'DEM' AND group_id LIKE '%Primary Insurance%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Secondary Insurance', 'Siguracioni Sekondar') WHERE form_id = 'DEM' AND group_id LIKE '%Secondary Insurance%';
UPDATE layout_options SET group_id = REPLACE(group_id, 'Tertiary Insurance', 'Siguracioni Terciar') WHERE form_id = 'DEM' AND group_id LIKE '%Tertiary Insurance%';

-- ═══════════════════════════════════════════════════════════
-- 7. ADD TOOTH NUMBER LIST (for encounter tracking)
-- ═══════════════════════════════════════════════════════════

INSERT IGNORE INTO list_options (list_id, option_id, title, seq, is_default, activity)
VALUES ('lists', 'teeth_sq', 'Dhëmbët (Numrat)', 0, 0, 1);

INSERT IGNORE INTO list_options (list_id, option_id, title, seq, is_default, activity)
VALUES
('teeth_sq', '11', '11 - Inciziv qendror sipër djathtas', 10, 0, 1),
('teeth_sq', '12', '12 - Inciziv anësor sipër djathtas', 20, 0, 1),
('teeth_sq', '13', '13 - Kanin sipër djathtas', 30, 0, 1),
('teeth_sq', '14', '14 - Premolar 1 sipër djathtas', 40, 0, 1),
('teeth_sq', '15', '15 - Premolar 2 sipër djathtas', 50, 0, 1),
('teeth_sq', '16', '16 - Molar 1 sipër djathtas', 60, 0, 1),
('teeth_sq', '17', '17 - Molar 2 sipër djathtas', 70, 0, 1),
('teeth_sq', '18', '18 - Molar 3 (pjekurie) sipër djathtas', 80, 0, 1),
('teeth_sq', '21', '21 - Inciziv qendror sipër majtas', 90, 0, 1),
('teeth_sq', '22', '22 - Inciziv anësor sipër majtas', 100, 0, 1),
('teeth_sq', '23', '23 - Kanin sipër majtas', 110, 0, 1),
('teeth_sq', '24', '24 - Premolar 1 sipër majtas', 120, 0, 1),
('teeth_sq', '25', '25 - Premolar 2 sipër majtas', 130, 0, 1),
('teeth_sq', '26', '26 - Molar 1 sipër majtas', 140, 0, 1),
('teeth_sq', '27', '27 - Molar 2 sipër majtas', 150, 0, 1),
('teeth_sq', '28', '28 - Molar 3 (pjekurie) sipër majtas', 160, 0, 1),
('teeth_sq', '31', '31 - Inciziv qendror poshtë majtas', 170, 0, 1),
('teeth_sq', '32', '32 - Inciziv anësor poshtë majtas', 180, 0, 1),
('teeth_sq', '33', '33 - Kanin poshtë majtas', 190, 0, 1),
('teeth_sq', '34', '34 - Premolar 1 poshtë majtas', 200, 0, 1),
('teeth_sq', '35', '35 - Premolar 2 poshtë majtas', 210, 0, 1),
('teeth_sq', '36', '36 - Molar 1 poshtë majtas', 220, 0, 1),
('teeth_sq', '37', '37 - Molar 2 poshtë majtas', 230, 0, 1),
('teeth_sq', '38', '38 - Molar 3 (pjekurie) poshtë majtas', 240, 0, 1),
('teeth_sq', '41', '41 - Inciziv qendror poshtë djathtas', 250, 0, 1),
('teeth_sq', '42', '42 - Inciziv anësor poshtë djathtas', 260, 0, 1),
('teeth_sq', '43', '43 - Kanin poshtë djathtas', 270, 0, 1),
('teeth_sq', '44', '44 - Premolar 1 poshtë djathtas', 280, 0, 1),
('teeth_sq', '45', '45 - Premolar 2 poshtë djathtas', 290, 0, 1),
('teeth_sq', '46', '46 - Molar 1 poshtë djathtas', 300, 0, 1),
('teeth_sq', '47', '47 - Molar 2 poshtë djathtas', 310, 0, 1),
('teeth_sq', '48', '48 - Molar 3 (pjekurie) poshtë djathtas', 320, 0, 1);

-- ═══════════════════════════════════════════════════════════
-- DONE
-- ═══════════════════════════════════════════════════════════
SELECT 'Kartela Dentare form created successfully!' AS result;
