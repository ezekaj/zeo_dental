import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatWidget } from '../../components/ChatWidget';

// Mock the gemini service
vi.mock('../../services/geminiService', () => ({
  sendMessageToGemini: vi.fn().mockResolvedValue('Hello! How can I help you today?'),
}));

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders toggle button initially', () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens chat window when toggle button is clicked', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    expect(screen.getByText('Zeo Assistant')).toBeInTheDocument();
    expect(screen.getByText('Always online')).toBeInTheDocument();
  });

  it('displays welcome message when chat opens', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    expect(screen.getByText(/Hello! I'm Zeo/i)).toBeInTheDocument();
  });

  it('closes chat when close button is clicked', async () => {
    render(<ChatWidget />);

    // Open chat
    const openButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(openButton);

    expect(screen.getByText('Zeo Assistant')).toBeInTheDocument();

    // Close chat
    const closeButton = screen.getByRole('button', { name: /close chat/i });
    await userEvent.click(closeButton);

    expect(screen.queryByText('Zeo Assistant')).not.toBeInTheDocument();
  });

  it('has accessible input field', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    const input = screen.getByLabelText(/type your message/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Ask about our services...');
  });

  it('disables send button when input is empty', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it('enables send button when input has text', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    const input = screen.getByLabelText(/type your message/i);
    await userEvent.type(input, 'Hello');

    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).not.toBeDisabled();
  });

  it('shows emergency disclaimer', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    await userEvent.click(toggleButton);

    expect(screen.getByText(/For medical emergencies, call 911/i)).toBeInTheDocument();
  });

  it('has aria-expanded attribute on toggle button', async () => {
    render(<ChatWidget />);

    const toggleButton = screen.getByRole('button', { name: /open chat assistant/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggleButton);

    // After opening, the button should show close state
    const closeToggleButton = screen.getByRole('button', { name: /close chat assistant/i });
    expect(closeToggleButton).toHaveAttribute('aria-expanded', 'true');
  });
});
