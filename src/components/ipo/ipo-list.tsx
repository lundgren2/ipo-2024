'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IPOCard } from '@/components/ipo/ipo-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWatchlist } from '@/context/watchlist-context';
import {
  fetchUpcomingIPOs,
  formatMarketCap,
  parseDate,
  parseValuation,
} from '@/services/ipo-service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useDebounce } from '@/hooks/use-debounce';
import { IPO } from '@/types/ipo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SortOption = 'date' | 'name' | 'valuation';

interface IPOListProps {
  onIPOsLoaded?: (ipos: IPO[]) => void;
}

type FilterKey = 'searchQuery' | 'sector' | 'exchange' | 'sortBy' | 'limit';

interface Filters {
  searchQuery: string;
  sector: string;
  exchange: string;
  sortBy: SortOption;
  limit: number;
}

// Add minimum loading time constant
const MIN_LOADING_TIME = 750; // Increased to 750ms for smoother transitions

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
  const [sectors, setSectors] = useState<string[]>([]);
  const [exchanges, setExchanges] = useState<string[]>([]);
  const { toast } = useToast();

  // Debounce only the search query and limit
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
  const debouncedLimit = useDebounce(filters.limit, 500);

  // Memoize the API call function
  const loadIPOs = useCallback(async () => {
    const startTime = Date.now();
    try {
      const data = await fetchUpcomingIPOs(debouncedLimit);

      if (!data || data.length === 0) {
        setIpos([]);
      } else {
        // Process metadata first
        const uniqueSectors = Array.from(
          new Set(data.map((ipo) => ipo.sector).filter(Boolean))
        );
        const uniqueExchanges = Array.from(
          new Set(data.map((ipo) => ipo.exchange).filter(Boolean))
        );

        // Batch state updates
        requestAnimationFrame(() => {
          setSectors(uniqueSectors);
          setExchanges(uniqueExchanges);
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
      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsed)
        );
      }
      setLoading(false);
    }
  }, [debouncedLimit, toast, onIPOsLoaded]);

  // Load IPOs on mount and when limit changes
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      // Don't set loading true if we already have data
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

  // Handlers for filter changes
  const handleFilterChange = useCallback(
    <K extends FilterKey>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Memoize filtered and sorted IPOs
  const filteredIpos = useMemo(() => {
    if (!ipos.length) return [];

    // Create search terms array once
    const searchTerms = debouncedSearchQuery.toLowerCase().split(' ');
    const { sector, exchange, sortBy } = filters;

    // First filter
    const filtered = ipos.filter((ipo) => {
      // Only create ipoText if there are search terms
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

    // Then sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'valuation':
          return parseValuation(b.valuation) - parseValuation(a.valuation);
        case 'date':
        default:
          return parseDate(a.date) - parseDate(b.date);
      }
    });
  }, [ipos, debouncedSearchQuery, filters]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, sector, exchange..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange('searchQuery', e.target.value)
              }
              className="pl-8"
            />
          </div>
          <Select
            value={filters.sector}
            onValueChange={(value) => handleFilterChange('sector', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.exchange}
            onValueChange={(value) => handleFilterChange('exchange', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              {exchanges.map((exchange) => (
                <SelectItem key={exchange} value={exchange}>
                  {exchange}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value: SortOption) =>
                handleFilterChange('sortBy', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Company Name</SelectItem>
                <SelectItem value="valuation">Valuation</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Display Limit</h4>
                    <p className="text-sm text-muted-foreground">
                      Show up to {filters.limit} IPOs at once
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="limit">Limit</Label>
                      <Slider
                        id="limit"
                        max={100}
                        min={5}
                        step={5}
                        value={[filters.limit]}
                        onValueChange={(value) =>
                          handleFilterChange('limit', value[0])
                        }
                        className="col-span-2"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <p>Showing {filteredIpos.length} results</p>
          <p>Display limit: {filters.limit} IPOs</p>
        </div>
      </Card>

      {/* IPO List with fade transition */}
      <div className="space-y-4">
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            loading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {loading && ipos.length === 0 ? (
            <div className="space-y-4">
              {Array.from({ length: Math.min(3, filters.limit) }).map(
                (_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-24 w-full" />
                  </Card>
                )
              )}
            </div>
          ) : filteredIpos.length > 0 ? (
            <div className="space-y-4">
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
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">
                No IPOs found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
