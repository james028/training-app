import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface FingerprintResult {
  fingerprint: string | null;
  isLoading: boolean;
  error: Error | null;
}

export function useDeviceFingerprint(): FingerprintResult {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        if (isMounted) {
          setFingerprint(result.visitorId);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Unknown fingerprint error"),
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { fingerprint, isLoading, error };
}
