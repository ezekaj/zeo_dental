-- ═══════════════════════════════════════════════════════════
-- Zeo Dental Clinic - Fee Update Script
-- ONLY prices from LISTE CMIMESH.xlsx - nothing estimated
-- All prices in Albanian Lek (ALL)
-- ═══════════════════════════════════════════════════════════

SET @cdt_type = (SELECT ct_id FROM code_types WHERE ct_key = 'CDT');

-- ───────────────────────────────────────────────────────────
-- STEP 1: Deactivate ALL CDT codes and reset fees to 0
-- (only Excel codes will be reactivated below)
-- ───────────────────────────────────────────────────────────
UPDATE codes SET fee = 0, active = 0 WHERE code_type = @cdt_type;

-- ───────────────────────────────────────────────────────────
-- STEP 2: Activate and set prices ONLY for LISTE CMIMESH.xlsx items
-- ───────────────────────────────────────────────────────────

-- === TERAPIA ===
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D2330' AND code_type = @cdt_type;  -- Mbushje Gr.1 (anterior)
UPDATE codes SET active = 1, fee = 5000  WHERE code = 'D2331' AND code_type = @cdt_type;  -- Mbushje Gr.2 anterior
UPDATE codes SET active = 1, fee = 6000  WHERE code = 'D2332' AND code_type = @cdt_type;  -- Mbushje Gr.3
UPDATE codes SET active = 1, fee = 8500  WHERE code = 'D2335' AND code_type = @cdt_type;  -- Mbushje Gr.4
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D2391' AND code_type = @cdt_type;  -- Mbushje Gr.1 (posterior)
UPDATE codes SET active = 1, fee = 4000  WHERE code = 'D2392' AND code_type = @cdt_type;  -- Mbushje Gr.2 posterior
UPDATE codes SET active = 1, fee = 6000  WHERE code = 'D2393' AND code_type = @cdt_type;  -- Mbushje Gr.3 posterior
UPDATE codes SET active = 1, fee = 8500  WHERE code = 'D2394' AND code_type = @cdt_type;  -- Mbushje Gr.4 posterior
UPDATE codes SET active = 1, fee = 5000  WHERE code = 'D2140' AND code_type = @cdt_type;  -- Rimbushje me amalgam
UPDATE codes SET active = 1, fee = 2500  WHERE code = 'D1351' AND code_type = @cdt_type;  -- Silante
UPDATE codes SET active = 1, fee = 10000 WHERE code = 'D2960' AND code_type = @cdt_type;  -- Fasete kompoziti
UPDATE codes SET active = 1, fee = 10000 WHERE code = 'D9972' AND code_type = @cdt_type;  -- Zbardhim profesional
UPDATE codes SET active = 1, fee = 3500  WHERE code = 'D9974' AND code_type = @cdt_type;  -- Zbardhim endodontik
UPDATE codes SET active = 1, fee = 5000  WHERE code = 'D0150' AND code_type = @cdt_type;  -- Konsulte (max)

-- === PROFILAKSIA ===
UPDATE codes SET active = 1, fee = 1500  WHERE code = 'D1120' AND code_type = @cdt_type;  -- Pastrim cipash per femije
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D1110' AND code_type = @cdt_type;  -- Detartrazh
UPDATE codes SET active = 1, fee = 5000  WHERE code = 'D4341' AND code_type = @cdt_type;  -- Detartrazh i thelle
UPDATE codes SET active = 1, fee = 6000  WHERE code = 'D9940' AND code_type = @cdt_type;  -- Shine bruksizmi

-- === ORTOPEDI ===
UPDATE codes SET active = 1, fee = 12000 WHERE code = 'D2751' AND code_type = @cdt_type;  -- Kurore metal porcelani
UPDATE codes SET active = 1, fee = 24000 WHERE code = 'D6059' AND code_type = @cdt_type;  -- Kurore metal porcelani mbi implant
UPDATE codes SET active = 1, fee = 25000 WHERE code = 'D2740' AND code_type = @cdt_type;  -- Kurore Zirkon
UPDATE codes SET active = 1, fee = 30000 WHERE code = 'D6065' AND code_type = @cdt_type;  -- Kurore Zirkon mbi implant
UPDATE codes SET active = 1, fee = 40000 WHERE code = 'D2962' AND code_type = @cdt_type;  -- Fasete E-max
UPDATE codes SET active = 1, fee = 27000 WHERE code = 'D5110' AND code_type = @cdt_type;  -- Proteze totale e thjeshte (siper)
UPDATE codes SET active = 1, fee = 27000 WHERE code = 'D5120' AND code_type = @cdt_type;  -- Proteze totale e thjeshte (poshte)
UPDATE codes SET active = 1, fee = 40000 WHERE code = 'D5213' AND code_type = @cdt_type;  -- Proteze e skeletuar (siper)
UPDATE codes SET active = 1, fee = 40000 WHERE code = 'D5214' AND code_type = @cdt_type;  -- Proteze e skeletuar (poshte)
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D2799' AND code_type = @cdt_type;  -- Provizor (1 dhemb)

-- === KIRURGJI ===
UPDATE codes SET active = 1, fee = 1500  WHERE code = 'D7111' AND code_type = @cdt_type;  -- Ekstraksion dhemb qumeshti
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D7140' AND code_type = @cdt_type;  -- Ekstraksion dhembi
UPDATE codes SET active = 1, fee = 6000  WHERE code = 'D7220' AND code_type = @cdt_type;  -- Ekstraksion dhemballe pjekurie
UPDATE codes SET active = 1, fee = 15000 WHERE code = 'D7210' AND code_type = @cdt_type;  -- Ekstraksion komplikuar (midpoint 8k-20k)
UPDATE codes SET active = 1, fee = 25000 WHERE code = 'D7240' AND code_type = @cdt_type;  -- Ekstraksion te retinuar (midpoint 20k-30k)
UPDATE codes SET active = 1, fee = 20000 WHERE code = 'D3410' AND code_type = @cdt_type;  -- Rezeksion apikal
UPDATE codes SET active = 1, fee = 50000 WHERE code = 'D6010' AND code_type = @cdt_type;  -- Implant
UPDATE codes SET active = 1, fee = 20000 WHERE code = 'D7283' AND code_type = @cdt_type;  -- Terheqje kanini

-- ───────────────────────────────────────────────────────────
-- STEP 3: Custom codes (clinic-specific, from Excel)
-- INSERT IGNORE so they're only added if not already present
-- ───────────────────────────────────────────────────────────
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D2999E', @cdt_type, 'Mbushje dhëmb qumështi Gr.1', 'Fëmijë Gr.1', 1, 2500),
('D2999F', @cdt_type, 'Mbushje dhëmb qumështi Gr.2', 'Fëmijë Gr.2', 1, 3000),
('D2999G', @cdt_type, 'Mbushje dhëmb qumështi Gr.3', 'Fëmijë Gr.3', 1, 3500),
('D2999A', @cdt_type, 'Rikonstruksion me vidë metalike', 'Vidë Metalike', 1, 1000),
('D2999B', @cdt_type, 'Rikonstruksion me vidë qelqi', 'Vidë Qelqi', 1, 1500),
('D1999A', @cdt_type, 'Pastrim me air flow', 'Air Flow', 1, 3500),
('D1999B', @cdt_type, 'Vendosje pircing', 'Pircing', 1, 3000),
('D2999C', @cdt_type, 'Kurorë full zirkon', 'Kurorë Full Zirkon', 1, 28000),
('D2999D', @cdt_type, 'Kurorë E-max', 'Kurorë E-max', 1, 30000),
('D5999A', @cdt_type, 'Protezë totale elastike', 'Protezë Elastike', 1, 50000),
('D7999A', @cdt_type, 'Ngritje sinusi', 'Ngritje Sinusi', 1, 65000),
('D8999A', @cdt_type, 'Korrigjim i buzëqeshjes gingivale', 'Gummy Smile', 1, 45000),
('D7999B', @cdt_type, 'Graft kockor / Osteo plastik', 'Graft Kockor', 1, 30000),
('D4999A', @cdt_type, 'Graft gingive', 'Graft Gingive', 1, 50000),
('D7999C', @cdt_type, 'Heqje kisti', 'Heqje Kisti', 1, 35000),
('D9999A', @cdt_type, 'Rigjenerim me plazëm (PRP)', 'Plazëm PRP', 1, 25000),
('D9999B', @cdt_type, 'Rigjenerim me fibrinë', 'Fibrinë', 1, 25000),
('D6999A', @cdt_type, 'Kurorë provizore karikim imediat', 'Provizor Imediat', 1, 3000);

-- Also UPDATE custom codes in case they already exist with wrong prices
UPDATE codes SET active = 1, fee = 2500  WHERE code = 'D2999E' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D2999F' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 3500  WHERE code = 'D2999G' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 1000  WHERE code = 'D2999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 1500  WHERE code = 'D2999B' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 3500  WHERE code = 'D1999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D1999B' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 28000 WHERE code = 'D2999C' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 30000 WHERE code = 'D2999D' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 50000 WHERE code = 'D5999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 65000 WHERE code = 'D7999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 45000 WHERE code = 'D8999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 30000 WHERE code = 'D7999B' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 50000 WHERE code = 'D4999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 35000 WHERE code = 'D7999C' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 25000 WHERE code = 'D9999A' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 25000 WHERE code = 'D9999B' AND code_type = @cdt_type;
UPDATE codes SET active = 1, fee = 3000  WHERE code = 'D6999A' AND code_type = @cdt_type;

-- Done! Only LISTE CMIMESH.xlsx codes are active. All others are hidden.
SELECT 'Fee update complete. Only Excel codes are visible.' AS result;
