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
import { type Filters, type FilterKey, type SortOption } from './types';

const MIN_LOADING_TIME = 250;

interface IPOListProps {
  onIPOsLoaded?: (ipos: IPO[]) => void;
}

export function IPOList({ onIPOsLoaded }: IPOListProps) {
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    sector: 'all',
    exchange: 'all',
    sortBy: 'date',
    limit: 25,
  });
  const [loading, setLoading] = useState(true);
  const [ipos, setIpos] = useState<IPO[]>([]);
  const { toast } = useToast();

  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
  const debouncedLimit = useDebounce(filters.limit, 500);

  const loadIPOs = useCallback(async () => {
    const startTime = Date.now();
    try {
      const data = await fetchUpcomingIPOs(debouncedLimit);

      if (!data || data.length === 0) {
        setIpos([]);
      } else {
        requestAnimationFrame(() => {
          setIpos(data);
          onIPOsLoaded?.(data);
        });
      }
    } catch (error) {
      console.error('Error loading IPOs:', error);
      toast({
        title: 'Error loading IPOs',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
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
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const filteredIpos = useMemo(() => {
    if (!ipos.length) return [];

    const searchTerms = debouncedSearchQuery.toLowerCase().split(' ');
    const { sector, exchange, sortBy } = filters;

    const filtered = ipos.filter((ipo) => {
      if (searchTerms.length > 0) {
        const ipoText =
          `${ipo.name} ${ipo.sector} ${ipo.exchange} ${ipo.status}`.toLowerCase();
        if (!searchTerms.every((term: string) => ipoText.includes(term))) {
          return false;
        }
      }

      return (
        (sector === 'all' || ipo.sector === sector) &&
        (exchange === 'all' || ipo.exchange === exchange)
      );
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return parseDate(a.date) - parseDate(b.date);
      }
    });
  }, [ipos, debouncedSearchQuery, filters]);

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
