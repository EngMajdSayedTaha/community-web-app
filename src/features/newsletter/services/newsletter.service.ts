// Newsletter API Service
import { httpClient } from '@services/api/httpClient';
import type { NewsletterSubscription, ApiResponse } from '@types';

const NEWSLETTER_ENDPOINT = '/newsletter';

/**
 * NewsletterService - Handles newsletter subscription and management
 */
class NewsletterService {
  /**
   * Subscribe to newsletter
   */
  async subscribe(email: string, firstName?: string): Promise<ApiResponse<void>> {
    try {
      const subscription: NewsletterSubscription = {
        email,
        firstName,
        preferences: ['weekly-digest', 'new-challenges'],
      };
      const response = await httpClient.post<ApiResponse<void>>(
        `${NEWSLETTER_ENDPOINT}/subscribe`,
        subscription
      );
      return response;
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<ApiResponse<void>>(
        `${NEWSLETTER_ENDPOINT}/unsubscribe`,
        { email }
      );
      return response;
    } catch (error) {
      console.error('Failed to unsubscribe from newsletter:', error);
      throw error;
    }
  }

  /**
   * Verify subscription
   */
  async verifySubscription(token: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<ApiResponse<void>>(
        `${NEWSLETTER_ENDPOINT}/verify`,
        { token }
      );
      return response;
    } catch (error) {
      console.error('Failed to verify subscription:', error);
      throw error;
    }
  }

  /**
   * Update subscription preferences
   */
  async updatePreferences(
    email: string,
    preferences: string[]
  ): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.patch<ApiResponse<void>>(
        `${NEWSLETTER_ENDPOINT}/preferences`,
        { email, preferences }
      );
      return response;
    } catch (error) {
      console.error('Failed to update subscription preferences:', error);
      throw error;
    }
  }

  /**
   * Get subscriber count
   */
  async getSubscriberCount(): Promise<number> {
    try {
      const response = await httpClient.get<ApiResponse<{ count: number }>>(
        `${NEWSLETTER_ENDPOINT}/stats`
      );
      return response.data.count;
    } catch (error) {
      console.error('Failed to get subscriber count:', error);
      throw error;
    }
  }
}

export const newsletterService = new NewsletterService();
export default newsletterService;