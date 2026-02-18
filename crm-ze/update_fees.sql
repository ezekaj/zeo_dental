-- ═══════════════════════════════════════════════════════════
-- Zeo Dental Clinic - Fee Update Script
-- Run this on the live CRM to update prices from LISTE CMIMESH.xlsx
-- All prices in Albanian Lek (ALL)
-- ═══════════════════════════════════════════════════════════

SET @cdt_type = (SELECT ct_id FROM code_types WHERE ct_key = 'CDT');

-- ───────────────────────────────────────────────────────────
-- DIAGNOSTIC — Konsulte: 1,000-5,000 ALL
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 1000 WHERE code = 'D0120' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D0140' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D0150' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D0160' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D0170' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D0180' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D0210' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D0220' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D0230' AND code_type = @cdt_type;
UPDATE codes SET fee = 2500 WHERE code = 'D0240' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D0270' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D0272' AND code_type = @cdt_type;
UPDATE codes SET fee = 4500 WHERE code = 'D0274' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D0330' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D0340' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D0350' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D0460' AND code_type = @cdt_type;
UPDATE codes SET fee = 4000 WHERE code = 'D0470' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D0431' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- PREVENTIVE — Detartrazh: 3,000; Femije: 1,500; Silante: 2,500
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 3000 WHERE code = 'D1110' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D1120' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D1206' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D1208' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D1310' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D1320' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D1330' AND code_type = @cdt_type;
UPDATE codes SET fee = 2500 WHERE code = 'D1351' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D1352' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D1510' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D1520' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D1553' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D1575' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- RESTORATIVE — Mbushje: 3,000-8,500; Kurore: 12,000-30,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 5000 WHERE code = 'D2140' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D2150' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D2160' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D2161' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D2330' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D2331' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D2332' AND code_type = @cdt_type;
UPDATE codes SET fee = 8500 WHERE code = 'D2335' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D2390' AND code_type = @cdt_type;
UPDATE codes SET fee = 4000 WHERE code = 'D2391' AND code_type = @cdt_type;
UPDATE codes SET fee = 4000 WHERE code = 'D2392' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D2393' AND code_type = @cdt_type;
UPDATE codes SET fee = 8500 WHERE code = 'D2394' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D2510' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D2542' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D2610' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D2630' AND code_type = @cdt_type;
UPDATE codes SET fee = 22000 WHERE code = 'D2642' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D2740' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D2750' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D2751' AND code_type = @cdt_type;
UPDATE codes SET fee = 14000 WHERE code = 'D2752' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D2780' AND code_type = @cdt_type;
UPDATE codes SET fee = 18000 WHERE code = 'D2790' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D2799' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D2910' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D2920' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D2930' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D2940' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D2950' AND code_type = @cdt_type;
UPDATE codes SET fee = 1000 WHERE code = 'D2951' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D2952' AND code_type = @cdt_type;
UPDATE codes SET fee = 1000 WHERE code = 'D2954' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D2960' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D2961' AND code_type = @cdt_type;
UPDATE codes SET fee = 40000 WHERE code = 'D2962' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- ENDODONTICS — Rezeksion apikal: 20,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 3000 WHERE code = 'D3110' AND code_type = @cdt_type;
UPDATE codes SET fee = 2500 WHERE code = 'D3120' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D3220' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D3310' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D3320' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D3330' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D3346' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D3347' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D3348' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D3351' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D3410' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D3421' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D3425' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D3450' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- PERIODONTICS — Detartrazh i thelle: 5,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 15000 WHERE code = 'D4210' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D4211' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D4240' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D4241' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D4249' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D4260' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D4261' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D4341' AND code_type = @cdt_type;
UPDATE codes SET fee = 3500 WHERE code = 'D4342' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D4355' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D4381' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D4910' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- PROSTHODONTICS REMOVABLE — Proteze: 27,000-50,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 27000 WHERE code = 'D5110' AND code_type = @cdt_type;
UPDATE codes SET fee = 27000 WHERE code = 'D5120' AND code_type = @cdt_type;
UPDATE codes SET fee = 35000 WHERE code = 'D5130' AND code_type = @cdt_type;
UPDATE codes SET fee = 35000 WHERE code = 'D5140' AND code_type = @cdt_type;
UPDATE codes SET fee = 27000 WHERE code = 'D5211' AND code_type = @cdt_type;
UPDATE codes SET fee = 27000 WHERE code = 'D5212' AND code_type = @cdt_type;
UPDATE codes SET fee = 40000 WHERE code = 'D5213' AND code_type = @cdt_type;
UPDATE codes SET fee = 40000 WHERE code = 'D5214' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D5410' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D5411' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D5421' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D5422' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D5511' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D5611' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D5630' AND code_type = @cdt_type;
UPDATE codes SET fee = 4000 WHERE code = 'D5660' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D5710' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D5711' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D5730' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D5731' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D5750' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D5751' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- PROSTHODONTICS FIXED — Implant: 50,000; Kurore mbi implant: 24,000-30,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 50000 WHERE code = 'D6010' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D6012' AND code_type = @cdt_type;
UPDATE codes SET fee = 50000 WHERE code = 'D6040' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D6055' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D6056' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D6057' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D6058' AND code_type = @cdt_type;
UPDATE codes SET fee = 24000 WHERE code = 'D6059' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D6065' AND code_type = @cdt_type;
UPDATE codes SET fee = 24000 WHERE code = 'D6066' AND code_type = @cdt_type;
UPDATE codes SET fee = 24000 WHERE code = 'D6067' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D6068' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D6080' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D6100' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D6210' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D6240' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D6241' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D6245' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D6250' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D6600' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D6710' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D6720' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D6740' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D6750' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D6780' AND code_type = @cdt_type;
UPDATE codes SET fee = 18000 WHERE code = 'D6790' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D6930' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- ORAL SURGERY — Ekstraksion: 1,500-25,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 1500 WHERE code = 'D7111' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D7140' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7210' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D7220' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7230' AND code_type = @cdt_type;
UPDATE codes SET fee = 25000 WHERE code = 'D7240' AND code_type = @cdt_type;
UPDATE codes SET fee = 30000 WHERE code = 'D7241' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D7250' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D7260' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7270' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7280' AND code_type = @cdt_type;
UPDATE codes SET fee = 20000 WHERE code = 'D7283' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D7285' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D7286' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7310' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D7311' AND code_type = @cdt_type;
UPDATE codes SET fee = 18000 WHERE code = 'D7320' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D7321' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7471' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7472' AND code_type = @cdt_type;
UPDATE codes SET fee = 15000 WHERE code = 'D7473' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D7510' AND code_type = @cdt_type;
UPDATE codes SET fee = 12000 WHERE code = 'D7511' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D7520' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D7880' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D7910' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- ADJUNCTIVE — Zbardhim: 10,000; Shine bruksizmi: 6,000
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 5000 WHERE code = 'D9110' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9120' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D9210' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D9211' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9212' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D9215' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9219' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D9222' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9223' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9230' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D9239' AND code_type = @cdt_type;
UPDATE codes SET fee = 4000 WHERE code = 'D9243' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9310' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9311' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D9430' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9440' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9450' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9610' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9612' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D9630' AND code_type = @cdt_type;
UPDATE codes SET fee = 2000 WHERE code = 'D9910' AND code_type = @cdt_type;
UPDATE codes SET fee = 2500 WHERE code = 'D9911' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9920' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9930' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D9940' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9942' AND code_type = @cdt_type;
UPDATE codes SET fee = 1500 WHERE code = 'D9943' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D9944' AND code_type = @cdt_type;
UPDATE codes SET fee = 6000 WHERE code = 'D9945' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9946' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9950' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9951' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9952' AND code_type = @cdt_type;
UPDATE codes SET fee = 5000 WHERE code = 'D9970' AND code_type = @cdt_type;
UPDATE codes SET fee = 3000 WHERE code = 'D9971' AND code_type = @cdt_type;
UPDATE codes SET fee = 10000 WHERE code = 'D9972' AND code_type = @cdt_type;
UPDATE codes SET fee = 3500 WHERE code = 'D9973' AND code_type = @cdt_type;
UPDATE codes SET fee = 3500 WHERE code = 'D9974' AND code_type = @cdt_type;
UPDATE codes SET fee = 8000 WHERE code = 'D9975' AND code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- CUSTOM CODES — Clinic-specific procedures
-- (INSERT IGNORE so they're only added if not already present)
-- ───────────────────────────────────────────────────────────
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D7999A', @cdt_type, 'Sinus lift / Ngritje sinusi', 'Sinus Lift', 1, 65000),
('D7999B', @cdt_type, 'Bone graft / Graft kockor / Osteo plastik', 'Bone Graft', 1, 30000),
('D7999C', @cdt_type, 'Cyst removal / Heqje kisti', 'Cyst Removal', 1, 35000),
('D9999A', @cdt_type, 'PRP regeneration / Plazem rigjenerim', 'PRP Regeneration', 1, 25000),
('D9999B', @cdt_type, 'Fibrin regeneration / Fibrine rigjenerim', 'Fibrin Regeneration', 1, 25000),
('D6999A', @cdt_type, 'Immediate load temporary crown / Provizor karikim imediat', 'Immediate Load Temp', 1, 3000),
('D4999A', @cdt_type, 'Gum graft / Graft gingive', 'Gum Graft', 1, 50000),
('D8999A', @cdt_type, 'Gummy smile correction / Gammy smile', 'Gummy Smile', 1, 45000),
('D1999A', @cdt_type, 'Air flow cleaning / Detartrazh + air flow', 'Air Flow Cleaning', 1, 3500),
('D1999B', @cdt_type, 'Piercing placement / Vendosje pircing', 'Piercing Placement', 1, 3000),
('D2999A', @cdt_type, 'Reconstruction with metal pin / Rikonstruksion me vide metalike', 'Reconstruction Metal Pin', 1, 1000),
('D2999B', @cdt_type, 'Reconstruction with glass pin / Rikonstruksion me vide qelqi', 'Reconstruction Glass Pin', 1, 1500),
('D2999C', @cdt_type, 'Crown - Full Zirkon', 'Full Zirkon Crown', 1, 28000),
('D2999D', @cdt_type, 'Crown - E-max', 'E-max Crown', 1, 30000),
('D5999A', @cdt_type, 'Flexible total denture / Proteze totale elastike', 'Flexible Denture', 1, 50000),
('D2999E', @cdt_type, 'Child filling Grade 1 / Mbushje dhemb qumeshti Gr.1', 'Child Filling G1', 1, 2500),
('D2999F', @cdt_type, 'Child filling Grade 2 / Mbushje dhemb qumeshti Gr.2', 'Child Filling G2', 1, 3000),
('D2999G', @cdt_type, 'Child filling Grade 3 / Mbushje dhemb qumeshti Gr.3', 'Child Filling G3', 1, 3500);

-- Done! All fees updated to match LISTE CMIMESH.xlsx
SELECT CONCAT('Updated ', ROW_COUNT(), ' rows. Fee update complete.') AS result;
