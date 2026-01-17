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
    it('returns a response when API call succeeds', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ text: 'Hello from API!' }),
      });
      global.fetch = mockFetch;

      const { sendMessageToGemini, clearChatHistory } = await import(
        '../../services/geminiService'
      );
      clearChatHistory();

      const response = await sendMessageToGemini('Hello');

      expect(response).toBe('Hello from API!');
    });

    it('handles API errors gracefully', async () => {
      // Mock fetch to fail
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

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

  describe('API integration', () => {
    it('sends POST request with message', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ text: 'Response' }),
      });
      global.fetch = mockFetch;

      const { sendMessageToGemini, clearChatHistory } = await import(
        '../../services/geminiService'
      );
      clearChatHistory();

      await sendMessageToGemini('Test message');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });
});
