'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 border-none shadow-sm bg-gradient-to-b from-background to-muted/20">
        <div className="space-y-6">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search IPOs by name, sector, or exchange..."
                value={filters.searchQuery}
                onChange={(e) =>
                  handleFilterChange('searchQuery', e.target.value)
                }
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value: SortOption) =>
                  handleFilterChange('sortBy', value)
                }
              >
                <SelectTrigger className="w-[140px]">
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
                  <Button variant="outline" size="icon" className="shrink-0">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filters</h4>
                      <p className="text-sm text-muted-foreground">
                        Customize your IPO view
                      </p>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>Sector</Label>
                        <Select
                          value={filters.sector}
                          onValueChange={(value) =>
                            handleFilterChange('sector', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Sectors" />
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
                      </div>
                      <div className="grid gap-2">
                        <Label>Exchange</Label>
                        <Select
                          value={filters.exchange}
                          onValueChange={(value) =>
                            handleFilterChange('exchange', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="All Exchanges" />
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
                      </div>
                      <div className="grid gap-2">
                        <Label>Display Limit</Label>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Show up to {filters.limit} IPOs
                            </span>
                            <span className="text-sm font-medium">
                              {filters.limit}
                            </span>
                          </div>
                          <Slider
                            id="limit"
                            max={100}
                            min={5}
                            step={5}
                            value={[filters.limit]}
                            onValueChange={(value) =>
                              handleFilterChange('limit', value[0])
                            }
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.sector !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1"
                onClick={() => handleFilterChange('sector', 'all')}
              >
                {filters.sector}
                <button className="ml-1 hover:text-foreground">×</button>
              </Badge>
            )}
            {filters.exchange !== 'all' && (
              <Badge
                variant="secondary"
                className="gap-1"
                onClick={() => handleFilterChange('exchange', 'all')}
              >
                {filters.exchange}
                <button className="ml-1 hover:text-foreground">×</button>
              </Badge>
            )}
            {filters.searchQuery && (
              <Badge
                variant="secondary"
                className="gap-1"
                onClick={() => handleFilterChange('searchQuery', '')}
              >
                Search: {filters.searchQuery}
                <button className="ml-1 hover:text-foreground">×</button>
              </Badge>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
            <p>
              Showing{' '}
              <span className="font-medium text-foreground">
                {filteredIpos.length}
              </span>{' '}
              {filteredIpos.length === 1 ? 'result' : 'results'}
            </p>
            <p className="flex items-center gap-2">
              <span>Sort by:</span>
              <span className="font-medium text-foreground capitalize">
                {filters.sortBy}
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* IPO List with fade transition */}
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
