-- ManagerCRM Dental Configuration
-- CDT codes, appointment categories, currency, security, and settings

-- ═══════════════════════════════════════════════════════════
-- 1. CDT CODE TYPE
-- ═══════════════════════════════════════════════════════════

INSERT INTO code_types (ct_id, ct_key, ct_label, ct_proc, ct_fee, ct_rel, ct_nofs, ct_diag, ct_active, ct_seq)
SELECT 120, 'CDT', 'CDT Dental Procedure', 1, 1, 0, 0, 0, 1, 20
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM code_types WHERE ct_key = 'CDT');

-- ═══════════════════════════════════════════════════════════
-- 2. CDT DENTAL PROCEDURE CODES
-- ═══════════════════════════════════════════════════════════

SET @cdt_type = (SELECT ct_id FROM code_types WHERE ct_key = 'CDT');

-- Diagnostic (D0100-D0999) — Konsulte: 1,000-5,000 ALL
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D0120', @cdt_type, 'Periodic oral evaluation - established patient', 'Periodic Oral Eval', 1, 1000),
('D0140', @cdt_type, 'Limited oral evaluation - problem focused', 'Limited Oral Eval', 1, 2000),
('D0150', @cdt_type, 'Comprehensive oral evaluation - new or established patient', 'Comprehensive Oral Eval', 1, 5000),
('D0160', @cdt_type, 'Detailed and extensive oral evaluation - problem focused', 'Detailed Oral Eval', 1, 5000),
('D0170', @cdt_type, 'Re-evaluation - limited, problem focused', 'Re-evaluation', 1, 2000),
('D0180', @cdt_type, 'Comprehensive periodontal evaluation - new or established patient', 'Perio Eval', 1, 5000),
('D0210', @cdt_type, 'Intraoral - complete series of radiographic images', 'Full Mouth X-Ray', 1, 8000),
('D0220', @cdt_type, 'Intraoral - periapical first radiographic image', 'Periapical X-Ray', 1, 2000),
('D0230', @cdt_type, 'Intraoral - periapical each additional radiographic image', 'Additional Periapical', 1, 1500),
('D0240', @cdt_type, 'Intraoral - occlusal radiographic image', 'Occlusal X-Ray', 1, 2500),
('D0270', @cdt_type, 'Bitewing - single radiographic image', 'Bitewing Single', 1, 2000),
('D0272', @cdt_type, 'Bitewings - two radiographic images', 'Bitewings x2', 1, 3000),
('D0274', @cdt_type, 'Bitewings - four radiographic images', 'Bitewings x4', 1, 4500),
('D0330', @cdt_type, 'Panoramic radiographic image', 'Panoramic X-Ray', 1, 6000),
('D0340', @cdt_type, '2D cephalometric radiographic image', 'Cephalometric X-Ray', 1, 5000),
('D0350', @cdt_type, '2D oral/facial photographic image', 'Oral Photo', 1, 1500),
('D0460', @cdt_type, 'Pulp vitality tests', 'Pulp Vitality Test', 1, 2000),
('D0470', @cdt_type, 'Diagnostic casts', 'Diagnostic Casts', 1, 4000),
('D0431', @cdt_type, 'Adjunctive pre-diagnostic test that aids in detection of mucosal abnormalities', 'Oral Cancer Screening', 1, 3000);

-- Preventive (D1000-D1999) — Detartrazh: 3,000; Femije: 1,500; Silante: 2,500
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D1110', @cdt_type, 'Prophylaxis - adult', 'Adult Cleaning', 1, 3000),
('D1120', @cdt_type, 'Prophylaxis - child', 'Child Cleaning', 1, 1500),
('D1206', @cdt_type, 'Topical application of fluoride varnish', 'Fluoride Varnish', 1, 2000),
('D1208', @cdt_type, 'Topical application of fluoride', 'Fluoride Treatment', 1, 1500),
('D1310', @cdt_type, 'Nutritional counseling for control of dental disease', 'Nutritional Counseling', 1, 2000),
('D1320', @cdt_type, 'Tobacco counseling for the control and prevention of oral disease', 'Tobacco Counseling', 1, 2000),
('D1330', @cdt_type, 'Oral hygiene instructions', 'Oral Hygiene Instructions', 1, 1500),
('D1351', @cdt_type, 'Sealant - per tooth', 'Sealant', 1, 2500),
('D1352', @cdt_type, 'Preventive resin restoration - permanent tooth', 'Preventive Resin', 1, 3000),
('D1510', @cdt_type, 'Space maintainer - fixed, unilateral', 'Space Maintainer Fixed', 1, 10000),
('D1520', @cdt_type, 'Space maintainer - removable, unilateral', 'Space Maintainer Removable', 1, 8000),
('D1553', @cdt_type, 'Re-cement or re-bond bilateral space maintainer', 'Recement Space Maintainer', 1, 3000),
('D1575', @cdt_type, 'Distal shoe space maintainer - fixed, unilateral', 'Distal Shoe Maintainer', 1, 12000);

-- Restorative (D2000-D2999) — Mbushje: 3,000-8,500; Kurore: 12,000-30,000; Fasete: 10,000-40,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D2140', @cdt_type, 'Amalgam - one surface, primary or permanent', 'Amalgam 1 Surface', 1, 5000),
('D2150', @cdt_type, 'Amalgam - two surfaces, primary or permanent', 'Amalgam 2 Surfaces', 1, 5000),
('D2160', @cdt_type, 'Amalgam - three surfaces, primary or permanent', 'Amalgam 3 Surfaces', 1, 5000),
('D2161', @cdt_type, 'Amalgam - four or more surfaces, primary or permanent', 'Amalgam 4+ Surfaces', 1, 5000),
('D2330', @cdt_type, 'Resin-based composite - one surface, anterior', 'Composite 1 Surface Ant', 1, 3000),
('D2331', @cdt_type, 'Resin-based composite - two surfaces, anterior', 'Composite 2 Surfaces Ant', 1, 5000),
('D2332', @cdt_type, 'Resin-based composite - three surfaces, anterior', 'Composite 3 Surfaces Ant', 1, 6000),
('D2335', @cdt_type, 'Resin-based composite - four or more surfaces, anterior', 'Composite 4+ Surfaces Ant', 1, 8500),
('D2390', @cdt_type, 'Resin-based composite crown, anterior', 'Composite Crown Ant', 1, 10000),
('D2391', @cdt_type, 'Resin-based composite - one surface, posterior', 'Composite 1 Surface Post', 1, 4000),
('D2392', @cdt_type, 'Resin-based composite - two surfaces, posterior', 'Composite 2 Surfaces Post', 1, 4000),
('D2393', @cdt_type, 'Resin-based composite - three surfaces, posterior', 'Composite 3 Surfaces Post', 1, 6000),
('D2394', @cdt_type, 'Resin-based composite - four or more surfaces, posterior', 'Composite 4+ Surfaces Post', 1, 8500),
('D2510', @cdt_type, 'Inlay - metallic - one surface', 'Metal Inlay 1 Surface', 1, 15000),
('D2542', @cdt_type, 'Onlay - metallic - two surfaces', 'Metal Onlay 2 Surfaces', 1, 20000),
('D2610', @cdt_type, 'Inlay - porcelain/ceramic - one surface', 'Ceramic Inlay 1 Surface', 1, 20000),
('D2630', @cdt_type, 'Inlay - porcelain/ceramic - three or more surfaces', 'Ceramic Inlay 3+ Surfaces', 1, 25000),
('D2642', @cdt_type, 'Onlay - porcelain/ceramic - two surfaces', 'Ceramic Onlay 2 Surfaces', 1, 22000),
('D2740', @cdt_type, 'Crown - porcelain/ceramic (Zirkon)', 'Zirkon Crown', 1, 25000),
('D2750', @cdt_type, 'Crown - porcelain fused to high noble metal', 'PFM Crown High Noble', 1, 15000),
('D2751', @cdt_type, 'Crown - porcelain fused to predominantly base metal', 'PFM Crown Base Metal', 1, 12000),
('D2752', @cdt_type, 'Crown - porcelain fused to noble metal', 'PFM Crown Noble', 1, 14000),
('D2780', @cdt_type, 'Crown - 3/4 cast high noble metal', '3/4 Crown High Noble', 1, 15000),
('D2790', @cdt_type, 'Crown - full cast high noble metal', 'Full Cast Crown', 1, 18000),
('D2799', @cdt_type, 'Provisional crown - further treatment or completion of diagnosis necessary', 'Temporary Crown', 1, 3000),
('D2910', @cdt_type, 'Re-cement or re-bond inlay, onlay, veneer, or partial coverage restoration', 'Recement Inlay/Onlay', 1, 3000),
('D2920', @cdt_type, 'Re-cement or re-bond indirectly fabricated or prefabricated post and core', 'Recement Post/Core', 1, 3000),
('D2930', @cdt_type, 'Prefabricated stainless steel crown - primary tooth', 'SS Crown Primary', 1, 8000),
('D2940', @cdt_type, 'Protective restoration', 'Protective Restoration', 1, 5000),
('D2950', @cdt_type, 'Core buildup, including any pins when required', 'Core Buildup', 1, 1500),
('D2951', @cdt_type, 'Pin retention - per tooth, in addition to restoration', 'Pin Retention', 1, 1000),
('D2952', @cdt_type, 'Post and core in addition to crown, indirectly fabricated', 'Post and Core', 1, 1500),
('D2954', @cdt_type, 'Prefabricated post and core in addition to crown', 'Prefab Post and Core', 1, 1000),
('D2960', @cdt_type, 'Labial veneer (resin laminate) - chairside', 'Resin Veneer Chairside', 1, 10000),
('D2961', @cdt_type, 'Labial veneer (resin laminate) - laboratory', 'Resin Veneer Lab', 1, 10000),
('D2962', @cdt_type, 'Labial veneer (porcelain laminate) - laboratory', 'Porcelain Veneer E-max', 1, 40000);

-- Endodontics (D3000-D3999) — Rezeksion apikal: 20,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D3110', @cdt_type, 'Pulp cap - direct (excluding final restoration)', 'Direct Pulp Cap', 1, 3000),
('D3120', @cdt_type, 'Pulp cap - indirect (excluding final restoration)', 'Indirect Pulp Cap', 1, 2500),
('D3220', @cdt_type, 'Therapeutic pulpotomy', 'Pulpotomy', 1, 5000),
('D3310', @cdt_type, 'Endodontic therapy, anterior tooth (excluding final restoration)', 'Root Canal Anterior', 1, 15000),
('D3320', @cdt_type, 'Endodontic therapy, premolar tooth (excluding final restoration)', 'Root Canal Premolar', 1, 20000),
('D3330', @cdt_type, 'Endodontic therapy, molar tooth (excluding final restoration)', 'Root Canal Molar', 1, 25000),
('D3346', @cdt_type, 'Retreatment of previous root canal therapy - anterior', 'Retreatment RC Anterior', 1, 20000),
('D3347', @cdt_type, 'Retreatment of previous root canal therapy - premolar', 'Retreatment RC Premolar', 1, 25000),
('D3348', @cdt_type, 'Retreatment of previous root canal therapy - molar', 'Retreatment RC Molar', 1, 30000),
('D3351', @cdt_type, 'Apexification/recalcification - initial visit', 'Apexification Initial', 1, 10000),
('D3410', @cdt_type, 'Apicoectomy - anterior', 'Apicoectomy Anterior', 1, 20000),
('D3421', @cdt_type, 'Apicoectomy - premolar (first root)', 'Apicoectomy Premolar', 1, 20000),
('D3425', @cdt_type, 'Apicoectomy - molar (first root)', 'Apicoectomy Molar', 1, 20000),
('D3450', @cdt_type, 'Root amputation - per root', 'Root Amputation', 1, 15000);

-- Periodontics (D4000-D4999) — Detartrazh i thelle: 5,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D4210', @cdt_type, 'Gingivectomy or gingivoplasty - four or more contiguous teeth per quadrant', 'Gingivectomy 4+ Teeth', 1, 15000),
('D4211', @cdt_type, 'Gingivectomy or gingivoplasty - one to three contiguous teeth per quadrant', 'Gingivectomy 1-3 Teeth', 1, 10000),
('D4240', @cdt_type, 'Gingival flap procedure, including root planing - four or more teeth per quadrant', 'Gingival Flap 4+ Teeth', 1, 20000),
('D4241', @cdt_type, 'Gingival flap procedure, including root planing - one to three teeth per quadrant', 'Gingival Flap 1-3 Teeth', 1, 15000),
('D4249', @cdt_type, 'Clinical crown lengthening - hard tissue', 'Crown Lengthening', 1, 25000),
('D4260', @cdt_type, 'Osseous surgery - four or more contiguous teeth per quadrant', 'Osseous Surgery 4+', 1, 30000),
('D4261', @cdt_type, 'Osseous surgery - one to three contiguous teeth per quadrant', 'Osseous Surgery 1-3', 1, 20000),
('D4341', @cdt_type, 'Periodontal scaling and root planing - four or more teeth per quadrant', 'SRP 4+ Teeth', 1, 5000),
('D4342', @cdt_type, 'Periodontal scaling and root planing - one to three teeth per quadrant', 'SRP 1-3 Teeth', 1, 3500),
('D4355', @cdt_type, 'Full mouth debridement to enable a comprehensive oral evaluation', 'Full Mouth Debridement', 1, 5000),
('D4381', @cdt_type, 'Localized delivery of antimicrobial agents via a controlled release vehicle', 'Local Antimicrobial', 1, 3000),
('D4910', @cdt_type, 'Periodontal maintenance', 'Perio Maintenance', 1, 5000);

-- Prosthodontics Removable (D5000-D5899) — Proteze totale: 27,000; Elastike: 50,000; Skeletuar: 40,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D5110', @cdt_type, 'Complete denture - maxillary', 'Complete Denture Upper', 1, 27000),
('D5120', @cdt_type, 'Complete denture - mandibular', 'Complete Denture Lower', 1, 27000),
('D5130', @cdt_type, 'Immediate denture - maxillary', 'Immediate Denture Upper', 1, 35000),
('D5140', @cdt_type, 'Immediate denture - mandibular', 'Immediate Denture Lower', 1, 35000),
('D5211', @cdt_type, 'Maxillary partial denture - resin base', 'Partial Denture Upper Resin', 1, 27000),
('D5212', @cdt_type, 'Mandibular partial denture - resin base', 'Partial Denture Lower Resin', 1, 27000),
('D5213', @cdt_type, 'Maxillary partial denture - cast metal framework with resin denture bases', 'Partial Denture Upper Metal', 1, 40000),
('D5214', @cdt_type, 'Mandibular partial denture - cast metal framework with resin denture bases', 'Partial Denture Lower Metal', 1, 40000),
('D5410', @cdt_type, 'Adjust complete denture - maxillary', 'Adjust Denture Upper', 1, 2000),
('D5411', @cdt_type, 'Adjust complete denture - mandibular', 'Adjust Denture Lower', 1, 2000),
('D5421', @cdt_type, 'Adjust partial denture - maxillary', 'Adjust Partial Upper', 1, 2000),
('D5422', @cdt_type, 'Adjust partial denture - mandibular', 'Adjust Partial Lower', 1, 2000),
('D5511', @cdt_type, 'Repair broken complete denture base, mandibular', 'Repair Denture Base', 1, 5000),
('D5611', @cdt_type, 'Repair resin partial denture base, mandibular', 'Repair Partial Base', 1, 5000),
('D5630', @cdt_type, 'Repair or replace broken clasp - per tooth', 'Repair Clasp', 1, 3000),
('D5660', @cdt_type, 'Add clasp to existing partial denture - per tooth', 'Add Clasp', 1, 4000),
('D5710', @cdt_type, 'Rebase complete maxillary denture', 'Rebase Denture Upper', 1, 15000),
('D5711', @cdt_type, 'Rebase complete mandibular denture', 'Rebase Denture Lower', 1, 15000),
('D5730', @cdt_type, 'Reline complete maxillary denture (chairside)', 'Reline Denture Upper', 1, 10000),
('D5731', @cdt_type, 'Reline complete mandibular denture (chairside)', 'Reline Denture Lower', 1, 10000),
('D5750', @cdt_type, 'Reline complete maxillary denture (laboratory)', 'Reline Denture Upper Lab', 1, 12000),
('D5751', @cdt_type, 'Reline complete mandibular denture (laboratory)', 'Reline Denture Lower Lab', 1, 12000);

-- Prosthodontics Fixed (D6000-D6999) — Implant: 50,000; Kurore mbi implant: 24,000-30,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D6010', @cdt_type, 'Surgical placement of implant body: endosteal implant', 'Implant Placement', 1, 50000),
('D6012', @cdt_type, 'Surgical placement of interim implant body for transitional prosthesis', 'Interim Implant', 1, 30000),
('D6040', @cdt_type, 'Eposteal implant', 'Eposteal Implant', 1, 50000),
('D6055', @cdt_type, 'Dental implant supported connecting bar', 'Implant Connecting Bar', 1, 20000),
('D6056', @cdt_type, 'Prefabricated abutment', 'Prefab Abutment', 1, 15000),
('D6057', @cdt_type, 'Custom fabricated abutment', 'Custom Abutment', 1, 20000),
('D6058', @cdt_type, 'Abutment supported porcelain/ceramic crown', 'Implant Porcelain Crown', 1, 30000),
('D6059', @cdt_type, 'Abutment supported porcelain fused to metal crown', 'Implant PFM Crown', 1, 24000),
('D6065', @cdt_type, 'Implant supported porcelain/ceramic crown', 'Implant Crown Ceramic', 1, 30000),
('D6066', @cdt_type, 'Implant supported crown - porcelain fused to metal', 'Implant Crown PFM', 1, 24000),
('D6067', @cdt_type, 'Implant supported metal crown', 'Implant Crown Metal', 1, 24000),
('D6068', @cdt_type, 'Abutment supported retainer for porcelain/ceramic FPD', 'Abutment Retainer Ceramic', 1, 25000),
('D6080', @cdt_type, 'Implant maintenance procedures', 'Implant Maintenance', 1, 5000),
('D6100', @cdt_type, 'Implant removal, by report', 'Implant Removal', 1, 20000),
('D6210', @cdt_type, 'Pontic - cast high noble metal', 'Pontic High Noble', 1, 12000),
('D6240', @cdt_type, 'Pontic - porcelain fused to high noble metal', 'Pontic PFM High Noble', 1, 15000),
('D6241', @cdt_type, 'Pontic - porcelain fused to predominantly base metal', 'Pontic PFM Base', 1, 12000),
('D6245', @cdt_type, 'Pontic - porcelain/ceramic', 'Pontic Ceramic', 1, 25000),
('D6250', @cdt_type, 'Pontic - resin with high noble metal', 'Pontic Resin Noble', 1, 12000),
('D6600', @cdt_type, 'Retainer inlay - porcelain/ceramic, two surfaces', 'Retainer Inlay Ceramic', 1, 20000),
('D6710', @cdt_type, 'Retainer crown - indirect resin based composite', 'Retainer Crown Composite', 1, 12000),
('D6720', @cdt_type, 'Retainer crown - resin with predominantly base metal', 'Retainer Crown Resin', 1, 12000),
('D6740', @cdt_type, 'Retainer crown - porcelain/ceramic', 'Retainer Crown Ceramic', 1, 25000),
('D6750', @cdt_type, 'Retainer crown - porcelain fused to high noble metal', 'Retainer Crown PFM', 1, 15000),
('D6780', @cdt_type, 'Retainer crown - 3/4 cast high noble metal', 'Retainer 3/4 Crown', 1, 15000),
('D6790', @cdt_type, 'Retainer crown - full cast high noble metal', 'Retainer Full Cast Crown', 1, 18000),
('D6930', @cdt_type, 'Re-cement or re-bond fixed partial denture', 'Recement Bridge', 1, 5000);

-- Oral Surgery (D7000-D7999) — Ekstraksion: 1,500-25,000; Implant: 50,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D7111', @cdt_type, 'Extraction, coronal remnants - primary tooth', 'Extract Primary Tooth', 1, 1500),
('D7140', @cdt_type, 'Extraction, erupted tooth or exposed root', 'Simple Extraction', 1, 3000),
('D7210', @cdt_type, 'Extraction, erupted tooth requiring removal of bone and/or sectioning of tooth', 'Surgical Extraction', 1, 15000),
('D7220', @cdt_type, 'Removal of impacted tooth - soft tissue', 'Impacted Tooth Soft Tissue', 1, 6000),
('D7230', @cdt_type, 'Removal of impacted tooth - partially bony', 'Impacted Tooth Partial Bony', 1, 15000),
('D7240', @cdt_type, 'Removal of impacted tooth - completely bony', 'Impacted Tooth Full Bony', 1, 25000),
('D7241', @cdt_type, 'Removal of impacted tooth - completely bony, with unusual surgical complications', 'Impacted Tooth Complex', 1, 30000),
('D7250', @cdt_type, 'Removal of residual tooth roots (cutting procedure)', 'Root Tip Removal', 1, 8000),
('D7260', @cdt_type, 'Oroantral fistula closure', 'Fistula Closure', 1, 20000),
('D7270', @cdt_type, 'Tooth reimplantation and/or stabilization of accidentally avulsed or displaced tooth', 'Tooth Reimplantation', 1, 15000),
('D7280', @cdt_type, 'Exposure of an unerupted tooth', 'Expose Unerupted Tooth', 1, 15000),
('D7283', @cdt_type, 'Placement of device to facilitate eruption of impacted tooth', 'Eruption Device / Canine Traction', 1, 20000),
('D7285', @cdt_type, 'Incisional biopsy of oral tissue - hard', 'Biopsy Hard Tissue', 1, 10000),
('D7286', @cdt_type, 'Incisional biopsy of oral tissue - soft', 'Biopsy Soft Tissue', 1, 8000),
('D7310', @cdt_type, 'Alveoloplasty in conjunction with extractions - four or more teeth per quadrant', 'Alveoloplasty 4+ Teeth', 1, 15000),
('D7311', @cdt_type, 'Alveoloplasty in conjunction with extractions - one to three teeth per quadrant', 'Alveoloplasty 1-3 Teeth', 1, 10000),
('D7320', @cdt_type, 'Alveoloplasty not in conjunction with extractions - four or more teeth per quadrant', 'Alveoloplasty Alone 4+', 1, 18000),
('D7321', @cdt_type, 'Alveoloplasty not in conjunction with extractions - one to three teeth per quadrant', 'Alveoloplasty Alone 1-3', 1, 12000),
('D7471', @cdt_type, 'Removal of lateral exostosis', 'Remove Exostosis', 1, 15000),
('D7472', @cdt_type, 'Removal of torus palatinus', 'Remove Torus Palatinus', 1, 15000),
('D7473', @cdt_type, 'Removal of torus mandibularis', 'Remove Torus Mandibularis', 1, 15000),
('D7510', @cdt_type, 'Incision and drainage of abscess - intraoral soft tissue', 'I&D Abscess Intraoral', 1, 8000),
('D7511', @cdt_type, 'Incision and drainage of abscess - intraoral soft tissue - complicated', 'I&D Abscess Complex', 1, 12000),
('D7520', @cdt_type, 'Incision and drainage of abscess - extraoral soft tissue', 'I&D Abscess Extraoral', 1, 10000),
('D7880', @cdt_type, 'Occlusal orthotic device, by report', 'Occlusal Orthotic', 1, 6000),
('D7910', @cdt_type, 'Suture of recent small wounds up to 5 cm', 'Suture Small Wound', 1, 5000);

-- Orthodontics (D8000-D8999)
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D8010', @cdt_type, 'Limited orthodontic treatment of the primary dentition', 'Ortho Limited Primary', 1, 100000),
('D8020', @cdt_type, 'Limited orthodontic treatment of the transitional dentition', 'Ortho Limited Transitional', 1, 120000),
('D8030', @cdt_type, 'Limited orthodontic treatment of the adolescent dentition', 'Ortho Limited Adolescent', 1, 150000),
('D8040', @cdt_type, 'Limited orthodontic treatment of the adult dentition', 'Ortho Limited Adult', 1, 180000),
('D8070', @cdt_type, 'Comprehensive orthodontic treatment of the transitional dentition', 'Ortho Full Transitional', 1, 250000),
('D8080', @cdt_type, 'Comprehensive orthodontic treatment of the adolescent dentition', 'Ortho Full Adolescent', 1, 300000),
('D8090', @cdt_type, 'Comprehensive orthodontic treatment of the adult dentition', 'Ortho Full Adult', 1, 350000),
('D8210', @cdt_type, 'Removable appliance therapy', 'Removable Appliance', 1, 80000),
('D8220', @cdt_type, 'Fixed appliance therapy', 'Fixed Appliance', 1, 100000),
('D8660', @cdt_type, 'Pre-orthodontic treatment examination', 'Ortho Exam', 1, 5000),
('D8670', @cdt_type, 'Periodic orthodontic treatment visit', 'Ortho Visit', 1, 4000),
('D8680', @cdt_type, 'Orthodontic retention (removal of appliances, construction and placement of retainer)', 'Ortho Retention', 1, 30000),
('D8681', @cdt_type, 'Removable orthodontic retainer adjustment', 'Retainer Adjustment', 1, 3000),
('D8690', @cdt_type, 'Orthodontic treatment (alternative billing to a contract fee)', 'Ortho Alt Billing', 1, 0),
('D8695', @cdt_type, 'Removal of fixed orthodontic appliances for reasons other than completion of treatment', 'Remove Ortho Appliance', 1, 15000),
('D8999', @cdt_type, 'Unspecified orthodontic procedure, by report', 'Ortho Unspecified', 1, 0);

-- Adjunctive General Services (D9000-D9999) — Zbardhim: 10,000; Shine bruksizmi: 6,000
INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D9110', @cdt_type, 'Palliative (emergency) treatment of dental pain - minor procedure', 'Emergency Pain Treatment', 1, 5000),
('D9120', @cdt_type, 'Fixed partial denture sectioning', 'Section Bridge', 1, 5000),
('D9210', @cdt_type, 'Local anesthesia not in conjunction with operative or surgical procedures', 'Local Anesthesia', 1, 1500),
('D9211', @cdt_type, 'Regional block anesthesia', 'Block Anesthesia', 1, 2000),
('D9212', @cdt_type, 'Trigeminal division block anesthesia', 'Trigeminal Block', 1, 3000),
('D9215', @cdt_type, 'Local anesthesia in conjunction with operative or surgical procedures', 'Local Anesthesia w/Proc', 1, 1500),
('D9219', @cdt_type, 'Evaluation for moderate sedation, deep sedation, or general anesthesia', 'Sedation Eval', 1, 3000),
('D9222', @cdt_type, 'Deep sedation/general anesthesia - first 15 minutes', 'General Anesthesia First 15min', 1, 10000),
('D9223', @cdt_type, 'Deep sedation/general anesthesia - each subsequent 15 minutes', 'General Anesthesia Add 15min', 1, 5000),
('D9230', @cdt_type, 'Inhalation of nitrous oxide / analgesia, anxiolysis', 'Nitrous Oxide', 1, 3000),
('D9239', @cdt_type, 'Intravenous moderate (conscious) sedation/analgesia - first 15 minutes', 'IV Sedation First 15min', 1, 8000),
('D9243', @cdt_type, 'Intravenous moderate (conscious) sedation/analgesia - each subsequent 15 minutes', 'IV Sedation Add 15min', 1, 4000),
('D9310', @cdt_type, 'Consultation - diagnostic service provided by dentist other than requesting dentist', 'Consultation', 1, 5000),
('D9311', @cdt_type, 'Consultation with a medical health care professional', 'Medical Consultation', 1, 5000),
('D9430', @cdt_type, 'Office visit for observation (during regularly scheduled hours)', 'Office Visit Observation', 1, 2000),
('D9440', @cdt_type, 'Office visit - after regularly scheduled hours', 'After Hours Visit', 1, 5000),
('D9450', @cdt_type, 'Case presentation, detailed and extensive treatment planning', 'Treatment Planning', 1, 3000),
('D9610', @cdt_type, 'Therapeutic parenteral drug, single administration', 'Therapeutic Drug Admin', 1, 3000),
('D9612', @cdt_type, 'Therapeutic parenteral drugs, two or more administrations, different medications', 'Multi Drug Admin', 1, 5000),
('D9630', @cdt_type, 'Drugs or medicaments dispensed in the office for home use', 'Dispensed Medications', 1, 2000),
('D9910', @cdt_type, 'Application of desensitizing medicament', 'Desensitizing Agent', 1, 2000),
('D9911', @cdt_type, 'Application of desensitizing resin for cervical and/or root surface', 'Desensitizing Resin', 1, 2500),
('D9920', @cdt_type, 'Behavior management, by report', 'Behavior Management', 1, 3000),
('D9930', @cdt_type, 'Treatment of complications (post-surgical) - unusual circumstances, by report', 'Post-Surgical Complications', 1, 5000),
('D9940', @cdt_type, 'Occlusal guard, by report', 'Night Guard / Shine Bruksizmi', 1, 6000),
('D9942', @cdt_type, 'Repair and/or reline of occlusal guard', 'Repair Night Guard', 1, 3000),
('D9943', @cdt_type, 'Occlusal guard adjustment', 'Night Guard Adjustment', 1, 1500),
('D9944', @cdt_type, 'Occlusal guard - hard appliance, full arch', 'Hard Night Guard Full', 1, 6000),
('D9945', @cdt_type, 'Occlusal guard - soft appliance, full arch', 'Soft Night Guard Full', 1, 6000),
('D9946', @cdt_type, 'Occlusal guard - hard appliance, partial arch', 'Hard Night Guard Partial', 1, 5000),
('D9950', @cdt_type, 'Occlusion analysis - mounted case', 'Occlusion Analysis', 1, 5000),
('D9951', @cdt_type, 'Occlusal adjustment - limited', 'Occlusal Adjustment Limited', 1, 3000),
('D9952', @cdt_type, 'Occlusal adjustment - complete', 'Occlusal Adjustment Complete', 1, 5000),
('D9970', @cdt_type, 'Enamel microabrasion', 'Enamel Microabrasion', 1, 5000),
('D9971', @cdt_type, 'Odontoplasty 1-2 teeth; includes removal of enamel projections', 'Odontoplasty', 1, 3000),
('D9972', @cdt_type, 'External bleaching - per arch', 'Teeth Whitening Per Arch', 1, 10000),
('D9973', @cdt_type, 'External bleaching - per tooth', 'Teeth Whitening Per Tooth', 1, 3500),
('D9974', @cdt_type, 'Internal bleaching - per tooth', 'Internal Bleaching', 1, 3500),
('D9975', @cdt_type, 'External bleaching for home application, per arch', 'Home Whitening Kit', 1, 8000),
('D9986', @cdt_type, 'Missed appointment', 'Missed Appointment', 1, 2000),
('D9987', @cdt_type, 'Cancelled appointment', 'Cancelled Appointment', 1, 0),
('D9999', @cdt_type, 'Unspecified adjunctive procedure, by report', 'Unspecified Procedure', 1, 0);

-- ═══════════════════════════════════════════════════════════
-- CUSTOM CODES (Clinic-specific procedures not in standard CDT)
-- ═══════════════════════════════════════════════════════════

INSERT IGNORE INTO codes (code, code_type, code_text, code_text_short, active, fee) VALUES
('D7999A', @cdt_type, 'Ngritje sinusi', 'Ngritje Sinusi', 1, 65000),
('D7999B', @cdt_type, 'Graft kockor / Osteo plastik', 'Graft Kockor', 1, 30000),
('D7999C', @cdt_type, 'Heqje kisti', 'Heqje Kisti', 1, 35000),
('D9999A', @cdt_type, 'Rigjenerim me plazëm (PRP)', 'Plazëm PRP', 1, 25000),
('D9999B', @cdt_type, 'Rigjenerim me fibrinë', 'Fibrinë', 1, 25000),
('D6999A', @cdt_type, 'Kurorë provizore karikim imediat', 'Provizor Imediat', 1, 3000),
('D4999A', @cdt_type, 'Graft gingive', 'Graft Gingive', 1, 50000),
('D8999A', @cdt_type, 'Korrigjim i buzëqeshjes gingivale', 'Gummy Smile', 1, 45000),
('D1999A', @cdt_type, 'Pastrim me air flow', 'Air Flow', 1, 3500),
('D1999B', @cdt_type, 'Vendosje pircing', 'Pircing', 1, 3000),
('D2999A', @cdt_type, 'Rikonstruksion me vidë metalike', 'Vidë Metalike', 1, 1000),
('D2999B', @cdt_type, 'Rikonstruksion me vidë qelqi', 'Vidë Qelqi', 1, 1500),
('D2999C', @cdt_type, 'Kurorë full zirkon', 'Kurorë Full Zirkon', 1, 28000),
('D2999D', @cdt_type, 'Kurorë E-max', 'Kurorë E-max', 1, 30000),
('D5999A', @cdt_type, 'Protezë totale elastike', 'Protezë Elastike', 1, 50000),
('D2999E', @cdt_type, 'Mbushje dhëmb qumështi Gr.1', 'Fëmijë Gr.1', 1, 2500),
('D2999F', @cdt_type, 'Mbushje dhëmb qumështi Gr.2', 'Fëmijë Gr.2', 1, 3000),
('D2999G', @cdt_type, 'Mbushje dhëmb qumështi Gr.3', 'Fëmijë Gr.3', 1, 3500);

-- ═══════════════════════════════════════════════════════════
-- 3. DENTAL APPOINTMENT CATEGORIES
-- ═══════════════════════════════════════════════════════════

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Dental Cleaning' as pc_catname, '#4CAF50' as pc_catcolor, 'Routine dental cleaning and prophylaxis' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 100 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Dental Cleaning');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Dental Exam' as pc_catname, '#2196F3' as pc_catcolor, 'Comprehensive or periodic dental examination' as pc_catdesc, 1800 as pc_duration, 0 as pc_cattype, 1 as pc_active, 101 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Dental Exam');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Filling' as pc_catname, '#FF9800' as pc_catcolor, 'Dental restoration - amalgam or composite filling' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 102 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Filling');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Root Canal' as pc_catname, '#f44336' as pc_catcolor, 'Endodontic therapy' as pc_catdesc, 5400 as pc_duration, 0 as pc_cattype, 1 as pc_active, 103 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Root Canal');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Extraction' as pc_catname, '#9C27B0' as pc_catcolor, 'Tooth extraction - simple or surgical' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 104 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Extraction');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Crown' as pc_catname, '#795548' as pc_catcolor, 'Crown preparation and placement' as pc_catdesc, 3600 as pc_duration, 0 as pc_cattype, 1 as pc_active, 105 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Crown');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Implant' as pc_catname, '#607D8B' as pc_catcolor, 'Dental implant placement or follow-up' as pc_catdesc, 5400 as pc_duration, 0 as pc_cattype, 1 as pc_active, 106 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Implant');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Orthodontic Consult' as pc_catname, '#00BCD4' as pc_catcolor, 'Orthodontic consultation and treatment planning' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 107 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Orthodontic Consult');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Orthodontic Visit' as pc_catname, '#00ACC1' as pc_catcolor, 'Periodic orthodontic adjustment visit' as pc_catdesc, 1800 as pc_duration, 0 as pc_cattype, 1 as pc_active, 108 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Orthodontic Visit');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Teeth Whitening' as pc_catname, '#FFEB3B' as pc_catcolor, 'Professional teeth whitening/bleaching' as pc_catdesc, 3600 as pc_duration, 0 as pc_cattype, 1 as pc_active, 109 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Teeth Whitening');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Dental X-Ray' as pc_catname, '#78909C' as pc_catcolor, 'Dental radiograph - periapical, bitewing, or panoramic' as pc_catdesc, 900 as pc_duration, 0 as pc_cattype, 1 as pc_active, 110 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Dental X-Ray');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Emergency Dental' as pc_catname, '#D32F2F' as pc_catcolor, 'Urgent dental emergency - pain, trauma, or infection' as pc_catdesc, 1800 as pc_duration, 0 as pc_cattype, 1 as pc_active, 111 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Emergency Dental');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Veneer' as pc_catname, '#E91E63' as pc_catcolor, 'Porcelain or composite veneer placement' as pc_catdesc, 3600 as pc_duration, 0 as pc_cattype, 1 as pc_active, 112 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Veneer');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Denture' as pc_catname, '#8D6E63' as pc_catcolor, 'Denture fitting, adjustment, or delivery' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 113 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Denture');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Periodontal Treatment' as pc_catname, '#009688' as pc_catcolor, 'Scaling and root planing or periodontal surgery' as pc_catdesc, 3600 as pc_duration, 0 as pc_cattype, 1 as pc_active, 114 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Periodontal Treatment');

INSERT INTO openemr_postcalendar_categories
  (pc_catname, pc_catcolor, pc_catdesc, pc_duration, pc_cattype, pc_active, pc_seq, aco_spec)
SELECT * FROM (SELECT
  'Pediatric Dental' as pc_catname, '#66BB6A' as pc_catcolor, 'Child dental visit - exam, cleaning, fluoride, sealants' as pc_catdesc, 2700 as pc_duration, 0 as pc_cattype, 1 as pc_active, 115 as pc_seq, 'encounters|notes' as aco_spec
) t WHERE NOT EXISTS (SELECT 1 FROM openemr_postcalendar_categories WHERE pc_catname = 'Pediatric Dental');

-- ═══════════════════════════════════════════════════════════
-- 4. CURRENCY, LANGUAGE, AND SETTINGS
-- ═══════════════════════════════════════════════════════════

-- Albanian Lek currency
UPDATE globals SET gl_value = 'ALL' WHERE gl_name = 'gbl_currency_symbol';

-- PDF language to Albanian
UPDATE globals SET gl_value = 'sq' WHERE gl_name = 'pdf_language';

-- Reduce max failed logins from 20 to 5
UPDATE globals SET gl_value = '5' WHERE gl_name = 'password_max_failed_logins';

-- Fix portal URL placeholder
UPDATE globals SET gl_value = '' WHERE gl_name = 'portal_onsite_two_address' AND gl_value LIKE '%your_web_site%';

-- Enable patient portal password reset
UPDATE globals SET gl_value = '1' WHERE gl_name = 'portal_two_pass_reset';

-- Set practice return email (placeholder - user should update)
UPDATE globals SET gl_value = 'info@zeodental.com' WHERE gl_name = 'practice_return_email_path' AND (gl_value = '' OR gl_value IS NULL);

-- Set patient reminder sender email
UPDATE globals SET gl_value = 'reminders@zeodental.com' WHERE gl_name = 'patient_reminder_sender_email' AND (gl_value = '' OR gl_value IS NULL);

-- ═══════════════════════════════════════════════════════════
-- 5. MAKE INSURANCE OPTIONAL (not relevant for Albanian dental clinics)
-- ═══════════════════════════════════════════════════════════

-- Hide employer section (not relevant for dental)
UPDATE globals SET gl_value = '1' WHERE gl_name = 'omit_employers';

-- Make all insurance layout fields optional (uor: 2=required → 1=optional)
-- This covers primary, secondary, and tertiary insurance sections
UPDATE layout_options SET uor = 1 WHERE form_id = 'DEM' AND uor = 2
  AND (group_id LIKE '%Insurance%' OR group_id LIKE '%3%' OR group_id LIKE '%4%' OR group_id LIKE '%5%')
  AND field_id LIKE '%ins%';

-- Also make specific insurance fields optional by field name
UPDATE layout_options SET uor = 1 WHERE form_id = 'DEM' AND uor = 2
  AND field_id IN (
    'insurance_company', 'insurance_id', 'ins_policy_number',
    'policy_number', 'group_number', 'subscriber_lname',
    'subscriber_fname', 'subscriber_mname', 'subscriber_DOB',
    'subscriber_ss', 'subscriber_relationship', 'subscriber_employer',
    'subscriber_employer_city', 'subscriber_employer_state',
    'subscriber_employer_zip', 'subscriber_employer_country',
    'subscriber_phone', 'subscriber_street', 'subscriber_city',
    'subscriber_state', 'subscriber_postal_code', 'subscriber_country',
    'copay', 'accept_assignment'
  );

-- Disable "force billing" for encounters (don't require insurance before creating encounters)
UPDATE globals SET gl_value = '0' WHERE gl_name = 'force_billing_widget_open';
