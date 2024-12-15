import { useState, useEffect } from 'react';
import { IPO } from '@/types/ipo';
import { fetchUpcomingIPOs } from '@/services/ipo-service';

interface UseIpoServiceResult {
  data: IPO[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function useIpoService(): UseIpoServiceResult {
  const [data, setData] = useState<IPO[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadIPOs() {
      try {
        const ipos = await fetchUpcomingIPOs();
        if (mounted) {
          setData(ipos);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error('Failed to fetch IPOs')
          );
          setData(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadIPOs();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
