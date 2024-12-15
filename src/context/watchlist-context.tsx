'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { IPO } from '@/types/ipo';

interface WatchlistContextType {
  watchedIpos: IPO[];
  isWatched: (id: string) => boolean;
  addToWatchlist: (ipo: IPO) => void;
  removeFromWatchlist: (id: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

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

  const isWatched = useCallback(
    (id: string) => watchedIpos.some((ipo) => ipo.id === id),
    [watchedIpos]
  );

  const addToWatchlist = useCallback((ipo: IPO) => {
    setWatchedIpos((prev) => {
      if (prev.some((item) => item.id === ipo.id)) return prev;
      return [...prev, ipo];
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchedIpos((prev) => prev.filter((ipo) => ipo.id !== id));
  }, []);

  return (
    <WatchlistContext.Provider
      value={{
        watchedIpos,
        isWatched,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
