// Hook for managing challenges state and operations
import { useState, useEffect, useCallback } from 'react';
import type { Challenge } from '@types';
import { challengesService } from '../services/challenges.service';

interface UseChallengesState {
  challenges: Challenge[];
  featured: Challenge | null;
  loading: boolean;
  error: Error | null;
}

interface UseChallengesReturn extends UseChallengesState {
  refetch: () => Promise<void>;
  getChallengeById: (id: string) => Challenge | undefined;
  filterByDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => Challenge[];
  filterByStatus: (status: 'upcoming' | 'active' | 'completed') => Challenge[];
}

/**
 * useChallenges - Custom hook for managing challenges
 * Handles fetching, caching, and filtering of challenges
 */
export const useChallenges = (): UseChallengesReturn => {
  const [state, setState] = useState<UseChallengesState>({
    challenges: [],
    featured: null,
    loading: true,
    error: null,
  });

  const fetchChallenges = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [challenges, featured] = await Promise.all([
        challengesService.getChallenges(),
        challengesService.getFeaturedChallenge(),
      ]);
      setState(prev => ({
        ...prev,
        challenges,
        featured,
        loading: false,
      }));
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to fetch challenges');
      setState(prev => ({ ...prev, error: err, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const getChallengeById = useCallback(
    (id: string): Challenge | undefined => {
      return state.challenges.find(challenge => challenge.id === id);
    },
    [state.challenges]
  );

  const filterByDifficulty = useCallback(
    (difficulty: 'easy' | 'medium' | 'hard'): Challenge[] => {
      return state.challenges.filter(challenge => challenge.difficulty === difficulty);
    },
    [state.challenges]
  );

  const filterByStatus = useCallback(
    (status: 'upcoming' | 'active' | 'completed'): Challenge[] => {
      return state.challenges.filter(challenge => challenge.status === status);
    },
    [state.challenges]
  );

  return {
    ...state,
    refetch: fetchChallenges,
    getChallengeById,
    filterByDifficulty,
    filterByStatus,
  };
};

export default useChallenges;