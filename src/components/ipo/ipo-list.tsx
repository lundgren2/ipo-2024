'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IPOCard } from '@/components/ipo/ipo-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWatchlist } from '@/context/watchlist-context';
import { fetchUpcomingIPOs, parseDate } from '@/services/ipo-service';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { IPO } from '@/types/ipo';
import { IPOFilters } from './ipo-filters';
import { type Filters, type FilterKey } from './types';

const MIN_LOADING_TIME = 250;
const INITIAL_FILTERS: Filters = {
  searchQuery: '',
  sector: 'all',
  exchange: 'all',
  sortBy: 'date',
  limit: 25,
};

interface IPOListProps {
  onIPOsLoaded?: (ipos: IPO[]) => void;
}

export function IPOList({ onIPOsLoaded }: IPOListProps) {
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ipos, setIpos] = useState<IPO[]>([]);
  const { toast } = useToast();

  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
  const debouncedLimit = useDebounce(filters.limit, 500);

  const loadIPOs = useCallback(async () => {
    const startTime = Date.now();
    setError(null);

    try {
      const data = await fetchUpcomingIPOs(debouncedLimit);

      if (!data?.length) {
        setIpos([]);
        return;
      }

      // Use requestAnimationFrame for smooth UI updates
      requestAnimationFrame(() => {
        setIpos(data);
        onIPOsLoaded?.(data);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error loading IPOs:', error);
      setError(errorMessage);
      toast({
        title: 'Error loading IPOs',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      // Ensure minimum loading time for better UX
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsed)
        );
      }
      setLoading(false);
    }
  }, [debouncedLimit, toast, onIPOsLoaded]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      if (ipos.length === 0) {
        setLoading(true);
      }
      await loadIPOs();
    };

    load();

    return () => {
      mounted = false;
    };
  }, [loadIPOs, ipos.length]);

  const handleFilterChange = useCallback(
    <K extends FilterKey>(key: K, value: Filters[K]) => {
      setFilters((prev: Filters) => ({ ...prev, [key]: value }));
    },
    []
  );

  const filteredIpos = useMemo(() => {
    if (!ipos.length) return [];

    const searchTerms = debouncedSearchQuery
      .toLowerCase()
      .split(' ')
      .filter(Boolean);
    const { sector, exchange, sortBy } = filters;

    // First filter the IPOs
    const filtered = ipos.filter((ipo) => {
      // Only perform text search if there are search terms
      if (searchTerms.length > 0) {
        const ipoText =
          `${ipo.name} ${ipo.sector} ${ipo.exchange} ${ipo.status}`.toLowerCase();
        if (!searchTerms.every((term) => ipoText.includes(term))) {
          return false;
        }
      }

      // Apply sector and exchange filters
      return (
        (sector === 'all' || ipo.sector === sector) &&
        (exchange === 'all' || ipo.exchange === exchange)
      );
    });

    // Then sort the filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'valuation':
          return (b.valuation || 0) - (a.valuation || 0);
        case 'date':
        default:
          return parseDate(a.date) - parseDate(b.date);
      }
    });
  }, [ipos, debouncedSearchQuery, filters]);

  if (error) {
    return (
      <Card className="p-12 text-center">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-destructive">
            Error Loading IPOs
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {error}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <IPOFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredIpos.length}
      />

      <div
        className={`space-y-4 transition-all duration-300 ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {loading && ipos.length === 0 ? (
          <div className="grid gap-4">
            {Array.from({ length: Math.min(3, filters.limit) }).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-32 w-full" />
              </Card>
            ))}
          </div>
        ) : filteredIpos.length > 0 ? (
          <div className="grid gap-4">
            {filteredIpos.map((ipo) => (
              <IPOCard
                key={ipo.id}
                ipo={ipo}
                isWatched={isWatched(ipo.id)}
                onToggleWatch={(watched) =>
                  watched ? addToWatchlist(ipo) : removeFromWatchlist(ipo.id)
                }
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-3">
              <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-semibold">No IPOs Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                No IPOs match your current filters. Try adjusting your search
                criteria or clearing some filters.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
