'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { IPO, WatchlistContextType } from '@/types/ipo';

const WatchlistContext = createContext<WatchlistContextType>({
  watchedIpos: [],
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  toggleFavorite: () => {},
  isWatched: () => false,
});

const STORAGE_KEY = 'ipo-watchlist';

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchedIpos, setWatchedIpos] = useState<IPO[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWatchedIpos(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedIpos));
    } catch (error) {
      console.error('Failed to save watchlist:', error);
    }
  }, [watchedIpos]);

  const addToWatchlist = (ipo: IPO) => {
    setWatchedIpos((prev) => [...prev, { ...ipo, isFavorite: false }]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchedIpos((prev) => prev.filter((ipo) => ipo.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setWatchedIpos((prev) =>
      prev.map((ipo) =>
        ipo.id === id ? { ...ipo, isFavorite: !ipo.isFavorite } : ipo
      )
    );
  };

  const isWatched = (id: string) => watchedIpos.some((ipo) => ipo.id === id);

  return (
    <WatchlistContext.Provider
      value={{
        watchedIpos,
        addToWatchlist,
        removeFromWatchlist,
        toggleFavorite,
        isWatched,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
