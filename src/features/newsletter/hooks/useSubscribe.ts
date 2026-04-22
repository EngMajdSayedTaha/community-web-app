// Hook for managing newsletter subscription
import { useState, useCallback } from 'react';
import { newsletterService } from '../services/newsletter.service';

interface UseSubscribeState {
  email: string;
  firstName?: string;
  subscribed: boolean;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

interface UseSubscribeReturn extends UseSubscribeState {
  setEmail: (email: string) => void;
  setFirstName: (name: string) => void;
  subscribe: () => Promise<boolean>;
  reset: () => void;
}

/**
 * useSubscribe - Custom hook for newsletter subscription
 * Manages subscription state and API calls
 */
export const useSubscribe = (): UseSubscribeReturn => {
  const [state, setState] = useState<UseSubscribeState>({
    email: '',
    firstName: '',
    subscribed: false,
    loading: false,
    error: null,
    success: false,
  });

  const setEmail = useCallback((email: string) => {
    setState(prev => ({ ...prev, email }));
  }, []);

  const setFirstName = useCallback((firstName: string) => {
    setState(prev => ({ ...prev, firstName }));
  }, []);

  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!state.email) {
      setState(prev => ({
        ...prev,
        error: new Error('Email is required'),
      }));
      return false;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await newsletterService.subscribe(state.email, state.firstName);
      setState(prev => ({
        ...prev,
        subscribed: true,
        success: true,
        loading: false,
        email: '',
        firstName: '',
      }));
      return true;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Subscription failed');
      setState(prev => ({
        ...prev,
        error: err,
        loading: false,
      }));
      return false;
    }
  }, [state.email, state.firstName]);

  const reset = useCallback(() => {
    setState({
      email: '',
      firstName: '',
      subscribed: false,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    setEmail,
    setFirstName,
    subscribe,
    reset,
  };
};

export default useSubscribe;