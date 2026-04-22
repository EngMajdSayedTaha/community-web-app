// Newsletter Subscribe Form Component
import { useState } from 'react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { useSubscribe } from '../hooks/useSubscribe';
import { isValidEmail } from '@utils';

/**
 * SubscribeForm - Newsletter subscription form component
 */
const SubscribeForm = () => {
  const { email, firstName, loading, error, success, setEmail, setFirstName, subscribe, reset } =
    useSubscribe();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!email) {
      setValidationError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    await subscribe();
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <svg
            className="w-6 h-6 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Subscription Confirmed!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Check your email for a confirmation link.
        </p>
        <Button variant="ghost" size="md" onClick={reset}>
          Subscribe Another Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Join 1.2K+ developers getting weekly challenges, tips, and updates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={validationError || (error ? error.message : undefined)}
          disabled={loading}
          required
        />
        <Input
          type="text"
          placeholder="First Name (optional)"
          value={firstName || ''}
          onChange={e => setFirstName(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-700 dark:text-red-300">{error.message}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={loading}
        className="w-full"
      >
        Get Weekly Updates
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        No spam, unsubscribe anytime. Read our{' '}
        <a href="#privacy" className="text-primary hover:underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
};

export default SubscribeForm;