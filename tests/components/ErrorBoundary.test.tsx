import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    t: (key: string) => {
      const translations: Record<string, string> = {
        'error.title': 'Something went wrong',
        'error.message': 'An error occurred',
        'error.tryAgain': 'Try Again',
        'error.callUs': 'Call Us',
        'contact.phone': '+355 68 400 4840',
      };
      return translations[key] || key;
    },
    language: 'en',
  }),
}));

import { ErrorBoundary } from '../../components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders error UI when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error UI (translation key or translated text)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('has retry button that can be clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error state should be active
    const retryButton = screen.getByRole('button');
    expect(retryButton).toBeInTheDocument();

    // Clicking should not throw
    expect(() => fireEvent.click(retryButton)).not.toThrow();
  });
});
