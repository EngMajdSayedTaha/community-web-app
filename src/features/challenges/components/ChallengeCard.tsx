// Individual Challenge Card Component
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import type { Challenge } from '@types';

interface ChallengeCardProps {
  challenge: Challenge;
  featured?: boolean;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

/**
 * ChallengeCard - Individual challenge card component
 */
const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, featured = false }) => {
  const statusColor =
    statusColors[challenge.status as keyof typeof statusColors] || statusColors.upcoming;
  const difficultyColor =
    difficultyColors[challenge.difficulty as keyof typeof difficultyColors];

  return (
    <Card
      className={`h-full flex flex-col ${
        featured ? 'ring-2 ring-primary lg:col-span-2' : ''
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`${
              featured ? 'text-2xl' : 'text-lg'
            } font-semibold text-gray-900 dark:text-white mb-1`}>
              {challenge.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {challenge.description}
            </p>
          </div>
          {featured && (
            <div className="ml-4 px-3 py-1 bg-primary text-black rounded-full text-xs font-bold whitespace-nowrap">
              Featured
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor}`}
        >
          {challenge.status || 'active'}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${difficultyColor}`}
        >
          {challenge.difficulty}
        </span>
        {challenge.reward && (
          <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-30 text-yellow-700 dark:text-yellow-200 rounded-full text-xs font-medium">
            🏆 {challenge.reward} points
          </span>
        )}
      </div>

      {/* Date and Week Info */}
      {(challenge.date || challenge.week) && (
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          {challenge.week && <span>Week #{challenge.week}</span>}
          {challenge.date && <span>{new Date(challenge.date).toLocaleDateString()}</span>}
        </div>
      )}

      {/* Action */}
      <div className="mt-auto">
        {challenge.link ? (
          <a href={challenge.link} className="block">
            <Button variant="primary" size="sm" className="w-full">
              Start Challenge
            </Button>
          </a>
        ) : (
          <Button variant="outline" size="sm" className="w-full" disabled>
            Coming Soon
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ChallengeCard;