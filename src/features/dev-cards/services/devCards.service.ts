// Dev Cards API Service
import { httpClient } from '@services/api/httpClient';
import type { DevCard, ApiResponse } from '@types';

const DEV_CARDS_ENDPOINT = '/dev-cards';

/**
 * DevCardsService - Handles all API calls related to dev cards
 */
class DevCardsService {
  /**
   * Get all dev cards
   */
  async getDevCards(): Promise<DevCard[]> {
    try {
      const response = await httpClient.get<ApiResponse<DevCard[]>>(DEV_CARDS_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dev cards:', error);
      throw error;
    }
  }

  /**
   * Get dev card by id
   */
  async getDevCardById(id: string): Promise<DevCard> {
    try {
      const response = await httpClient.get<ApiResponse<DevCard>>(
        `${DEV_CARDS_ENDPOINT}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch dev card ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get dev cards by difficulty
   */
  async getDevCardsByDifficulty(
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  ): Promise<DevCard[]> {
    try {
      const response = await httpClient.get<ApiResponse<DevCard[]>>(
        DEV_CARDS_ENDPOINT,
        { difficulty }
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch dev cards with difficulty ${difficulty}:`, error);
      throw error;
    }
  }

  /**
   * Search dev cards
   */
  async searchDevCards(query: string): Promise<DevCard[]> {
    try {
      const response = await httpClient.get<ApiResponse<DevCard[]>>(
        DEV_CARDS_ENDPOINT,
        { search: query }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to search dev cards:', error);
      throw error;
    }
  }

  /**
   * Create new dev card (admin only)
   */
  async createDevCard(card: Omit<DevCard, 'id'>): Promise<DevCard> {
    try {
      const response = await httpClient.post<ApiResponse<DevCard>>(
        DEV_CARDS_ENDPOINT,
        card
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create dev card:', error);
      throw error;
    }
  }

  /**
   * Update dev card
   */
  async updateDevCard(id: string, card: Partial<DevCard>): Promise<DevCard> {
    try {
      const response = await httpClient.put<ApiResponse<DevCard>>(
        `${DEV_CARDS_ENDPOINT}/${id}`,
        card
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update dev card ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete dev card
   */
  async deleteDevCard(id: string): Promise<void> {
    try {
      await httpClient.delete(`${DEV_CARDS_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Failed to delete dev card ${id}:`, error);
      throw error;
    }
  }
}

export const devCardsService = new DevCardsService();
export default devCardsService;