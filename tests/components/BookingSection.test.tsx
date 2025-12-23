import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingSection } from '../../components/BookingSection';

describe('BookingSection', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders booking form with all required fields', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred time/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    expect(screen.getByRole('button', { name: /confirm booking request/i })).toBeInTheDocument();
  });

  it('renders back to home button', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const backButtons = screen.getAllByText(/back/i);
    expect(backButtons.length).toBeGreaterThan(0);
  });

  it('validates required fields', async () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    // All inputs should be required
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const phoneInput = screen.getByLabelText(/phone number/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(phoneInput).toBeRequired();
  });

  it('pre-selects service when initialService is provided', () => {
    render(<BookingSection onNavigate={mockNavigate} initialService="Cosmetic Dentistry" />);

    const serviceSelect = screen.getByLabelText(/service interest/i) as HTMLSelectElement;
    expect(serviceSelect.value).toBe('Cosmetic Dentistry');
  });

  it('allows user to fill out the form', async () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '+355 68 400 4840');

    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('+355 68 400 4840');
  });

  it('shows service options including all dental services', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const serviceSelect = screen.getByLabelText(/service interest/i);

    expect(serviceSelect).toContainHTML('Cosmetic Dentistry');
    expect(serviceSelect).toContainHTML('Dental Implants');
    expect(serviceSelect).toContainHTML('Orthodontics');
    expect(serviceSelect).toContainHTML('General Care');
    expect(serviceSelect).toContainHTML('Oral Surgery');
    expect(serviceSelect).toContainHTML('Pediatric Dentistry');
  });

  it('shows time slot options', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const timeSelect = screen.getByLabelText(/preferred time/i);

    expect(timeSelect).toContainHTML('Morning');
    expect(timeSelect).toContainHTML('Afternoon');
    expect(timeSelect).toContainHTML('Evening');
  });

  it('displays clinic contact info', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    expect(screen.getByText('+355 68 400 4840')).toBeInTheDocument();
  });

  it('shows disclaimer about appointment confirmation', () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    expect(screen.getByText(/this is a request for an appointment/i)).toBeInTheDocument();
  });

  it('submits form and shows success message', async () => {
    vi.useFakeTimers();
    render(<BookingSection onNavigate={mockNavigate} />);

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    // Fill out form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '+355 68 400 4840');
    await user.selectOptions(screen.getByLabelText(/service interest/i), 'Cosmetic Dentistry');
    await user.type(screen.getByLabelText(/preferred date/i), '2024-12-25');
    await user.selectOptions(screen.getByLabelText(/preferred time/i), 'morning');

    // Submit
    await user.click(screen.getByRole('button', { name: /confirm booking request/i }));

    // Wait for simulated API call
    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText(/Request Confirmed/i)).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it('navigates home when back button is clicked', async () => {
    render(<BookingSection onNavigate={mockNavigate} />);

    const user = userEvent.setup();
    const backButton = screen.getAllByText(/back/i)[0];
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('home');
  });
});
