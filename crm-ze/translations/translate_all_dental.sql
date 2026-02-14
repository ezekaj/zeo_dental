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
-- CDT Diagnostic Codes (D0xxx) - Albanian Translation

UPDATE codes SET code_text='Vlerësim periodik oral - pacient i njohur', code_text_short='Vlerësim Periodik' WHERE code='D0120';

UPDATE codes SET code_text='Vlerësim oral i kufizuar - i fokusuar në problem', code_text_short='Vlerësim i Kufizuar' WHERE code='D0140';

UPDATE codes SET code_text='Vlerësim oral gjithëpërfshirës', code_text_short='Vlerësim Gjithëpërfshirës' WHERE code='D0150';

UPDATE codes SET code_text='Vlerësim oral i detajuar dhe i gjerë', code_text_short='Vlerësim i Detajuar' WHERE code='D0160';

UPDATE codes SET code_text='Rivlerësim - i kufizuar', code_text_short='Rivlerësim' WHERE code='D0170';

UPDATE codes SET code_text='Vlerësim gjithëpërfshirës periodontal', code_text_short='Vlerësim Periodontal' WHERE code='D0180';

UPDATE codes SET code_text='Intraorale - seri e plotë imazhesh radiografike', code_text_short='Radiografi e Plotë' WHERE code='D0210';

UPDATE codes SET code_text='Intraorale - imazh periapikale e parë', code_text_short='Radiografi Periapikale' WHERE code='D0220';

UPDATE codes SET code_text='Intraorale - çdo imazh shtesë periapikale', code_text_short='Periapikale Shtesë' WHERE code='D0230';

UPDATE codes SET code_text='Intraorale - imazh okluzale', code_text_short='Radiografi Okluzale' WHERE code='D0240';

UPDATE codes SET code_text='Bitewing - imazh radiografike e vetme', code_text_short='Bitewing Tekë' WHERE code='D0270';

UPDATE codes SET code_text='Bitewing - dy imazhe radiografike', code_text_short='Bitewing x2' WHERE code='D0272';

UPDATE codes SET code_text='Bitewing - katër imazhe radiografike', code_text_short='Bitewing x4' WHERE code='D0274';

UPDATE codes SET code_text='Imazh radiografike panoramike', code_text_short='Radiografi Panoramike' WHERE code='D0330';

UPDATE codes SET code_text='Imazh radiografike cefalometrike 2D', code_text_short='Radiografi Cefalometrike' WHERE code='D0340';

UPDATE codes SET code_text='Imazh fotografike orale/faqësore 2D', code_text_short='Foto Orale' WHERE code='D0350';

UPDATE codes SET code_text='Teste të vitalitetit të pulpës', code_text_short='Test Vitaliteti' WHERE code='D0460';

UPDATE codes SET code_text='Kallëpe diagnostikë', code_text_short='Kallëpe Diagnostikë' WHERE code='D0470';

UPDATE codes SET code_text='Test para-diagnostik ndihmës për anomali mukozale', code_text_short='Kontroll Kanceri Oral' WHERE code='D0431';
-- CDT Preventive Codes (D1xxx) - Albanian Translation

-- D1110: Prophylaxis - adult
UPDATE codes
SET code_text = 'Profilaksi - i rritur',
    code_text_short = 'Pastrim për të Rritur'
WHERE code = 'D1110';

-- D1120: Prophylaxis - child
UPDATE codes
SET code_text = 'Profilaksi - fëmijë',
    code_text_short = 'Pastrim për Fëmijë'
WHERE code = 'D1120';

-- D1206: Topical application of fluoride varnish
UPDATE codes
SET code_text = 'Aplikim lokal i llakut me fluor',
    code_text_short = 'Llak me Fluor'
WHERE code = 'D1206';

-- D1208: Topical application of fluoride
UPDATE codes
SET code_text = 'Aplikim lokal i fluorit',
    code_text_short = 'Trajtim me Fluor'
WHERE code = 'D1208';

-- D1310: Nutritional counseling for control of dental disease
UPDATE codes
SET code_text = 'Këshillim ushqimor për kontrollin e sëmundjes dentare',
    code_text_short = 'Këshillim Ushqimor'
WHERE code = 'D1310';

-- D1320: Tobacco counseling for prevention of oral disease
UPDATE codes
SET code_text = 'Këshillim kundër duhanit për parandalimin e sëmundjes orale',
    code_text_short = 'Këshillim Kundër Duhanit'
WHERE code = 'D1320';

-- D1330: Oral hygiene instructions
UPDATE codes
SET code_text = 'Udhëzime për higjienën orale',
    code_text_short = 'Udhëzime Higjiena Orale'
WHERE code = 'D1330';

-- D1351: Sealant - per tooth
UPDATE codes
SET code_text = 'Mbyllës - për dhëmb',
    code_text_short = 'Mbyllës Dhëmbi'
WHERE code = 'D1351';

-- D1352: Preventive resin restoration - permanent tooth
UPDATE codes
SET code_text = 'Restaurim parandalues me rezinë - dhëmb i përhershëm',
    code_text_short = 'Restaurim Parandalues'
WHERE code = 'D1352';

-- D1510: Space maintainer - fixed, unilateral
UPDATE codes
SET code_text = 'Mbajtës hapësire - fiks, njëanësor',
    code_text_short = 'Mbajtës Hapësire Fiks'
WHERE code = 'D1510';

-- D1520: Space maintainer - removable, unilateral
UPDATE codes
SET code_text = 'Mbajtës hapësire - i lëvizshëm, njëanësor',
    code_text_short = 'Mbajtës Hapësire i Lëvizshëm'
WHERE code = 'D1520';

-- D1553: Re-cement or re-bond bilateral space maintainer
UPDATE codes
SET code_text = 'Riçimentim ose rilidhje e mbajtësit të hapësirës bilateral',
    code_text_short = 'Riçimentim Mbajtësi'
WHERE code = 'D1553';

-- D1575: Distal shoe space maintainer - fixed, unilateral
UPDATE codes
SET code_text = 'Mbajtës hapësire distale - fiks, njëanësor',
    code_text_short = 'Mbajtës Hapësire Distale'
WHERE code = 'D1575';
-- CDT Restorative Codes (D2xxx) - Albanian Translation

-- Amalgam restorations
UPDATE codes SET code_text='Amalgamë - një sipërfaqe', code_text_short='Amalgamë 1 Sipërfaqe' WHERE code='D2140';
UPDATE codes SET code_text='Amalgamë - dy sipërfaqe', code_text_short='Amalgamë 2 Sipërfaqe' WHERE code='D2150';
UPDATE codes SET code_text='Amalgamë - tre sipërfaqe', code_text_short='Amalgamë 3 Sipërfaqe' WHERE code='D2160';
UPDATE codes SET code_text='Amalgamë - katër ose më shumë sipërfaqe', code_text_short='Amalgamë 4+ Sipërfaqe' WHERE code='D2161';

-- Resin composite - anterior
UPDATE codes SET code_text='Kompozit rezine - një sipërfaqe, anterior', code_text_short='Kompozit 1 Sipërf. Ant.' WHERE code='D2330';
UPDATE codes SET code_text='Kompozit rezine - dy sipërfaqe, anterior', code_text_short='Kompozit 2 Sipërf. Ant.' WHERE code='D2331';
UPDATE codes SET code_text='Kompozit rezine - tre sipërfaqe, anterior', code_text_short='Kompozit 3 Sipërf. Ant.' WHERE code='D2332';
UPDATE codes SET code_text='Kompozit rezine - katër+ sipërfaqe, anterior', code_text_short='Kompozit 4+ Sipërf. Ant.' WHERE code='D2335';

-- Resin composite crown - anterior
UPDATE codes SET code_text='Kurorë kompozit rezine, anterior', code_text_short='Kurorë Kompozit Ant.' WHERE code='D2390';

-- Resin composite - posterior
UPDATE codes SET code_text='Kompozit rezine - një sipërfaqe, posterior', code_text_short='Kompozit 1 Sipërf. Post.' WHERE code='D2391';
UPDATE codes SET code_text='Kompozit rezine - dy sipërfaqe, posterior', code_text_short='Kompozit 2 Sipërf. Post.' WHERE code='D2392';
UPDATE codes SET code_text='Kompozit rezine - tre sipërfaqe, posterior', code_text_short='Kompozit 3 Sipërf. Post.' WHERE code='D2393';
UPDATE codes SET code_text='Kompozit rezine - katër+ sipërfaqe, posterior', code_text_short='Kompozit 4+ Sipërf. Post.' WHERE code='D2394';

-- Inlay - metallic
UPDATE codes SET code_text='Inlej metalik - një sipërfaqe', code_text_short='Inlej Metal 1 Sipërf.' WHERE code='D2510';

-- Onlay - metallic
UPDATE codes SET code_text='Onlej metalik - dy sipërfaqe', code_text_short='Onlej Metal 2 Sipërf.' WHERE code='D2542';

-- Inlay - porcelain/ceramic
UPDATE codes SET code_text='Inlej porcelani/qeramike - një sipërfaqe', code_text_short='Inlej Qeramik 1 Sipërf.' WHERE code='D2610';
UPDATE codes SET code_text='Inlej porcelani/qeramike - tre+ sipërfaqe', code_text_short='Inlej Qeramik 3+ Sipërf.' WHERE code='D2630';

-- Onlay - porcelain/ceramic
UPDATE codes SET code_text='Onlej porcelani/qeramike - dy sipërfaqe', code_text_short='Onlej Qeramik 2 Sipërf.' WHERE code='D2642';

-- Crowns - ceramic and fused
UPDATE codes SET code_text='Kurorë - porcelani/qeramike', code_text_short='Kurorë Porcelani' WHERE code='D2740';
UPDATE codes SET code_text='Kurorë - porcelan mbi metal të çmuar', code_text_short='Kurorë PFM Metal Çmuar' WHERE code='D2750';
UPDATE codes SET code_text='Kurorë - porcelan mbi metal bazë', code_text_short='Kurorë PFM Metal Bazë' WHERE code='D2751';
UPDATE codes SET code_text='Kurorë - porcelan mbi metal fisnik', code_text_short='Kurorë PFM Metal Fisnik' WHERE code='D2752';

-- Crowns - cast metal
UPDATE codes SET code_text='Kurorë - 3/4 metal i çmuar', code_text_short='Kurorë 3/4 Metal Çmuar' WHERE code='D2780';
UPDATE codes SET code_text='Kurorë - e plotë metal i çmuar', code_text_short='Kurorë e Plotë Metalike' WHERE code='D2790';

-- Provisional crown
UPDATE codes SET code_text='Kurorë provizore', code_text_short='Kurorë e Përkohshme' WHERE code='D2799';

-- Re-cementation procedures
UPDATE codes SET code_text='Riçimentim inlej, onlej, veshje', code_text_short='Riçimentim Inlej/Onlej' WHERE code='D2910';
UPDATE codes SET code_text='Riçimentim shtyllë dhe bërthamë', code_text_short='Riçimentim Shtyllë/Bërthamë' WHERE code='D2920';

-- Crowns and restorative procedures - primary teeth
UPDATE codes SET code_text='Kurorë çeliku - dhëmb qumështi', code_text_short='Kurorë Çeliku Qumështi' WHERE code='D2930';

-- Protective and buildups
UPDATE codes SET code_text='Restaurim mbrojtës', code_text_short='Restaurim Mbrojtës' WHERE code='D2940';
UPDATE codes SET code_text='Ndërtim bërthamë', code_text_short='Ndërtim Bërthamë' WHERE code='D2950';
UPDATE codes SET code_text='Mbajtje me kunj', code_text_short='Mbajtje me Kunj' WHERE code='D2951';

-- Posts and cores
UPDATE codes SET code_text='Shtyllë dhe bërthamë - e fabrikuar indirekt', code_text_short='Shtyllë dhe Bërthamë' WHERE code='D2952';
UPDATE codes SET code_text='Shtyllë dhe bërthamë e parafabrikuar', code_text_short='Shtyllë e Parafabrikuar' WHERE code='D2954';

-- Veneers
UPDATE codes SET code_text='Veshje labiale (rezinë) - në karrige', code_text_short='Veshje Rezine' WHERE code='D2960';
UPDATE codes SET code_text='Veshje labiale (rezinë) - laboratorike', code_text_short='Veshje Rezine Lab' WHERE code='D2961';
UPDATE codes SET code_text='Veshje labiale (porcelan) - laboratorike', code_text_short='Veshje Porcelani' WHERE code='D2962';
-- CDT Endodontic, Periodontic & Prosthodontic Removable Codes - Albanian Translation

-- ENDODONTICS (D3xxx)
UPDATE codes SET code_text='Mbulim i pulpës - direkt', code_text_short='Mbulim Direkt Pulpës' WHERE code='D3110';
UPDATE codes SET code_text='Mbulim i pulpës - indirekt', code_text_short='Mbulim Indirekt Pulpës' WHERE code='D3120';
UPDATE codes SET code_text='Pulpotomi terapeutike', code_text_short='Pulpotomi' WHERE code='D3220';
UPDATE codes SET code_text='Terapi endodontike, dhëmb anterior', code_text_short='Kanal Rrënje Anterior' WHERE code='D3310';
UPDATE codes SET code_text='Terapi endodontike, dhëmb premolar', code_text_short='Kanal Rrënje Premolar' WHERE code='D3320';
UPDATE codes SET code_text='Terapi endodontike, dhëmb molar', code_text_short='Kanal Rrënje Molar' WHERE code='D3330';
UPDATE codes SET code_text='Ritrajtim i kanalit - anterior', code_text_short='Ritrajtim Kanali Anterior' WHERE code='D3346';
UPDATE codes SET code_text='Ritrajtim i kanalit - premolar', code_text_short='Ritrajtim Kanali Premolar' WHERE code='D3347';
UPDATE codes SET code_text='Ritrajtim i kanalit - molar', code_text_short='Ritrajtim Kanali Molar' WHERE code='D3348';
UPDATE codes SET code_text='Apeksifikim - vizitë fillestare', code_text_short='Apeksifikim Fillestar' WHERE code='D3351';
UPDATE codes SET code_text='Apikoektomi - anterior', code_text_short='Apikoektomi Anterior' WHERE code='D3410';
UPDATE codes SET code_text='Apikoektomi - premolar', code_text_short='Apikoektomi Premolar' WHERE code='D3421';
UPDATE codes SET code_text='Apikoektomi - molar', code_text_short='Apikoektomi Molar' WHERE code='D3425';
UPDATE codes SET code_text='Amputim rrënje', code_text_short='Amputim Rrënje' WHERE code='D3450';

-- PERIODONTICS (D4xxx)
UPDATE codes SET code_text='Gingivektomi - katër+ dhëmbë për kuadrant', code_text_short='Gingivektomi 4+ Dhëmbë' WHERE code='D4210';
UPDATE codes SET code_text='Gingivektomi - 1-3 dhëmbë për kuadrant', code_text_short='Gingivektomi 1-3 Dhëmbë' WHERE code='D4211';
UPDATE codes SET code_text='Lambë gingivale me pastr. rrënjës - 4+ dhëmbë', code_text_short='Lambë Gingivale 4+' WHERE code='D4240';
UPDATE codes SET code_text='Lambë gingivale me pastr. rrënjës - 1-3 dhëmbë', code_text_short='Lambë Gingivale 1-3' WHERE code='D4241';
UPDATE codes SET code_text='Zgjatje e kurorës klinike - ind i fortë', code_text_short='Zgjatje Kurorë' WHERE code='D4249';
UPDATE codes SET code_text='Kirurgji kockore - 4+ dhëmbë', code_text_short='Kirurgji Kockore 4+' WHERE code='D4260';
UPDATE codes SET code_text='Kirurgji kockore - 1-3 dhëmbë', code_text_short='Kirurgji Kockore 1-3' WHERE code='D4261';
UPDATE codes SET code_text='Pastrim nënmishëror dhe rrënjës - 4+ dhëmbë', code_text_short='Pastrim Rrënjësh 4+' WHERE code='D4341';
UPDATE codes SET code_text='Pastrim nënmishëror dhe rrënjës - 1-3 dhëmbë', code_text_short='Pastrim Rrënjësh 1-3' WHERE code='D4342';
UPDATE codes SET code_text='Pastrim i plotë i gojës', code_text_short='Pastrim i Plotë Gojës' WHERE code='D4355';
UPDATE codes SET code_text='Dorëzim lokal i agjentit antimikrobial', code_text_short='Antimikrobial Lokal' WHERE code='D4381';
UPDATE codes SET code_text='Mirëmbajtje periodontale', code_text_short='Mirëmbajtje Periodontale' WHERE code='D4910';

-- PROSTHODONTICS REMOVABLE (D5xxx)
UPDATE codes SET code_text='Protezë e plotë - sipër', code_text_short='Protezë e Plotë Sipër' WHERE code='D5110';
UPDATE codes SET code_text='Protezë e plotë - poshtë', code_text_short='Protezë e Plotë Poshtë' WHERE code='D5120';
UPDATE codes SET code_text='Protezë e menjëhershme - sipër', code_text_short='Protezë Menjëherë Sipër' WHERE code='D5130';
UPDATE codes SET code_text='Protezë e menjëhershme - poshtë', code_text_short='Protezë Menjëherë Poshtë' WHERE code='D5140';
UPDATE codes SET code_text='Protezë e pjesshme sipër - bazë rezine', code_text_short='Protezë Pjesshme Sipër Rezinë' WHERE code='D5211';
UPDATE codes SET code_text='Protezë e pjesshme poshtë - bazë rezine', code_text_short='Protezë Pjesshme Poshtë Rezinë' WHERE code='D5212';
UPDATE codes SET code_text='Protezë e pjesshme sipër - kornizë metalike', code_text_short='Protezë Pjesshme Sipër Metal' WHERE code='D5213';
UPDATE codes SET code_text='Protezë e pjesshme poshtë - kornizë metalike', code_text_short='Protezë Pjesshme Poshtë Metal' WHERE code='D5214';
UPDATE codes SET code_text='Rregullim proteze - sipër', code_text_short='Rregullim Proteze Sipër' WHERE code='D5410';
UPDATE codes SET code_text='Rregullim proteze - poshtë', code_text_short='Rregullim Proteze Poshtë' WHERE code='D5411';
UPDATE codes SET code_text='Rregullim proteze pjesshme - sipër', code_text_short='Rregullim Pjesshme Sipër' WHERE code='D5421';
UPDATE codes SET code_text='Rregullim proteze pjesshme - poshtë', code_text_short='Rregullim Pjesshme Poshtë' WHERE code='D5422';
UPDATE codes SET code_text='Riparim i bazës së protezës', code_text_short='Riparim Baze Proteze' WHERE code='D5511';
UPDATE codes SET code_text='Riparim i bazës së protezës pjesshme', code_text_short='Riparim Bazë Pjesshme' WHERE code='D5611';
UPDATE codes SET code_text='Riparim ose zëvendësim i grep', code_text_short='Riparim Grepi' WHERE code='D5630';
UPDATE codes SET code_text='Shtim grepi në protezë ekzistuese', code_text_short='Shtim Grepi' WHERE code='D5660';
UPDATE codes SET code_text='Ribazim proteze sipër', code_text_short='Ribazim Proteze Sipër' WHERE code='D5710';
UPDATE codes SET code_text='Ribazim proteze poshtë', code_text_short='Ribazim Proteze Poshtë' WHERE code='D5711';
UPDATE codes SET code_text='Riveshje proteze sipër (në karrige)', code_text_short='Riveshje Proteze Sipër' WHERE code='D5730';
UPDATE codes SET code_text='Riveshje proteze poshtë (në karrige)', code_text_short='Riveshje Proteze Poshtë' WHERE code='D5731';
UPDATE codes SET code_text='Riveshje proteze sipër (laborator)', code_text_short='Riveshje Proteze Sipër Lab' WHERE code='D5750';
UPDATE codes SET code_text='Riveshje proteze poshtë (laborator)', code_text_short='Riveshje Proteze Poshtë Lab' WHERE code='D5751';
-- CDT Fixed Prosthodontic & Oral Surgery Codes - Albanian Translation

-- Fixed Prosthodontics (D6xxx)
UPDATE codes SET code_text='Vendosje kirurgjikale e trupit të implantit', code_text_short='Vendosje Implanti' WHERE code='D6010';
UPDATE codes SET code_text='Vendosje implanti të përkohshëm', code_text_short='Implant i Përkohshëm' WHERE code='D6012';
UPDATE codes SET code_text='Implant eposteal', code_text_short='Implant Eposteal' WHERE code='D6040';
UPDATE codes SET code_text='Shufër lidhëse implanti', code_text_short='Shufër Implanti' WHERE code='D6055';
UPDATE codes SET code_text='Abatment i parafabrikuar', code_text_short='Abatment i Parafabrikuar' WHERE code='D6056';
UPDATE codes SET code_text='Abatment i përshtatur', code_text_short='Abatment i Përshtatur' WHERE code='D6057';
UPDATE codes SET code_text='Kurorë porcelani mbi abatment', code_text_short='Kurorë Porcelani Abatment' WHERE code='D6058';
UPDATE codes SET code_text='Kurorë PFM mbi abatment', code_text_short='Kurorë PFM Abatment' WHERE code='D6059';
UPDATE codes SET code_text='Kurorë qeramike mbi implant', code_text_short='Kurorë Implanti Qeramike' WHERE code='D6065';
UPDATE codes SET code_text='Kurorë PFM mbi implant', code_text_short='Kurorë Implanti PFM' WHERE code='D6066';
UPDATE codes SET code_text='Kurorë metalike mbi implant', code_text_short='Kurorë Implanti Metalike' WHERE code='D6067';
UPDATE codes SET code_text='Mbajtës abatmenti qeramik për urë fikse', code_text_short='Mbajtës Abatment Qeramik' WHERE code='D6068';
UPDATE codes SET code_text='Mirëmbajtje implanti', code_text_short='Mirëmbajtje Implanti' WHERE code='D6080';
UPDATE codes SET code_text='Heqje implanti', code_text_short='Heqje Implanti' WHERE code='D6100';
UPDATE codes SET code_text='Pontik metal i çmuar', code_text_short='Pontik Metal Çmuar' WHERE code='D6210';
UPDATE codes SET code_text='Pontik PFM metal i çmuar', code_text_short='Pontik PFM Çmuar' WHERE code='D6240';
UPDATE codes SET code_text='Pontik PFM metal bazë', code_text_short='Pontik PFM Bazë' WHERE code='D6241';
UPDATE codes SET code_text='Pontik porcelani/qeramike', code_text_short='Pontik Qeramik' WHERE code='D6245';
UPDATE codes SET code_text='Pontik rezinë metal fisnik', code_text_short='Pontik Rezinë Fisnik' WHERE code='D6250';
UPDATE codes SET code_text='Inlej mbajtës qeramik', code_text_short='Inlej Mbajtës Qeramik' WHERE code='D6600';
UPDATE codes SET code_text='Kurorë mbajtëse kompozit', code_text_short='Kurorë Mbajtëse Kompozit' WHERE code='D6710';
UPDATE codes SET code_text='Kurorë mbajtëse rezinë bazë', code_text_short='Kurorë Mbajtëse Rezinë' WHERE code='D6720';
UPDATE codes SET code_text='Kurorë mbajtëse qeramike', code_text_short='Kurorë Mbajtëse Qeramik' WHERE code='D6740';
UPDATE codes SET code_text='Kurorë mbajtëse PFM', code_text_short='Kurorë Mbajtëse PFM' WHERE code='D6750';
UPDATE codes SET code_text='Kurorë mbajtëse 3/4 metal çmuar', code_text_short='Kurorë Mbajtëse 3/4' WHERE code='D6780';
UPDATE codes SET code_text='Kurorë mbajtëse e plotë metalike', code_text_short='Kurorë Mbajtëse e Plotë' WHERE code='D6790';
UPDATE codes SET code_text='Riçimentim i urës fikse', code_text_short='Riçimentim Ure' WHERE code='D6930';

-- Oral Surgery (D7xxx)
UPDATE codes SET code_text='Nxjerrje, mbetje kurorë - dhëmb qumështi', code_text_short='Nxjerrje Dhëmb Qumështi' WHERE code='D7111';
UPDATE codes SET code_text='Nxjerrje, dhëmb i dalë ose rrënjë e ekspozuar', code_text_short='Nxjerrje e Thjeshtë' WHERE code='D7140';
UPDATE codes SET code_text='Nxjerrje, dhëmb që kërkon heqje kocke', code_text_short='Nxjerrje Kirurgjikale' WHERE code='D7210';
UPDATE codes SET code_text='Heqje dhëmbi i ndikur - ind i butë', code_text_short='Dhëmb i Ndikur Ind i Butë' WHERE code='D7220';
UPDATE codes SET code_text='Heqje dhëmbi i ndikur - pjesërisht kockor', code_text_short='Dhëmb i Ndikur Pjesërisht Kockor' WHERE code='D7230';
UPDATE codes SET code_text='Heqje dhëmbi i ndikur - plotësisht kockor', code_text_short='Dhëmb i Ndikur Kockor' WHERE code='D7240';
UPDATE codes SET code_text='Heqje dhëmbi i ndikur - kompleks kirurgjik', code_text_short='Dhëmb i Ndikur Kompleks' WHERE code='D7241';
UPDATE codes SET code_text='Heqje e rrënjëve reziduale', code_text_short='Heqje Maje Rrënje' WHERE code='D7250';
UPDATE codes SET code_text='Mbyllje e fistulës oroanrale', code_text_short='Mbyllje Fistule' WHERE code='D7260';
UPDATE codes SET code_text='Riimplantim i dhëmbit', code_text_short='Riimplantim Dhëmbi' WHERE code='D7270';
UPDATE codes SET code_text='Ekspozim i dhëmbit të padalë', code_text_short='Ekspozim Dhëmbi' WHERE code='D7280';
UPDATE codes SET code_text='Vendosje pajisjeje për nxitje dalje', code_text_short='Pajisje Dalje Dhëmbi' WHERE code='D7283';
UPDATE codes SET code_text='Biopsi incizionale - ind i fortë oral', code_text_short='Biopsi Ind i Fortë' WHERE code='D7285';
UPDATE codes SET code_text='Biopsi incizionale - ind i butë oral', code_text_short='Biopsi Ind i Butë' WHERE code='D7286';
UPDATE codes SET code_text='Alveoloplastikë bashkë me nxjerrje - 4+ dhëmbë', code_text_short='Alveoloplastikë 4+' WHERE code='D7310';
UPDATE codes SET code_text='Alveoloplastikë bashkë me nxjerrje - 1-3 dhëmbë', code_text_short='Alveoloplastikë 1-3' WHERE code='D7311';
UPDATE codes SET code_text='Alveoloplastikë pa nxjerrje - 4+ dhëmbë', code_text_short='Alveoloplastikë Vetëm 4+' WHERE code='D7320';
UPDATE codes SET code_text='Alveoloplastikë pa nxjerrje - 1-3 dhëmbë', code_text_short='Alveoloplastikë Vetëm 1-3' WHERE code='D7321';
UPDATE codes SET code_text='Heqje e ekzostozës laterale', code_text_short='Heqje Ekzostoze' WHERE code='D7471';
UPDATE codes SET code_text='Heqje e torus palatinus', code_text_short='Heqje Torus Palatinus' WHERE code='D7472';
UPDATE codes SET code_text='Heqje e torus mandibularis', code_text_short='Heqje Torus Mandibularis' WHERE code='D7473';
UPDATE codes SET code_text='Prerje dhe kullim abscesi - intraoral', code_text_short='Kullim Abscesi Intraoral' WHERE code='D7510';
UPDATE codes SET code_text='Prerje dhe kullim abscesi - i komplikuar', code_text_short='Kullim Abscesi Kompleks' WHERE code='D7511';
UPDATE codes SET code_text='Prerje dhe kullim abscesi - ekstraoral', code_text_short='Kullim Abscesi Ekstraoral' WHERE code='D7520';
UPDATE codes SET code_text='Pajisje ortotike okluzale', code_text_short='Pajisje Ortotike' WHERE code='D7880';
UPDATE codes SET code_text='Qepje e plagës së vogël deri 5 cm', code_text_short='Qepje Plage' WHERE code='D7910';
-- CDT Orthodontic & Adjunctive Codes - Albanian Translation

-- Orthodontics (D8xxx)
UPDATE codes SET code_text='Trajtim ortodontik i kufizuar - dhëmbë qumështi', code_text_short='Orto Kufizuar Qumështi' WHERE code='D8010';
UPDATE codes SET code_text='Trajtim ortodontik i kufizuar - denticion tranzitor', code_text_short='Orto Kufizuar Tranzitor' WHERE code='D8020';
UPDATE codes SET code_text='Trajtim ortodontik i kufizuar - adoleshent', code_text_short='Orto Kufizuar Adoleshent' WHERE code='D8030';
UPDATE codes SET code_text='Trajtim ortodontik i kufizuar - i rritur', code_text_short='Orto Kufizuar i Rritur' WHERE code='D8040';
UPDATE codes SET code_text='Trajtim ortodontik gjithëpërfshirës - tranzitor', code_text_short='Orto Gjithëpërf. Tranzitor' WHERE code='D8070';
UPDATE codes SET code_text='Trajtim ortodontik gjithëpërfshirës - adoleshent', code_text_short='Orto Gjithëpërf. Adoleshent' WHERE code='D8080';
UPDATE codes SET code_text='Trajtim ortodontik gjithëpërfshirës - i rritur', code_text_short='Orto Gjithëpërf. i Rritur' WHERE code='D8090';
UPDATE codes SET code_text='Terapi me pajisje të lëvizshme', code_text_short='Pajisje e Lëvizshme' WHERE code='D8210';
UPDATE codes SET code_text='Terapi me pajisje fikse', code_text_short='Pajisje Fikse' WHERE code='D8220';
UPDATE codes SET code_text='Ekzaminim para-ortodontik', code_text_short='Ekzaminim Para-Orto' WHERE code='D8660';
UPDATE codes SET code_text='Vizitë periodike ortodontike', code_text_short='Vizitë Periodike Orto' WHERE code='D8670';
UPDATE codes SET code_text='Retencioni ortodontik (heqje pajisje, vendosje mbajtësi)', code_text_short='Retencion Ortodontik' WHERE code='D8680';
UPDATE codes SET code_text='Rregullim i mbajtësit', code_text_short='Rregullim Mbajtësi' WHERE code='D8681';
UPDATE codes SET code_text='Trajtim ortodontik (faturim alternativ)', code_text_short='Orto Faturim Alt.' WHERE code='D8690';
UPDATE codes SET code_text='Heqje e pajisjes fikse ortodontike', code_text_short='Heqje Pajisje Orto' WHERE code='D8695';
UPDATE codes SET code_text='Procedurë ortodontike e paspecifikuar', code_text_short='Orto e Paspecifikuar' WHERE code='D8999';

-- Adjunctive General Services (D9xxx)
UPDATE codes SET code_text='Trajtim paliativ (urgjent) i dhimbjes dentare', code_text_short='Trajtim Urgjent Dhimbjeje' WHERE code='D9110';
UPDATE codes SET code_text='Prerje e urës fikse', code_text_short='Prerje Ure' WHERE code='D9120';
UPDATE codes SET code_text='Anestezi lokale jo në lidhje me procedurë', code_text_short='Anestezi Lokale Vetëm' WHERE code='D9210';
UPDATE codes SET code_text='Anestezi bllokuese rajonale', code_text_short='Bllok Rajonal' WHERE code='D9211';
UPDATE codes SET code_text='Anestezi bllokuese trigeminale', code_text_short='Bllok Trigeminal' WHERE code='D9212';
UPDATE codes SET code_text='Anestezi lokale me procedurë', code_text_short='Anestezi Lokale me Proc.' WHERE code='D9215';
UPDATE codes SET code_text='Vlerësim për sedacion', code_text_short='Vlerësim Sedacioni' WHERE code='D9219';
UPDATE codes SET code_text='Anestezi e përgjithshme - 15 min. e parë', code_text_short='Anestezi Përgjithshme 15min' WHERE code='D9222';
UPDATE codes SET code_text='Anestezi e përgjithshme - çdo 15 min. shtesë', code_text_short='Anestezi Shtesë 15min' WHERE code='D9223';
UPDATE codes SET code_text='Inhalim oksidit të azotit', code_text_short='Oksid Azoti' WHERE code='D9230';
UPDATE codes SET code_text='Sedacion IV - 15 min. e parë', code_text_short='Sedacion IV 15min' WHERE code='D9239';
UPDATE codes SET code_text='Sedacion IV - çdo 15 min. shtesë', code_text_short='Sedacion IV Shtesë 15min' WHERE code='D9243';
UPDATE codes SET code_text='Konsultë - shërbim diagnostik nga dentist tjetër', code_text_short='Konsultë' WHERE code='D9310';
UPDATE codes SET code_text='Konsultë me profesionist të kujdesit shëndetësor', code_text_short='Konsultë Mjekësore' WHERE code='D9311';
UPDATE codes SET code_text='Vizitë në zyrë për vëzhgim', code_text_short='Vizitë Vëzhgimi' WHERE code='D9430';
UPDATE codes SET code_text='Vizitë jashtë orarit', code_text_short='Vizitë Jashtë Orarit' WHERE code='D9440';
UPDATE codes SET code_text='Prezantim rasti dhe planifikim trajtimi', code_text_short='Planifikim Trajtimi' WHERE code='D9450';
UPDATE codes SET code_text='Ilaç terapeutik parenteral, administrim i vetëm', code_text_short='Administrim Ilaci' WHERE code='D9610';
UPDATE codes SET code_text='Ilaçe terapeutike parenterale, dy+ administrime', code_text_short='Administrim Shumë Ilaçesh' WHERE code='D9612';
UPDATE codes SET code_text='Ilaçe të dhëna në zyrë për përdorim shtëpiak', code_text_short='Ilaçe për Shtëpi' WHERE code='D9630';
UPDATE codes SET code_text='Aplikim i agjentit desensibilizues', code_text_short='Agjent Desensibilizues' WHERE code='D9910';
UPDATE codes SET code_text='Aplikim i rezinës desensibilizuese', code_text_short='Rezinë Desensibilizuese' WHERE code='D9911';
UPDATE codes SET code_text='Menaxhim i sjelljes', code_text_short='Menaxhim Sjelljes' WHERE code='D9920';
UPDATE codes SET code_text='Trajtim i komplikimeve pas-kirurgjikale', code_text_short='Komplikime Pas-Kirurgjikale' WHERE code='D9930';
UPDATE codes SET code_text='Mbrojtës okluzal', code_text_short='Mbrojtës Nate' WHERE code='D9940';
UPDATE codes SET code_text='Riparim i mbrojtësit okluzal', code_text_short='Riparim Mbrojtësi Nate' WHERE code='D9942';
UPDATE codes SET code_text='Rregullim i mbrojtësit okluzal', code_text_short='Rregullim Mbrojtësi' WHERE code='D9943';
UPDATE codes SET code_text='Mbrojtës okluzal i fortë - hark i plotë', code_text_short='Mbrojtës i Fortë Plotë' WHERE code='D9944';
UPDATE codes SET code_text='Mbrojtës okluzal i butë - hark i plotë', code_text_short='Mbrojtës i Butë Plotë' WHERE code='D9945';
UPDATE codes SET code_text='Mbrojtës okluzal i fortë - hark i pjesshëm', code_text_short='Mbrojtës i Fortë Pjesshëm' WHERE code='D9946';
UPDATE codes SET code_text='Analizë e okluzionit', code_text_short='Analizë Okluzioni' WHERE code='D9950';
UPDATE codes SET code_text='Rregullim okluzal - i kufizuar', code_text_short='Rregullim Okluzal Kufizuar' WHERE code='D9951';
UPDATE codes SET code_text='Rregullim okluzal - i plotë', code_text_short='Rregullim Okluzal i Plotë' WHERE code='D9952';
UPDATE codes SET code_text='Mikroabrazion i smaltit', code_text_short='Mikroabrazion Smalti' WHERE code='D9970';
UPDATE codes SET code_text='Odontoplastikë 1-2 dhëmbë', code_text_short='Odontoplastikë' WHERE code='D9971';
UPDATE codes SET code_text='Zbardhim - për hark', code_text_short='Zbardhim për Hark' WHERE code='D9972';
UPDATE codes SET code_text='Zbardhim - për dhëmb', code_text_short='Zbardhim për Dhëmb' WHERE code='D9973';
UPDATE codes SET code_text='Zbardhim i brendshëm - për dhëmb', code_text_short='Zbardhim i Brendshëm' WHERE code='D9974';
UPDATE codes SET code_text='Zbardhim në shtëpi - për hark', code_text_short='Kit Zbardhimi Shtëpie' WHERE code='D9975';
UPDATE codes SET code_text='Takim i humbur', code_text_short='Takim i Humbur' WHERE code='D9986';
UPDATE codes SET code_text='Takim i anuluar', code_text_short='Takim i Anuluar' WHERE code='D9987';
UPDATE codes SET code_text='Procedurë ndihmëse e paspecifikuar', code_text_short='Procedurë e Paspecifikuar' WHERE code='D9999';
