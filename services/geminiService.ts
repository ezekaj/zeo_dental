interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface ApiChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// API endpoint - in production uses same origin, in dev proxy handles it
const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';

// Conversation history for context
let conversationHistory: ChatMessage[] = [];

// Maximum history length to prevent token overflow
const MAX_HISTORY_LENGTH = 10;

/**
 * Send a message to the chat API
 */
export const sendMessageToGemini = async (
  message: string,
  language: 'sq' | 'en' = 'sq'
): Promise<string> => {
  try {
    // Convert history to API format
    const historyForApi: ApiChatMessage[] = conversationHistory.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: historyForApi,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    const responseText =
      data.response ||
      "I apologize, I couldn't process that request. Please try again.";

    // Update conversation history
    conversationHistory.push(
      { role: 'user', text: message },
      { role: 'model', text: responseText }
    );

    // Trim history if too long
    if (conversationHistory.length > MAX_HISTORY_LENGTH * 2) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY_LENGTH * 2);
    }

    return responseText;
  } catch (error) {
    console.error('Chat service error:', error);
    return "I'm having trouble connecting right now. Please call us directly at +355 68 400 4840.";
  }
};

/**
 * Clear conversation history (for new sessions)
 */
export const clearChatHistory = (): void => {
  conversationHistory = [];
};

/**
 * Get current conversation history
 */
export const getChatHistory = (): ChatMessage[] => {
  return [...conversationHistory];
};
