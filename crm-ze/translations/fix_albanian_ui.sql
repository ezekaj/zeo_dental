-- Fix Albanian UI Translations for ManagerCRM
-- Replaces transliterations and bad translations with natural Albanian

-- ============================================
-- 1. PROVIDER → DOKTOR (all Albanian forms)
-- ============================================

-- Handle known PLURAL patterns first (where "Ofruesit" means "Providers")
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit Joaktivë', 'Doktorët Joaktivë')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit Joaktivë%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit Joaktive', 'Doktorët Joaktivë')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit Joaktive%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit e Përfshirë', 'Doktorët e Përfshirë')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit e Përfshirë%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit e Perfshire', 'Doktorët e Përfshirë')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit e Perfshire%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit e Rinj', 'Doktorët e Rinj')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit e Rinj%';

-- Plural indefinite: Ofrueset → Doktorët
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofrueset', 'Doktorët')
WHERE lang_id = 32 AND definition LIKE '%Ofrueset%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofrueset', 'doktorët')
WHERE lang_id = 32 AND definition LIKE '%ofrueset%';

-- Dative plural: Ofruesve → Doktorëve
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesve', 'Doktorëve')
WHERE lang_id = 32 AND definition LIKE '%Ofruesve%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofruesve', 'doktorëve')
WHERE lang_id = 32 AND definition LIKE '%ofruesve%';

-- Accusative singular: Ofruesin → Doktorin
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesin', 'Doktorin')
WHERE lang_id = 32 AND definition LIKE '%Ofruesin%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofruesin', 'doktorin')
WHERE lang_id = 32 AND definition LIKE '%ofruesin%';

-- Genitive/dative singular definite: Ofruesit → Doktorit (most remaining cases)
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesit', 'Doktorit')
WHERE lang_id = 32 AND definition LIKE '%Ofruesit%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofruesit', 'doktorit')
WHERE lang_id = 32 AND definition LIKE '%ofruesit%';

-- Nominative singular definite: Ofruesi → Doktori
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofruesi', 'Doktori')
WHERE lang_id = 32 AND definition LIKE '%Ofruesi%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofruesi', 'doktori')
WHERE lang_id = 32 AND definition LIKE '%ofruesi%';

-- Indefinite: Ofrues → Doktor (catch remaining)
UPDATE lang_definitions SET definition = REPLACE(definition, 'Ofrues', 'Doktor')
WHERE lang_id = 32 AND definition LIKE '%Ofrues%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'ofrues', 'doktor')
WHERE lang_id = 32 AND definition LIKE '%ofrues%';

-- ============================================
-- 2. OpenEMR → ManagerCRM (rebrand)
-- ============================================

UPDATE lang_definitions SET definition = REPLACE(definition, 'openEMR', 'ManagerCRM')
WHERE lang_id = 32 AND definition LIKE '%openEMR%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'OpenEMR', 'ManagerCRM')
WHERE lang_id = 32 AND definition LIKE '%OpenEMR%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'OPENEMR', 'ManagerCRM')
WHERE lang_id = 32 AND definition LIKE '%OPENEMR%';

-- ============================================
-- 3. WIDGET → MINIAPLIKACION (standardize)
-- ============================================

UPDATE lang_definitions SET definition = REPLACE(definition, 'Widget-in', 'Miniaplikacionin')
WHERE lang_id = 32 AND definition LIKE '%Widget-in%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Widget-it', 'Miniaplikacionit')
WHERE lang_id = 32 AND definition LIKE '%Widget-it%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Widget-eve', 'Miniaplikacioneve')
WHERE lang_id = 32 AND definition LIKE '%Widget-eve%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'Widget', 'Miniaplikacion')
WHERE lang_id = 32 AND definition LIKE '%Widget%';

-- ============================================
-- 4. RENDERIM → natural Albanian
-- ============================================

UPDATE lang_definitions SET definition = REPLACE(definition, 'Renderimit', 'Përcaktuar')
WHERE lang_id = 32 AND definition LIKE '%Renderimit%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'renderimit', 'përcaktuar')
WHERE lang_id = 32 AND definition LIKE '%renderimit%';

-- ============================================
-- 5. Standardize Login term
-- ============================================

-- "Kycu" → "Hyr" (standardize to one term for "Log In")
UPDATE lang_definitions SET definition = REPLACE(definition, 'Kycu', 'Hyr')
WHERE lang_id = 32 AND definition LIKE '%Kycu%';

UPDATE lang_definitions SET definition = REPLACE(definition, 'kycu', 'hyr')
WHERE lang_id = 32 AND definition LIKE '%kycu%';

-- ============================================
-- 6. Fix key menu/UI labels directly
-- ============================================

-- "Providers" menu item
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktorët'
WHERE lc.constant_name = 'Providers' AND ld.lang_id = 32;

-- "Provider" singular
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktori'
WHERE lc.constant_name = 'Provider' AND ld.lang_id = 32;

-- "Current Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktori Aktual'
WHERE lc.constant_name = 'Current Provider' AND ld.lang_id = 32;

-- "Main Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktori Kryesor'
WHERE lc.constant_name = 'Main Provider' AND ld.lang_id = 32;

-- "Encounter Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktori i Vizitës'
WHERE lc.constant_name = 'Encounter Provider' AND ld.lang_id = 32;

-- "Name of Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Emri i Doktorit'
WHERE lc.constant_name = 'Name of Provider' AND ld.lang_id = 32;

-- "Provider Dashboard"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Paneli i Doktorit'
WHERE lc.constant_name = 'Provider Dashboard' AND ld.lang_id = 32;

-- "Select Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Zgjidhni Doktorin'
WHERE lc.constant_name = 'Select Provider' AND ld.lang_id = 32;

-- "External Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Doktori i Jashtëm'
WHERE lc.constant_name = 'External Provider' AND ld.lang_id = 32;

-- "Add New{{Provider}}"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Shto të Ri{{Doktor}}'
WHERE lc.constant_name = 'Add New{{Provider}}' AND ld.lang_id = 32;

-- "Find Available{{Provider}}"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Gjej të Disponueshëm{{Doktor}}'
WHERE lc.constant_name = 'Find Available{{Provider}}' AND ld.lang_id = 32;

-- "No Providers Found"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Nuk u Gjetën Doktorë'
WHERE lc.constant_name = 'No Providers Found' AND ld.lang_id = 32;

-- "Non Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Jo Doktor'
WHERE lc.constant_name = 'Non Provider' AND ld.lang_id = 32;

-- "Multi-Select Provider"
UPDATE lang_definitions ld
JOIN lang_constants lc ON ld.cons_id = lc.cons_id
SET ld.definition = 'Zgjidhni Shumë Doktorë'
WHERE lc.constant_name = 'Multi-Select Provider' AND ld.lang_id = 32;

-- "Manage modules" - keep as is, "Modulet" is fine Albanian
-- "Patient/Client" menu - keep "Pacienti/Klienti" as is
