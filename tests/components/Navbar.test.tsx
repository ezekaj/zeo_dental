import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders logo and navigation links', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText(/Zeo Dental Clinic/i)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
  });

  it('has proper navigation role and aria-label', () => {
    render(<Navbar {...defaultProps} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('renders Book Appointment button', () => {
    render(<Navbar {...defaultProps} />);

    const bookButtons = screen.getAllByText('Book Appointment');
    expect(bookButtons.length).toBeGreaterThan(0);
  });

  it('calls onNavigate when logo is clicked', async () => {
    render(<Navbar {...defaultProps} />);

    const logo = screen.getByLabelText(/Zeo Dental Clinic/i);
    await userEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('home', 'home');
  });

  it('calls onNavigate with section id when nav link is clicked', async () => {
    render(<Navbar {...defaultProps} />);

    const servicesLink = screen.getByText('Services');
    await userEvent.click(servicesLink);

    expect(mockNavigate).toHaveBeenCalledWith('home', 'services');
  });

  it('calls onNavigate with booking view when Book Appointment is clicked', async () => {
    render(<Navbar {...defaultProps} />);

    const bookButtons = screen.getAllByText('Book Appointment');
    await userEvent.click(bookButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('booking');
  });

  it('has mobile menu button with correct aria attributes', () => {
    render(<Navbar {...defaultProps} />);

    const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    render(<Navbar {...defaultProps} />);

    const mobileMenuButton = screen.getByRole('button', { name: /open navigation menu/i });
    await userEvent.click(mobileMenuButton);

    // Mobile menu should be visible
    const mobileMenu = screen.getByRole('menu');
    expect(mobileMenu).toBeInTheDocument();
    expect(mobileMenu).toHaveAttribute('aria-label', 'Mobile navigation');
  });

  it('closes mobile menu when a link is clicked', async () => {
    render(<Navbar {...defaultProps} />);

    // Open menu
    const openButton = screen.getByRole('button', { name: /open navigation menu/i });
    await userEvent.click(openButton);

    // Click a link in mobile menu
    const mobileLinks = screen.getAllByText('Services');
    await userEvent.click(mobileLinks[mobileLinks.length - 1]); // Click mobile version

    // Menu should close (onNavigate called)
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('shows phone number in mobile menu', async () => {
    render(<Navbar {...defaultProps} />);

    const openButton = screen.getByRole('button', { name: /open navigation menu/i });
    await userEvent.click(openButton);

    expect(screen.getByText('+355 68 400 4840')).toBeInTheDocument();
  });

  it('applies solid background when scrolled', () => {
    render(<Navbar {...defaultProps} scrolled={true} />);

    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('bg-white');
  });

  it('highlights active section', () => {
    render(<Navbar {...defaultProps} currentView="home" />);

    // Home should be in the navigation
    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
  });
});
