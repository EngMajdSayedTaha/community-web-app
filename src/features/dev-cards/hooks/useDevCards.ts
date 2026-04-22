// Hook for managing dev cards state and operations
import { useState, useEffect, useCallback } from 'react';
import type { DevCard } from '@types';
import { devCardsService } from '../services/devCards.service';

interface UseDevCardsState {
  cards: DevCard[];
  loading: boolean;
  error: Error | null;
}

interface UseDevCardsReturn extends UseDevCardsState {
  refetch: () => Promise<void>;
  getCardById: (id: string) => DevCard | undefined;
  filterByDifficulty: (difficulty: 'beginner' | 'intermediate' | 'advanced') => DevCard[];
  searchCards: (query: string) => Promise<DevCard[]>;
}

/**
 * useDevCards - Custom hook for managing dev cards
 * Handles fetching, caching, and filtering of dev cards
 */
export const useDevCards = (): UseDevCardsReturn => {
  const [state, setState] = useState<UseDevCardsState>({
    cards: [],
    loading: true,
    error: null,
  });

  const fetchDevCards = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const cards = await devCardsService.getDevCards();
      setState(prev => ({ ...prev, cards, loading: false }));
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to fetch dev cards');
      setState(prev => ({ ...prev, error: err, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchDevCards();
  }, [fetchDevCards]);

  const getCardById = useCallback(
    (id: string): DevCard | undefined => {
      return state.cards.find(card => card.id === id);
    },
    [state.cards]
  );

  const filterByDifficulty = useCallback(
    (difficulty: 'beginner' | 'intermediate' | 'advanced'): DevCard[] => {
      return state.cards.filter(card => card.difficulty === difficulty);
    },
    [state.cards]
  );

  const searchCards = useCallback(
    async (query: string): Promise<DevCard[]> => {
      try {
        return await devCardsService.searchDevCards(query);
      } catch (error) {
        console.error('Search failed:', error);
        return [];
      }
    },
    []
  );

  return {
    ...state,
    refetch: fetchDevCards,
    getCardById,
    filterByDifficulty,
    searchCards,
  };
};

export default useDevCards;