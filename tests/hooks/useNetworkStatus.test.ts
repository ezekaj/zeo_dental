import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus, useSlowConnection } from '../../hooks/useNetworkStatus';

describe('useNetworkStatus', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Reset navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns online status initially', () => {
    const { result } = renderHook(() => useNetworkStatus());

    expect(result.current.isOnline).toBe(true);
    expect(result.current.wasOffline).toBe(false);
  });

  it('updates when going offline', () => {
    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      // Simulate going offline
      Object.defineProperty(navigator, 'onLine', { value: false });
      window.dispatchEvent(new Event('offline'));
    });

    expect(result.current.isOnline).toBe(false);
  });

  it('updates when coming back online', () => {
    // Start offline
    Object.defineProperty(navigator, 'onLine', { value: false });

    const { result } = renderHook(() => useNetworkStatus());

    act(() => {
      // Simulate coming online
      Object.defineProperty(navigator, 'onLine', { value: true });
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
    expect(result.current.wasOffline).toBe(true);
  });

  it('tracks wasOffline after reconnection', () => {
    const { result } = renderHook(() => useNetworkStatus());

    // Go offline
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: false });
      window.dispatchEvent(new Event('offline'));
    });

    // Come back online
    act(() => {
      Object.defineProperty(navigator, 'onLine', { value: true });
      window.dispatchEvent(new Event('online'));
    });

    expect(result.current.isOnline).toBe(true);
    expect(result.current.wasOffline).toBe(true);
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useNetworkStatus());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('online', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('offline', expect.any(Function));
  });
});

describe('useSlowConnection', () => {
  it('returns false for fast connections', () => {
    // Mock 4g connection
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '4g',
        rtt: 50,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
    });

    const { result } = renderHook(() => useSlowConnection());

    expect(result.current).toBe(false);
  });

  it('returns true for 2g connections', () => {
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '2g',
        rtt: 100,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
    });

    const { result } = renderHook(() => useSlowConnection());

    expect(result.current).toBe(true);
  });

  it('returns true for slow-2g connections', () => {
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: 'slow-2g',
        rtt: 500,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
    });

    const { result } = renderHook(() => useSlowConnection());

    expect(result.current).toBe(true);
  });

  it('returns true for high RTT connections', () => {
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '3g',
        rtt: 500, // > 400ms threshold
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      configurable: true,
    });

    const { result } = renderHook(() => useSlowConnection());

    expect(result.current).toBe(true);
  });

  it('returns false when connection info is not available', () => {
    // Remove connection info
    Object.defineProperty(navigator, 'connection', {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useSlowConnection());

    expect(result.current).toBe(false);
  });
});
