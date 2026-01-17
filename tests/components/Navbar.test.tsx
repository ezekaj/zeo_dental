import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

import { Navbar } from '../../components/Navbar';

describe('Navbar', () => {
  const mockNavigate = vi.fn();

  const defaultProps = {
    scrolled: false,
    currentView: 'home' as const,
    onNavigate: mockNavigate,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(() => render(<Navbar {...defaultProps} />)).not.toThrow();
  });

  it('renders navigation element', () => {
    render(<Navbar {...defaultProps} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar {...defaultProps} />);

    // Check that navigation contains links
    const links = screen.getAllByRole('button');
    expect(links.length).toBeGreaterThan(0);
  });

  it('applies different styling when scrolled', () => {
    const { rerender } = render(<Navbar {...defaultProps} scrolled={false} />);
    const navBefore = screen.getByRole('navigation');

    rerender(<Navbar {...defaultProps} scrolled={true} />);
    const navAfter = screen.getByRole('navigation');

    // Classes should be different when scrolled
    expect(navBefore.className).not.toBe(navAfter.className);
  });
});
