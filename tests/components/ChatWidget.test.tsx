import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

// Mock the language context
vi.mock('../../contexts/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: ReactNode }) => children,
  useLanguage: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'en',
  }),
}));

// Mock the gemini service
vi.mock('../../services/geminiService', () => ({
  sendMessageToGemini: vi.fn().mockResolvedValue('Hello! How can I help you today?'),
}));

import { ChatWidget } from '../../components/ChatWidget';

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<ChatWidget />)).not.toThrow();
  });

  it('renders toggle button initially', () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens chat window when toggle button is clicked', async () => {
    render(<ChatWidget />);

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);

    // Chat window should be visible
    const container = document.querySelector('[class*="flex flex-col"]');
    expect(container).toBeInTheDocument();
  });
});
