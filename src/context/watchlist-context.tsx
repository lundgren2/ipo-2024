'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type WatchedIPO = {
  id: string;
  name: string;
  date: string;
  change: string;
  isPositive: boolean;
  isFavorite: boolean;
  sector: string;
  exchange: string;
  valuation: string;
};

type WatchlistContextType = {
  watchedIpos: WatchedIPO[];
  addToWatchlist: (ipo: Omit<WatchedIPO, 'isFavorite'>) => void;
  removeFromWatchlist: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isWatched: (id: string) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchedIpos, setWatchedIpos] = useState<WatchedIPO[]>([
    {
      id: '1',
      name: 'Reddit',
      date: 'Mar 21',
      change: '+15.2%',
      isPositive: true,
      isFavorite: true,
      sector: 'Technology',
      exchange: 'NYSE',
      valuation: '$15B',
    },
    {
      id: '2',
      name: 'Shein',
      date: 'Apr 5',
      change: '+8.4%',
      isPositive: true,
      isFavorite: false,
      sector: 'Retail',
      exchange: 'NYSE',
      valuation: '$60B',
    },
  ]);

  const addToWatchlist = (ipo: Omit<WatchedIPO, 'isFavorite'>) => {
    setWatchedIpos((current) => {
      if (current.some((w) => w.id === ipo.id)) return current;
      return [...current, { ...ipo, isFavorite: false }];
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchedIpos((current) => current.filter((ipo) => ipo.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setWatchedIpos((current) =>
      current.map((ipo) =>
        ipo.id === id ? { ...ipo, isFavorite: !ipo.isFavorite } : ipo
      )
    );
  };

  const isWatched = (id: string) => {
    return watchedIpos.some((ipo) => ipo.id === id);
  };

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

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
