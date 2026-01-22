import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Detect if device is touch-only (no hover capability)
 * Returns true on mobile/tablet, false on desktop with mouse
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for touch capability AND no fine pointer (mouse)
  // This ensures tablets with stylus or laptops with touchscreen still get hover
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const hasNoFinePointer = !window.matchMedia('(pointer: fine)').matches;

  return hasTouch && hasCoarsePointer && hasNoFinePointer;
}

/**
 * Hook that auto-colorizes images on scroll for touch devices only.
 * On desktop (with mouse), returns false so hover effects remain active.
 *
 * @param threshold - How much of the element should be visible (0-1, default 0.3 = 30%)
 * @param rootMargin - Margin around the viewport to trigger earlier/later
 * @returns [ref, shouldColorize] - Ref to attach to element and boolean for colorization
 */
export function useScrollColorize<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.3,
  rootMargin: string = '0px'
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    // Only run intersection observer on touch devices
    if (!isTouch) return;

    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only toggle to true when entering, keep true once entered
          // This creates a reveal effect as you scroll down
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isTouch]);

  // On desktop: always return false (let CSS hover handle it)
  // On touch: return true when in view
  return [ref, isTouch && isInView];
}

/**
 * Same as useScrollColorize but resets when element leaves viewport
 * Good for elements that appear multiple times or loop
 */
export function useScrollColorizeToggle<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.3,
  rootMargin: string = '0px'
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
}

export default useScrollColorize;
