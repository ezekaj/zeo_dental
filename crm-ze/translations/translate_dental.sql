-- ManagerCRM Dental Albanian Translations

-- ============================================
-- APPOINTMENT CATEGORIES (openemr_postcalendar_categories table)
-- ============================================

-- Dental Cleaning
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Pastrim Dentar',
    pc_catdesc = 'Pastrim rutinë i dhëmbëve dhe profilaksi'
WHERE pc_catname = 'Dental Cleaning';

-- Dental Exam
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Ekzaminim Dentar',
    pc_catdesc = 'Ekzaminim gjithëpërfshirës ose periodik dentar'
WHERE pc_catname = 'Dental Exam';

-- Filling
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Mbushje Dentare',
    pc_catdesc = 'Restaurim dentar - mbushje amalgame ose kompozite'
WHERE pc_catname = 'Filling';

-- Root Canal
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Trajtim i Kanalit',
    pc_catdesc = 'Terapi endodontike - trajtim i kanalit të rrënjës'
WHERE pc_catname = 'Root Canal';

-- Extraction
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Nxjerrje Dhëmbi',
    pc_catdesc = 'Nxjerrje e dhëmbit - e thjeshtë ose kirurgjikale'
WHERE pc_catname = 'Extraction';

-- Crown
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Kurorë Dentare',
    pc_catdesc = 'Kurorë porcelani, metalike ose e kombinuar'
WHERE pc_catname = 'Crown';

-- Implant
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Implant Dentar',
    pc_catdesc = 'Vendosje e implantit dentar dhe restaurimi'
WHERE pc_catname = 'Implant';

-- Orthodontic Consultation
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Konsultë Ortodontike',
    pc_catdesc = 'Konsultë fillestare për trajtim ortodontik'
WHERE pc_catname = 'Orthodontic Consultation' OR pc_catname = 'Orthodontic Consult';

-- Orthodontic Visit
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Vizitë Ortodontike',
    pc_catdesc = 'Vizitë kontrolli për trajtim ortodontik'
WHERE pc_catname = 'Orthodontic Visit';

-- Teeth Whitening
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Zbardhim Dhëmbësh',
    pc_catdesc = 'Procedurë e zbardhimit të dhëmbëve'
WHERE pc_catname = 'Teeth Whitening';

-- Dental X-Ray
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Radiografi Dentare',
    pc_catdesc = 'Imazhe radiografike diagnostike'
WHERE pc_catname = 'Dental X-Ray';

-- Emergency Dental
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Urgjencë Dentare',
    pc_catdesc = 'Trajtim urgjent i dhimbjes ose traumës dentare'
WHERE pc_catname = 'Emergency Dental';

-- Veneer
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Veshje Dentare',
    pc_catdesc = 'Veshje estetike me porcelan ose rezinë'
WHERE pc_catname = 'Veneer';

-- Denture
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Protezë Dentare',
    pc_catdesc = 'Protezë e plotë ose e pjesshme'
WHERE pc_catname = 'Denture';

-- Periodontal Treatment
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Trajtim Periodontal',
    pc_catdesc = 'Trajtim i mishrave të dhëmbëve dhe strukturave mbështetëse'
WHERE pc_catname = 'Periodontal Treatment';

-- Pediatric Dental
UPDATE openemr_postcalendar_categories
SET pc_catname = 'Dental Pediatrike',
    pc_catdesc = 'Kujdes dentar për fëmijë'
WHERE pc_catname = 'Pediatric Dental';

-- ============================================
-- DOCUMENT CATEGORIES (categories table)
-- ============================================

-- Dental Scans
UPDATE categories
SET name = 'Skanime Dentare'
WHERE name = 'Dental Scans';

-- X-Rays
UPDATE categories
SET name = 'Radiografi'
WHERE name = 'X-Rays';

-- Treatment Photos
UPDATE categories
SET name = 'Foto Trajtimi'
WHERE name = 'Treatment Photos';

-- Impressions
UPDATE categories
SET name = 'Kalëpe Dentare'
WHERE name = 'Impressions';

-- Lab Reports
UPDATE categories
SET name = 'Raporte Laboratorike'
WHERE name = 'Lab Reports';
