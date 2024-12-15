import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, StarOff, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWatchlist } from '@/context/watchlist-context';

type SortOption = 'name' | 'date' | 'change' | 'favorite';

export function WatchlistSection() {
  const { watchedIpos, toggleFavorite, removeFromWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState<SortOption>('favorite');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const sortedIpos = [...watchedIpos]
    .filter((ipo) => !showOnlyFavorites || ipo.isFavorite)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'change':
          return parseFloat(b.change) - parseFloat(a.change);
        case 'favorite':
          return Number(b.isFavorite) - Number(a.isFavorite);
        default:
          return 0;
      }
    });

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">Watchlist</h2>
          <Badge variant="secondary" className="text-xs">
            {watchedIpos.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            aria-pressed={showOnlyFavorites}
            aria-label={
              showOnlyFavorites ? 'Show all IPOs' : 'Show favorites only'
            }
          >
            {showOnlyFavorites ? (
              <StarOff className="h-3 w-3 mr-1" aria-hidden="true" />
            ) : (
              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
            )}
            {showOnlyFavorites ? 'Show All' : 'Favorites'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                aria-label="Sort options"
              >
                Sort
                <ChevronDown className="h-3 w-3 ml-1" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('favorite')}>
                By Favorite
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                By Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                By Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('change')}>
                By Change
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-1" role="list">
        {sortedIpos.map((ipo) => (
          <div
            key={ipo.id}
            className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors group focus-within:ring-1 focus-within:ring-primary"
            role="listitem"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(ipo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
                aria-label={
                  ipo.isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <Star
                  className={`h-3 w-3 ${
                    ipo.isFavorite
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div>
                <h3 className="text-sm font-medium leading-none mb-1">
                  {ipo.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-none">
                  {ipo.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={ipo.isPositive ? 'default' : 'destructive'}
                className="text-xs px-1.5 py-0.5"
              >
                {ipo.change}
              </Badge>
              <button
                onClick={() => removeFromWatchlist(ipo.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-destructive rounded-sm p-0.5"
                aria-label={`Remove ${ipo.name} from watchlist`}
              >
                <span
                  aria-hidden="true"
                  className="text-muted-foreground hover:text-destructive"
                >
                  ×
                </span>
              </button>
            </div>
          </div>
        ))}
        {sortedIpos.length === 0 && (
          <div
            className="text-center py-4 text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            {showOnlyFavorites
              ? 'No favorite IPOs yet'
              : 'No IPOs in watchlist'}
          </div>
        )}
      </div>
    </Card>
  );
}
