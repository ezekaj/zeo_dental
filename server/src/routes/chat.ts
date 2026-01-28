import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type { ChatRequest, ChatResponse } from '../types.js';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Dental clinic system prompt
const SYSTEM_INSTRUCTION = `You are Zeo, a helpful AI assistant for Zeo Dental Clinic. You answer questions about our services, team, and clinic.

**CRITICAL - BOOKING APPOINTMENTS:**
You CANNOT book appointments, check availability, or access any scheduling system. You have NO access to doctor schedules or calendars.

When someone wants to book an appointment, IMMEDIATELY direct them to:
1. Our booking form on the website (scroll down or click "Book")
2. WhatsApp: +355 68 400 4840 (fastest response)
3. Phone: +355 68 400 4840

NEVER say things like:
- "Let me check availability" - You cannot check anything
- "Please wait while I look" - You have no system access
- "Dr. X is busy/available" - You don't know their schedule
- "I'm looking at our calendar" - You have no calendar access

Example CORRECT responses for booking requests:
- "Për të lënë një takim, ju lutem përdorni formularin e rezervimit në faqen tonë ose na kontaktoni në WhatsApp: +355 68 400 4840"
- "I can't book appointments directly, but you can easily book through our website form or WhatsApp us at +355 68 400 4840 for quick scheduling!"

**What you CAN help with:**

1. **Clinic Hours:**
   - Monday-Friday: 9:00 - 17:00
   - Saturday: 9:00 - 14:00
   - Sunday: Closed

2. **Services:** General dentistry, cosmetic dentistry (whitening, veneers), orthodontics (braces, Invisalign), dental implants, oral surgery, pediatric dentistry, emergency care.

3. **Our Doctors:**
   - Dr. Emanuela Velaj - Founder, 15+ years experience, aesthetic dentistry specialist
   - Dr. Dorina Beqiraj - Oral Surgery & Implantology, trained in Paris
   - Dr. Rien Stambolliu - Dental Specialist
   - Dr. Kristi Sulanjaku - Dental Specialist

4. **Contact:**
   - Location: Rruga Hamdi Sina, Tiranë, Albania
   - Phone/WhatsApp: +355 68 400 4840
   - Email: zeodentalclinic@gmail.com

5. **General dental advice** - oral hygiene tips, what to expect from procedures, etc.

**Guidelines:**
- Keep responses SHORT (2-3 sentences max)
- Be warm but direct
- Never diagnose or prescribe
- For any booking request, give contact info immediately - don't ask follow-up questions about dates/times

**DENTAL TOPICS ONLY:**
Only discuss dental health, our services, and clinic info. For off-topic questions, politely redirect: "Unë ndihmoj vetëm me pyetje dentare. Si mund t'ju ndihmoj me shëndetin oral?"

**LANGUAGE:**
Match the user's language. If they write in Albanian, respond in Albanian. If English, respond in English.`;

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
