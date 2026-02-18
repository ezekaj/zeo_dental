-- ═══════════════════════════════════════════════════════════
-- Zeo Dental Clinic - Fee Schedule from LISTE CMIMESH.xlsx
-- Exact names and prices from the Excel sheet
-- All prices in Albanian Lek (ALL)
-- ═══════════════════════════════════════════════════════════

SET @cdt_type = (SELECT ct_id FROM code_types WHERE ct_key = 'CDT');

-- ───────────────────────────────────────────────────────────
-- STEP 1: Deactivate ALL existing CDT codes (clean slate)
-- ───────────────────────────────────────────────────────────
UPDATE codes SET active = 0, fee = 0 WHERE code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- STEP 2: Insert custom codes that don't exist in standard CDT
-- (INSERT IGNORE = skip if already exists)
-- ───────────────────────────────────────────────────────────
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('ZEO01', @cdt_type, 'Mbushje dhemb qumeshti Gr.1', 'Mbushje qumeshti Gr.1', 1, 2500),
('ZEO02', @cdt_type, 'Mbushje dhemb qumeshti Gr.2', 'Mbushje qumeshti Gr.2', 1, 3000),
('ZEO03', @cdt_type, 'Mbushje dhemb qumeshti Gr.3', 'Mbushje qumeshti Gr.3', 1, 3500),
('ZEO04', @cdt_type, 'Rikonstruksion me vide metalike', 'Vide metalike', 1, 1000),
('ZEO05', @cdt_type, 'Rikonstruksion me vide qelqi', 'Vide qelqi', 1, 1500),
('ZEO06', @cdt_type, 'Detartrazh + air flow', 'Detartrazh+air flow', 1, 3500),
('ZEO07', @cdt_type, 'Vendosje Pircing', 'Pircing', 1, 3000),
('ZEO08', @cdt_type, 'Kurore full Zirkon', 'Full Zirkon', 1, 28000),
('ZEO09', @cdt_type, 'Kurore Emax', 'Emax', 1, 30000),
('ZEO10', @cdt_type, 'Proteze totale elastike (1 Nofull)', 'Proteze elastike', 1, 50000),
('ZEO11', @cdt_type, 'Sinus lift', 'Sinus lift', 1, 65000),
('ZEO12', @cdt_type, 'Gammy smile', 'Gammy smile', 1, 45000),
('ZEO13', @cdt_type, 'Osteo plastik', 'Osteo plastik', 1, 30000),
('ZEO14', @cdt_type, 'Graft kockor', 'Graft kockor', 1, 30000),
('ZEO15', @cdt_type, 'Graft gingive', 'Graft gingive', 1, 50000),
('ZEO16', @cdt_type, 'Heqje kisti', 'Heqje kisti', 1, 35000),
('ZEO17', @cdt_type, 'Plazem (rigjenerim)', 'Plazem', 1, 25000),
('ZEO18', @cdt_type, 'Fibrine (rigjenerim)', 'Fibrine', 1, 25000),
('ZEO19', @cdt_type, 'Dhemb provizor me karikim imediat (1 dhemb)', 'Provizor imediat', 1, 3000);

-- ───────────────────────────────────────────────────────────
-- STEP 3: Activate and set exact Excel names + prices
-- ───────────────────────────────────────────────────────────

-- === TERAPIA ===
UPDATE codes SET active=1, fee=2500,  code_text='Mbushje dhemb qumeshti Gr.1',  code_text_short='Mbushje qumeshti Gr.1' WHERE code='ZEO01' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Mbushje dhemb qumeshti Gr.2',  code_text_short='Mbushje qumeshti Gr.2' WHERE code='ZEO02' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3500,  code_text='Mbushje dhemb qumeshti Gr.3',  code_text_short='Mbushje qumeshti Gr.3' WHERE code='ZEO03' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Mbushje Gr.1',                 code_text_short='Mbushje Gr.1'           WHERE code='D2330' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=4000,  code_text='Mbushje Gr.2 posterior',        code_text_short='Mbushje Gr.2 post'     WHERE code='D2392' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=5000,  code_text='Mbushje Gr.2 anterior',         code_text_short='Mbushje Gr.2 ant'      WHERE code='D2331' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=6000,  code_text='Mbushje Gr.3',                 code_text_short='Mbushje Gr.3'           WHERE code='D2332' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=8500,  code_text='Mbushje Gr.4',                 code_text_short='Mbushje Gr.4'           WHERE code='D2335' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=1000,  code_text='Rikonstruksion me vide metalike', code_text_short='Vide metalike'       WHERE code='ZEO04' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=1500,  code_text='Rikonstruksion me vide qelqi',   code_text_short='Vide qelqi'           WHERE code='ZEO05' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=5000,  code_text='Rimbushje dhembi me amalgam',   code_text_short='Amalgam'               WHERE code='D2140' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=2500,  code_text='Silante',                       code_text_short='Silante'               WHERE code='D1351' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=10000, code_text='Fasete kompoziti',              code_text_short='Fasete kompoziti'       WHERE code='D2960' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=10000, code_text='Zbardhim profesional 1 seance', code_text_short='Zbardhim profesional'  WHERE code='D9972' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3500,  code_text='Zbardhim endodontik',           code_text_short='Zbardhim endodontik'   WHERE code='D9974' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=5000,  code_text='Konsulte',                      code_text_short='Konsulte'              WHERE code='D0150' AND code_type=@cdt_type;

-- === PROFILAKSIA ===
UPDATE codes SET active=1, fee=1500,  code_text='Pastrim cipash per femije',     code_text_short='Pastrim femije'        WHERE code='D1120' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Detartrazh',                    code_text_short='Detartrazh'            WHERE code='D1110' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3500,  code_text='Detartrazh + air flow',         code_text_short='Detartrazh+air flow'   WHERE code='ZEO06' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=5000,  code_text='Detartrazh i thelle',           code_text_short='Detartrazh i thelle'   WHERE code='D4341' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Vendosje Pircing',              code_text_short='Pircing'               WHERE code='ZEO07' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=6000,  code_text='Shine bruksizmi',               code_text_short='Shine bruksizmi'       WHERE code='D9940' AND code_type=@cdt_type;

-- === ORTOPEDI ===
UPDATE codes SET active=1, fee=12000, code_text='Kurore metal porcelani',              code_text_short='Kurore metal porc.'     WHERE code='D2751' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=24000, code_text='Kurore metal porcelani mbi implant',  code_text_short='Kurore metal mbi impl.' WHERE code='D6059' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=25000, code_text='Kurore Zirkon',                       code_text_short='Kurore Zirkon'          WHERE code='D2740' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=28000, code_text='Kurore full Zirkon',                  code_text_short='Full Zirkon'            WHERE code='ZEO08' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=30000, code_text='Kurore Emax',                         code_text_short='Emax'                   WHERE code='ZEO09' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=30000, code_text='Kurore Zirkon mbi implant',           code_text_short='Zirkon mbi implant'     WHERE code='D6065' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=40000, code_text='Fasete E-max',                        code_text_short='Fasete E-max'           WHERE code='D2962' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=27000, code_text='Proteze totale e thjeshte (1 Nofull)', code_text_short='Proteze e thjeshte'    WHERE code='D5110' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=50000, code_text='Proteze totale elastike (1 Nofull)',   code_text_short='Proteze elastike'       WHERE code='ZEO10' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=40000, code_text='Proteze e skeletuar (1 Nofull)',       code_text_short='Proteze skeletuar'      WHERE code='D5213' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Provizor (1 dhemb)',                   code_text_short='Provizor'               WHERE code='D2799' AND code_type=@cdt_type;

-- === KIRURGJI ===
UPDATE codes SET active=1, fee=1500,  code_text='Ekstraksion dhemb qumeshti',                code_text_short='Ekstr. qumeshti'      WHERE code='D7111' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Ekstraksion dhembi',                         code_text_short='Ekstraksion'          WHERE code='D7140' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=6000,  code_text='Ekstraksion dhemballe pjekurie',              code_text_short='Ekstr. pjekurie'     WHERE code='D7220' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=15000, code_text='Ekstraksion dhembi te komplikuar',            code_text_short='Ekstr. komplikuar'   WHERE code='D7210' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=25000, code_text='Ekstraksion dhemb te retinuar',               code_text_short='Ekstr. retinuar'     WHERE code='D7240' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=20000, code_text='Rezeksion apikal',                            code_text_short='Rezeksion apikal'    WHERE code='D3410' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=50000, code_text='Implant',                                     code_text_short='Implant'             WHERE code='D6010' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=65000, code_text='Sinus lift',                                  code_text_short='Sinus lift'          WHERE code='ZEO11' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=45000, code_text='Gammy smile',                                 code_text_short='Gammy smile'         WHERE code='ZEO12' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=30000, code_text='Osteo plastik',                               code_text_short='Osteo plastik'       WHERE code='ZEO13' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=30000, code_text='Graft kockor',                                code_text_short='Graft kockor'        WHERE code='ZEO14' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=50000, code_text='Graft gingive',                               code_text_short='Graft gingive'       WHERE code='ZEO15' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=35000, code_text='Heqje kisti',                                 code_text_short='Heqje kisti'         WHERE code='ZEO16' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=25000, code_text='Plazem (rigjenerim)',                         code_text_short='Plazem'              WHERE code='ZEO17' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=25000, code_text='Fibrine (rigjenerim)',                        code_text_short='Fibrine'             WHERE code='ZEO18' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=20000, code_text='Terheqje kanini',                             code_text_short='Terheqje kanini'     WHERE code='D7283' AND code_type=@cdt_type;
UPDATE codes SET active=1, fee=3000,  code_text='Dhemb provizor me karikim imediat (1 dhemb)', code_text_short='Provizor imediat'    WHERE code='ZEO19' AND code_type=@cdt_type;

-- ═══════════════════════════════════════════════════════════
SELECT 'Done! Only LISTE CMIMESH.xlsx services are active.' AS result;
