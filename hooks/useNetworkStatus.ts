import { useState, useEffect, useCallback } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  wasOffline: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  rtt?: number;
}

interface NetworkInformation extends EventTarget {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    wasOffline: false,
  });

  const getConnectionInfo = useCallback((): Partial<NetworkStatus> => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      };
    }

    return {};
  }, []);

  const handleOnline = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      isOnline: true,
      wasOffline: !prev.isOnline || prev.wasOffline,
      ...getConnectionInfo(),
    }));
  }, [getConnectionInfo]);

  const handleOffline = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      isOnline: false,
    }));
  }, []);

  const handleConnectionChange = useCallback(() => {
    setStatus(prev => ({
      ...prev,
      ...getConnectionInfo(),
    }));
  }, [getConnectionInfo]);

  useEffect(() => {
    // Set initial connection info
    setStatus(prev => ({
      ...prev,
      ...getConnectionInfo(),
    }));

    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for connection changes if available
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [handleOnline, handleOffline, handleConnectionChange, getConnectionInfo]);

  return status;
};

// Hook to detect slow connections
export const useSlowConnection = (): boolean => {
  const { effectiveType, rtt } = useNetworkStatus();

  // Consider connection slow if:
  // - effectiveType is slow-2g or 2g
  // - or RTT is > 400ms
  return (
    effectiveType === 'slow-2g' ||
    effectiveType === '2g' ||
    (rtt !== undefined && rtt > 400)
  );
};
