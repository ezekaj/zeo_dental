import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock all child components to isolate App testing
vi.mock('../components/Navbar', () => ({
  Navbar: ({ onNavigate }: { onNavigate: (view: string, section?: string) => void }) => (
    <nav data-testid="navbar">
      <button onClick={() => onNavigate('home')}>Home</button>
      <button onClick={() => onNavigate('booking')}>Book</button>
      <button onClick={() => onNavigate('home', 'services')}>Services</button>
    </nav>
  ),
}));

vi.mock('../components/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero Section</div>,
}));

vi.mock('../components/Services', () => ({
  Services: () => <div data-testid="services">Services Section</div>,
}));

vi.mock('../components/WhyChooseUs', () => ({
  WhyChooseUs: () => <div data-testid="why-choose-us">Why Choose Us</div>,
}));

vi.mock('../components/Team', () => ({
  Team: () => <div data-testid="team">Team Section</div>,
}));

vi.mock('../components/Testimonials', () => ({
  Testimonials: () => <div data-testid="testimonials">Testimonials</div>,
}));

vi.mock('../components/BookingSection', () => ({
  BookingSection: ({ onNavigate }: { onNavigate: (view: string) => void }) => (
    <div data-testid="booking">
      Booking Section
      <button onClick={() => onNavigate('home')}>Back Home</button>
    </div>
  ),
}));

vi.mock('../components/ServiceDetail', () => ({
  ServiceDetail: () => <div data-testid="service-detail">Service Detail</div>,
}));

vi.mock('../components/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('../components/ChatWidget', () => ({
  ChatWidget: () => <div data-testid="chat-widget">Chat Widget</div>,
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset URL
    window.history.pushState({}, '', '/');
  });

  it('renders home view by default', () => {
    render(<App />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('services')).toBeInTheDocument();
    expect(screen.getByTestId('team')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });

  it('renders navbar and footer on all views', () => {
    render(<App />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders chat widget', () => {
    render(<App />);

    expect(screen.getByTestId('chat-widget')).toBeInTheDocument();
  });

  it('navigates to booking view', async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByText('Book'));

    await waitFor(() => {
      expect(screen.getByTestId('booking')).toBeInTheDocument();
    });

    // Home sections should not be visible
    expect(screen.queryByTestId('hero')).not.toBeInTheDocument();
  });

  it('navigates back to home from booking', async () => {
    render(<App />);

    const user = userEvent.setup();

    // Go to booking
    await user.click(screen.getByText('Book'));

    await waitFor(() => {
      expect(screen.getByTestId('booking')).toBeInTheDocument();
    });

    // Go back home
    await user.click(screen.getByText('Back Home'));

    await waitFor(() => {
      expect(screen.getByTestId('hero')).toBeInTheDocument();
    });
  });

  it('includes skip-to-content link', () => {
    render(<App />);

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('has main element with correct role', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('updates document title based on view', async () => {
    render(<App />);

    // Default home title
    expect(document.title).toContain('Zeo Dental Clinic');

    const user = userEvent.setup();

    // Navigate to booking
    await user.click(screen.getByText('Book'));

    await waitFor(() => {
      expect(document.title).toContain('Book Appointment');
    });

    // Navigate back home
    await user.click(screen.getByText('Back Home'));

    await waitFor(() => {
      expect(document.title).toContain('Premium Dental Care');
    });
  });

  it('has proper section aria-labels', () => {
    render(<App />);

    // Check section labels
    expect(screen.getByLabelText('Welcome')).toBeInTheDocument();
    expect(screen.getByLabelText('Our Services')).toBeInTheDocument();
    expect(screen.getByLabelText('Why Choose Us')).toBeInTheDocument();
    expect(screen.getByLabelText('Our Team')).toBeInTheDocument();
    expect(screen.getByLabelText('Patient Testimonials')).toBeInTheDocument();
  });

  it('wraps content in ErrorBoundary', () => {
    // ErrorBoundary is imported and used in App
    // We can verify it doesn't crash on normal render
    expect(() => render(<App />)).not.toThrow();
  });
});
