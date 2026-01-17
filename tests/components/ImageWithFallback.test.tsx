import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageWithFallback, HeroImage, TeamImage } from '../../components/ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image with src and alt', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);

    const img = screen.getByRole('img', { name: 'Test image' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('shows skeleton while loading', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);

    // Skeleton should be visible (aria-hidden)
    const skeleton = document.querySelector('[aria-hidden="true"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('hides skeleton after image loads', async () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);

    const img = screen.getByRole('img', { name: 'Test image' });

    // Simulate image load
    fireEvent.load(img);

    await waitFor(() => {
      expect(img.className).toContain('opacity-100');
    });
  });

  it('shows error state when image fails to load', async () => {
    render(<ImageWithFallback src="invalid.jpg" alt="Failed image" />);

    const img = screen.getByRole('img', { hidden: true });

    // Simulate image error
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
    });
  });

  it('tries fallback src when primary fails', async () => {
    render(<ImageWithFallback src="primary.jpg" alt="Test" fallbackSrc="fallback.jpg" />);

    const img = screen.getByRole('img', { hidden: true });

    // Simulate primary image error
    fireEvent.error(img);

    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'fallback.jpg');
    });
  });

  it('shows error state when both primary and fallback fail', async () => {
    render(<ImageWithFallback src="primary.jpg" alt="Test" fallbackSrc="fallback.jpg" />);

    const img = screen.getByRole('img', { hidden: true });

    // Simulate primary error
    fireEvent.error(img);

    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'fallback.jpg');
    });

    // Simulate fallback error
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument();
    });
  });

  it('hides skeleton when showSkeleton is false', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test" showSkeleton={false} />);

    const skeleton = document.querySelector('[aria-hidden="true"]');
    expect(skeleton).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test" className="custom-image" />);

    const container = screen.getByRole('img', { hidden: true }).parentElement;
    expect(container).toHaveClass('custom-image');
  });

  it('passes through additional img props', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test" loading="lazy" data-testid="custom-img" />);

    const img = screen.getByTestId('custom-img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});

describe('HeroImage', () => {
  it('renders with object-cover class', () => {
    render(<HeroImage src="hero.jpg" alt="Hero" />);

    const img = screen.getByRole('img', { hidden: true });
    expect(img.className).toContain('object-cover');
  });

  it('uses eager loading', () => {
    render(<HeroImage src="hero.jpg" alt="Hero" />);

    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('loading', 'eager');
  });
});

describe('TeamImage', () => {
  it('renders with object-cover class', () => {
    render(<TeamImage src="team.jpg" alt="Team member" />);

    const img = screen.getByRole('img', { hidden: true });
    expect(img.className).toContain('object-cover');
  });

  it('uses lazy loading', () => {
    render(<TeamImage src="team.jpg" alt="Team member" />);

    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
