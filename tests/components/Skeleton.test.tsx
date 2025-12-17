import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from '../../components/Skeleton';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies rectangular variant by default', () => {
    render(<Skeleton />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('rounded-lg');
  });

  it('applies circular variant', () => {
    render(<Skeleton variant="circular" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('rounded-full');
  });

  it('applies text variant', () => {
    render(<Skeleton variant="text" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('rounded');
  });

  it('applies pulse animation by default', () => {
    render(<Skeleton />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('animate-pulse');
  });

  it('applies no animation when specified', () => {
    render(<Skeleton animation="none" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).not.toContain('animate-pulse');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width={200} height={100} />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('applies string width and height', () => {
    render(<Skeleton width="50%" height="2rem" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-class" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('custom-class');
  });
});

describe('SkeletonText', () => {
  it('renders 3 lines by default', () => {
    render(<SkeletonText />);

    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons).toHaveLength(3);
  });

  it('renders specified number of lines', () => {
    render(<SkeletonText lines={5} />);

    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons).toHaveLength(5);
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonText className="custom-text" />);

    expect(container.firstChild).toHaveClass('custom-text');
  });
});

describe('SkeletonCard', () => {
  it('renders with image and text skeletons', () => {
    render(<SkeletonCard />);

    const skeletons = screen.getAllByRole('presentation');
    // Should have image skeleton + title + 2 text lines
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  it('applies custom className', () => {
    const { container } = render(<SkeletonCard className="custom-card" />);

    expect(container.firstChild).toHaveClass('custom-card');
  });
});

describe('SkeletonAvatar', () => {
  it('renders circular skeleton', () => {
    render(<SkeletonAvatar />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('rounded-full');
  });

  it('uses default size of 48', () => {
    render(<SkeletonAvatar />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton).toHaveStyle({ width: '48px', height: '48px' });
  });

  it('applies custom size', () => {
    render(<SkeletonAvatar size={64} />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton).toHaveStyle({ width: '64px', height: '64px' });
  });

  it('applies custom className', () => {
    render(<SkeletonAvatar className="custom-avatar" />);

    const skeleton = screen.getByRole('presentation');
    expect(skeleton.className).toContain('custom-avatar');
  });
});
