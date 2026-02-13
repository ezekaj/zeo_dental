/**
 * crmZ.E Albanian Translation Generator
 *
 * Uses Google Gemini API to batch-translate missing OpenEMR UI strings
 * from English to Albanian.
 *
 * Usage: GEMINI_API_KEY=your_key node translate.mjs
 *
 * Reads: missing_constants.txt (one constant per line)
 * Writes: albanian_translations.csv (constant_name,definition)
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY environment variable is required');
    console.error('Usage: GEMINI_API_KEY=your_key node translate.mjs');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const BATCH_SIZE = 80;
const INPUT_FILE = join(__dirname, 'missing_constants.txt');
const OUTPUT_FILE = join(__dirname, 'albanian_translations.csv');
const PROGRESS_FILE = join(__dirname, '.translate_progress');

// Read missing constants
const constants = readFileSync(INPUT_FILE, 'utf-8')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

console.log(`Total constants to translate: ${constants.length}`);

// Resume from progress if exists
let startBatch = 0;
let csvLines = ['constant_name,definition'];

if (existsSync(PROGRESS_FILE)) {
    const progress = JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8'));
    startBatch = progress.batch;
    if (existsSync(OUTPUT_FILE)) {
        csvLines = readFileSync(OUTPUT_FILE, 'utf-8').split('\n').filter(s => s.length > 0);
    }
    console.log(`Resuming from batch ${startBatch} (${startBatch * BATCH_SIZE} strings done)`);
}

function escapeCSV(str) {
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

async function translateBatch(strings) {
    const prompt = `Translate the following English UI strings from a dental clinic management software into Albanian. These are button labels, menu items, form fields, error messages, and clinical/medical terms.

Rules:
- Return ONLY a JSON array of objects: [{"en": "original", "sq": "translation"}, ...]
- Keep medical/dental terminology accurate
- Keep abbreviations when appropriate (e.g., "CPT" stays "CPT")
- For strings with context hints like "OD{{right eye}}", translate the main text and keep the meaning
- Keep HTML tags if present
- Keep placeholder patterns like %s, %d, {0} unchanged
- For very short strings (1-2 words), keep translations concise
- Do NOT add explanations, only return the JSON array

Strings to translate:
${JSON.stringify(strings)}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            maxOutputTokens: 8192,
            temperature: 0.2,
        }
    });

    const text = response.text.trim();
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
        throw new Error('No JSON array found in response');
    }
    return JSON.parse(jsonMatch[0]);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Process in batches
const totalBatches = Math.ceil(constants.length / BATCH_SIZE);

for (let i = startBatch; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, constants.length);
    const batch = constants.slice(start, end);

    console.log(`Batch ${i + 1}/${totalBatches} (strings ${start + 1}-${end})...`);

    let retries = 3;
    while (retries > 0) {
        try {
            const translations = await translateBatch(batch);

            for (const item of translations) {
                if (item.en && item.sq) {
                    csvLines.push(`${escapeCSV(item.en)},${escapeCSV(item.sq)}`);
                }
            }

            // Save progress
            writeFileSync(PROGRESS_FILE, JSON.stringify({ batch: i + 1 }));
            writeFileSync(OUTPUT_FILE, csvLines.join('\n') + '\n');
            break;
        } catch (err) {
            retries--;
            console.error(`  Error: ${err.message}${retries > 0 ? ' - retrying...' : ' - skipping batch'}`);
            if (retries > 0) await sleep(5000);
        }
    }

    // Rate limit: ~15 requests/minute for free tier
    if (i < totalBatches - 1) {
        await sleep(4500);
    }
}

// Clean up progress file
if (existsSync(PROGRESS_FILE)) {
    const { unlinkSync } = await import('fs');
    unlinkSync(PROGRESS_FILE);
}

const translatedCount = csvLines.length - 1; // minus header
console.log(`\nDone! Translated ${translatedCount}/${constants.length} strings`);
console.log(`Output: ${OUTPUT_FILE}`);
