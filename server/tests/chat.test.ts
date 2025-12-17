import Fastify from 'fastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { chatRoutes } from '../src/routes/chat.js';

describe('chatRoutes', () => {
  const makeFastify = () => {
    const app = Fastify();
    return { app } as const;
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns 400 when message is missing', async () => {
    const { app } = makeFastify();
    await app.register(chatRoutes, { prefix: '/api' });
    await app.ready();

    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: {},
    });

    expect(res.statusCode).toBe(400);
  });

  it('returns 500 when API key is missing', async () => {
    process.env.GEMINI_API_KEY = '';
    const { app } = makeFastify();
    await app.register(chatRoutes, { prefix: '/api' });
    await app.ready();

    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: { message: 'Hello', history: [], language: 'en' },
    });

    expect(res.statusCode).toBe(500);
  });

  it('returns chat response when Gemini call succeeds', async () => {
    const { app } = makeFastify();

    // Mock global fetch
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [
          {
            content: {
              parts: [{ text: 'Hello from Gemini' }],
            },
          },
        ],
      }),
    });
    vi.stubGlobal('fetch', mockFetch as unknown as typeof fetch);

    await app.register(chatRoutes, { prefix: '/api' });
    await app.ready();

    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: { message: 'Hi', history: [], language: 'en' },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.response).toContain('Hello from Gemini');
    expect(mockFetch).toHaveBeenCalledOnce();
  });
});
