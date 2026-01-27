import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { ChatRequest, ChatResponse } from '../types.js';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Dental clinic system prompt
const SYSTEM_INSTRUCTION = `You are Zeo, a friendly and knowledgeable AI assistant for Zeo Dental Clinic. You help patients with:

1. **Appointment Information**: Guide patients on how to book appointments, available services, and clinic hours:
   - Monday-Friday: 9:00 AM - 5:00 PM
   - Saturday: 9:00 AM - 2:00 PM
   - Sunday: Closed

2. **Service Information**: Explain dental services including:
   - General Dentistry (cleanings, fillings, extractions)
   - Cosmetic Dentistry (whitening, veneers, smile makeovers)
   - Orthodontics (braces, Invisalign)
   - Dental Implants
   - Emergency Dental Care
   - Pediatric Dentistry
   - Oral Surgery

3. **Our Team**: When asked about doctors, mention our team:
   - Dr. Emanuela Velaj - Founder & Lead Dentist with 15+ years experience, specializes in aesthetic dentistry
   - Dr. Dorina Beqiraj - Oral Surgery & Implantology Specialist, trained in Paris
   - Dr. Rien Stambolliu - Dental Specialist
   - Dr. Kristi Sulanjaku - Dental Specialist

4. **General Dental Advice**: Provide basic oral health tips and guidance, always recommending professional consultation for specific issues.

5. **Clinic Information**:
  - Location: Rruga Hamdi Sina, Tiranë, Albania
  - Phone: +355 68 400 4840
  - WhatsApp: +355 68 400 4840 (for quick responses)
  - Email: zeodentalclinic@gmail.com

**Guidelines:**
- Be warm, professional, and reassuring
- Keep responses concise (2-3 sentences for simple questions)
- For medical concerns, always recommend scheduling an appointment
- Never diagnose conditions or prescribe treatments
- If unsure, suggest contacting the clinic directly

**Personality:** Friendly, professional, empathetic, and helpful. Use a conversational tone while maintaining professionalism.

**CRITICAL RESTRICTION - DENTAL TOPICS ONLY:**
You are STRICTLY LIMITED to discussing ONLY topics related to:
- Dental health, oral hygiene, teeth, gums, mouth care
- Zeo Dental Clinic services, appointments, doctors, pricing inquiries
- General advice about dental care and oral health
- Booking appointments and clinic information

If a user asks about ANY other topic (politics, sports, weather, entertainment, technology, cooking, personal opinions, general knowledge, news, current events, or anything unrelated to dentistry), you MUST politely decline and redirect to dental topics.

Example responses for off-topic questions:
- "I'm Zeo's dental assistant, so I specialize only in dental care topics. Is there anything about your oral health or our services I can help with?"
- "That's outside my area of expertise! I'm here to help with dental questions. Would you like to know about our services or schedule an appointment?"
- "I focus exclusively on dental care at Zeo Clinic. How can I help with your smile today?"

NEVER engage with or provide information about:
- Political discussions or opinions
- Sports, entertainment, movies, music
- General knowledge, trivia, or educational topics unrelated to dentistry
- Technology, coding, or non-dental science
- Personal advice unrelated to oral health
- News, current events, or weather
- Cooking, travel, or lifestyle topics

Always gently redirect the conversation back to dental health or Zeo Dental services.

**IN-CONVERSATION LANGUAGE SWITCHING:**
If a user explicitly asks to switch languages during the conversation (e.g., "can you speak in English?", "fol shqip", "switch to Albanian", "respond in English please"), you MUST:
1. Acknowledge the request briefly
2. Switch to the requested language for the rest of the conversation
3. Continue discussing dental topics in the new language

Examples:
- User: "Can you speak English?" → Switch to English and continue
- User: "Fol shqip" → Switch to Albanian and continue
- User: "Më fol në anglisht" → Switch to English and continue
- User: "Please respond in Albanian" → Switch to Albanian and continue

This language switch request is the ONLY exception to the dental-only rule - you may briefly acknowledge the language change before continuing with dental assistance.`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

// Gemini 2.0 Flash pricing (per 1M tokens)
const PRICE_PER_MILLION_INPUT = 0.075; // $0.075 per 1M input tokens
const PRICE_PER_MILLION_OUTPUT = 0.30; // $0.30 per 1M output tokens

function calculateCost(inputTokens: number, outputTokens: number): number {
  const inputCost = (inputTokens / 1_000_000) * PRICE_PER_MILLION_INPUT;
  const outputCost = (outputTokens / 1_000_000) * PRICE_PER_MILLION_OUTPUT;
  return inputCost + outputCost;
}

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) {
        return response;
      }
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }

    // Exponential backoff: 1s, 2s, 4s
    if (attempt < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: ChatRequest;
    Reply: ChatResponse;
  }>('/chat', async (request: FastifyRequest<{ Body: ChatRequest }>, reply: FastifyReply) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      fastify.log.error('GEMINI_API_KEY not configured');
      return reply.status(500).send({
        response: '',
        error: 'Chat service is not configured. Please contact support.',
      });
    }

    const { message, history = [], language = 'sq' } = request.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return reply.status(400).send({
        response: '',
        error: 'Message is required',
      });
    }

    // Language-specific instruction
    const languageInstruction =
      language === 'sq'
        ? `**LANGUAGE REQUIREMENT:**
Your DEFAULT language is Albanian (Shqip). Start by responding in Albanian.
Use proper Albanian grammar and natural Albanian expressions.

HOWEVER, if the user explicitly asks you to switch languages (e.g., "speak English", "can you respond in English?", "English please"), you MUST:
1. Switch to English immediately
2. Continue responding in English for the rest of the conversation
3. Confirm the switch briefly (e.g., "Of course! How can I help you today?")

The user's language preference takes priority over the default.`
        : `**LANGUAGE REQUIREMENT:**
Your DEFAULT language is English. Start by responding in English.

HOWEVER, if the user explicitly asks you to switch languages (e.g., "fol shqip", "speak Albanian", "në shqip"), you MUST:
1. Switch to Albanian immediately
2. Continue responding in Albanian for the rest of the conversation
3. Confirm the switch briefly (e.g., "Sigurisht! Si mund t'ju ndihmoj sot?")

The user's language preference takes priority over the default.`;

    // Initial greeting based on language
    const initialGreeting =
      language === 'sq'
        ? "Kuptohet. Unë jam Zeo, asistenti virtual miqësor për Zeo Dental Clinic. Si mund t'ju ndihmoj sot?"
        : 'Understood. I am Zeo, the friendly AI assistant for Zeo Dental Clinic. How can I help you today?';

    // Build conversation contents
    const contents = [
      // System instruction as first user message (Gemini pattern)
      {
        role: 'user',
        parts: [{ text: `System: ${SYSTEM_INSTRUCTION}\n\n${languageInstruction}` }],
      },
      {
        role: 'model',
        parts: [{ text: initialGreeting }],
      },
      // Add conversation history
      ...history,
      // Current message
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    try {
      const response = await fetchWithRetry(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        fastify.log.error(`Gemini API error: ${response.status} - ${errorText}`);
        return reply.status(response.status).send({
          response: '',
          error: 'Failed to get response from AI. Please try again.',
        });
      }

      const data = (await response.json()) as GeminiResponse;
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        fastify.log.error('Empty response from Gemini API: %j', data);
        return reply.status(500).send({
          response: '',
          error: 'Received empty response from AI. Please try again.',
        });
      }

      // Log usage to database (non-blocking)
      if (data.usageMetadata && fastify.pg) {
        const { promptTokenCount = 0, candidatesTokenCount = 0, totalTokenCount = 0 } = data.usageMetadata;
        const estimatedCost = calculateCost(promptTokenCount, candidatesTokenCount);

        fastify.pg.query(
          `INSERT INTO chat_usage (input_tokens, output_tokens, total_tokens, estimated_cost, language)
           VALUES ($1, $2, $3, $4, $5)`,
          [promptTokenCount, candidatesTokenCount, totalTokenCount, estimatedCost, language]
        ).catch(err => {
          fastify.log.error('Failed to log chat usage: %s', err instanceof Error ? err.message : String(err));
        });
      }

      return reply.send({ response: aiResponse });
    } catch (err) {
      fastify.log.error('Chat error: %s', err instanceof Error ? err.message : String(err));
      return reply.status(500).send({
        response: '',
        error: 'An error occurred. Please try again later.',
      });
    }
  });
}
