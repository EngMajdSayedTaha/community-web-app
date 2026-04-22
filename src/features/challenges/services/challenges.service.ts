// Challenges API Service
import { httpClient } from '@services/api/httpClient';
import type { Challenge, ApiResponse } from '@types';

const CHALLENGES_ENDPOINT = '/challenges';

/**
 * ChallengesService - Handles all API calls related to challenges
 */
class ChallengesService {
  /**
   * Get all challenges
   */
  async getChallenges(): Promise<Challenge[]> {
    try {
      const response = await httpClient.get<ApiResponse<Challenge[]>>(CHALLENGES_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
      throw error;
    }
  }

  /**
   * Get featured challenge
   */
  async getFeaturedChallenge(): Promise<Challenge | null> {
    try {
      const response = await httpClient.get<ApiResponse<Challenge>>(
        `${CHALLENGES_ENDPOINT}/featured`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured challenge:', error);
      return null;
    }
  }

  /**
   * Get challenge by id
   */
  async getChallengeById(id: string): Promise<Challenge> {
    try {
      const response = await httpClient.get<ApiResponse<Challenge>>(
        `${CHALLENGES_ENDPOINT}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch challenge ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get challenges by difficulty
   */
  async getChallengesByDifficulty(
    difficulty: 'easy' | 'medium' | 'hard'
  ): Promise<Challenge[]> {
    try {
      const response = await httpClient.get<ApiResponse<Challenge[]>>(
        CHALLENGES_ENDPOINT,
        { difficulty }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch challenges with difficulty ${difficulty}:`, error);
      throw error;
    }
  }

  /**
   * Get challenges by status
   */
  async getChallengesByStatus(
    status: 'upcoming' | 'active' | 'completed'
  ): Promise<Challenge[]> {
    try {
      const response = await httpClient.get<ApiResponse<Challenge[]>>(
        CHALLENGES_ENDPOINT,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch challenges with status ${status}:`, error);
      throw error;
    }
  }

  /**
   * Create new challenge (admin only)
   */
  async createChallenge(challenge: Omit<Challenge, 'id'>): Promise<Challenge> {
    try {
      const response = await httpClient.post<ApiResponse<Challenge>>(
        CHALLENGES_ENDPOINT,
        challenge
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create challenge:', error);
      throw error;
    }
  }

  /**
   * Update challenge
   */
  async updateChallenge(id: string, challenge: Partial<Challenge>): Promise<Challenge> {
    try {
      const response = await httpClient.put<ApiResponse<Challenge>>(
        `${CHALLENGES_ENDPOINT}/${id}`,
        challenge
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update challenge ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete challenge
   */
  async deleteChallenge(id: string): Promise<void> {
    try {
      await httpClient.delete(`${CHALLENGES_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Failed to delete challenge ${id}:`, error);
      throw error;
    }
  }
}

export const challengesService = new ChallengesService();
export default challengesService;