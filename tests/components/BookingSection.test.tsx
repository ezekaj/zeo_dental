import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

// Mock the language context before importing the component
vi.mock('../../contexts/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: ReactNode }) => children,
  useLanguage: () => ({
    language: 'en',
    setLanguage: vi.fn(),
  }),
}));

vi.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Return readable labels for testing
      const translations: Record<string, string> = {
        'booking.form.name.label': 'Full Name',
        'booking.form.email.label': 'Email Address',
        'booking.form.phone.label': 'Phone Number',
        'booking.form.service.label': 'Service Interest',
        'booking.form.date.label': 'Preferred Date',
        'booking.form.time.label': 'Preferred Time',
        'booking.form.submit': 'Confirm Booking Request',
        'booking.back': 'Back',
        'booking.contact.phone': '+355 68 400 4840',
        'booking.disclaimer': 'This is a request for an appointment',
      };
      return translations[key] || key;
    },
    language: 'en',
  }),
}));

// Import component after mocks
import { BookingSection } from '../../components/BookingSection';

describe('BookingSection', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<BookingSection onNavigate={mockNavigate} />)).not.toThrow();
  });

  it('renders the form container', () => {
    const { container } = render(<BookingSection onNavigate={mockNavigate} />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders input fields', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    // Check that form inputs exist
    expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
  });

  it('renders a submit button', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has accessible form elements', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    // Form should have accessible inputs
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toBeInTheDocument();
    });
  });
});
