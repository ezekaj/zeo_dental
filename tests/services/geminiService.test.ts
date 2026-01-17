import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Reset modules before each test
beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('geminiService', () => {
  describe('sendMessageToGemini', () => {
    it('returns offline message when API key is not configured', async () => {
      // Mock environment without API key
      vi.stubGlobal('import.meta', {
        env: {
          VITE_SUPABASE_URL: '',
          VITE_SUPABASE_ANON_KEY: '',
          VITE_GEMINI_API_KEY: '',
        },
      });

      const { sendMessageToGemini } = await import('../../services/geminiService');
      const response = await sendMessageToGemini('Hello');

      expect(response).toContain('offline');
    });

    it('handles API errors gracefully', async () => {
      // Mock fetch to fail
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      vi.stubGlobal('import.meta', {
        env: {
          VITE_SUPABASE_URL: 'https://test.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'test-key',
        },
      });

      const { sendMessageToGemini } = await import('../../services/geminiService');
      const response = await sendMessageToGemini('Hello');

      expect(response).toContain('trouble connecting');
    });
  });

  describe('clearChatHistory', () => {
    it('clears the conversation history', async () => {
      const { clearChatHistory, getChatHistory } = await import('../../services/geminiService');

      // Clear any existing history
      clearChatHistory();

      const history = getChatHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('getChatHistory', () => {
    it('returns a copy of the history array', async () => {
      const { getChatHistory, clearChatHistory } = await import('../../services/geminiService');

      clearChatHistory();
      const history1 = getChatHistory();
      const history2 = getChatHistory();

      // Should be different array references
      expect(history1).not.toBe(history2);
      expect(history1).toEqual(history2);
    });
  });

  describe('Supabase Edge Function integration', () => {
    it('calls Supabase Edge Function when URL is configured', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ text: 'Hello from Supabase!' }),
      });
      global.fetch = mockFetch;

      vi.stubGlobal('import.meta', {
        env: {
          VITE_SUPABASE_URL: 'https://test.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'test-anon-key',
        },
      });

      const { sendMessageToGemini, clearChatHistory } =
        await import('../../services/geminiService');
      clearChatHistory();

      const response = await sendMessageToGemini('Hello');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://test.supabase.co/functions/v1/chat',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-anon-key',
          }),
        })
      );

      expect(response).toBe('Hello from Supabase!');
    });

    it('includes conversation history in requests', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ text: 'Response' }),
      });
      global.fetch = mockFetch;

      vi.stubGlobal('import.meta', {
        env: {
          VITE_SUPABASE_URL: 'https://test.supabase.co',
          VITE_SUPABASE_ANON_KEY: 'test-key',
        },
      });

      const { sendMessageToGemini, clearChatHistory } =
        await import('../../services/geminiService');
      clearChatHistory();

      // First message
      await sendMessageToGemini('First message');

      // Second message should include history
      await sendMessageToGemini('Second message');

      const lastCall = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
      const body = JSON.parse(lastCall[1].body);

      expect(body.history.length).toBeGreaterThan(0);
    });
  });
});
