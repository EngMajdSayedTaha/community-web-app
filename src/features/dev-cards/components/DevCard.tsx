// Individual Dev Card Component
import Card from '@components/common/Card';
import type { DevCard } from '@types';

interface DevCardProps {
  card: DevCard;
}

const difficultyColors: Record<DevCard['difficulty'], string> = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

/**
 * DevCard - Individual learning card component
 */
const DevCard: React.FC<DevCardProps> = ({ card }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1">
        {/* Icon and Title */}
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center mb-3 text-2xl">
            {card.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {card.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {card.description}
          </p>
        </div>

        {/* Difficulty and Learning Time */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${difficultyColors[card.difficulty]}`}
          >
            {card.difficulty}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {card.learningTime}
          </span>
        </div>

        {/* Topics */}
        {card.topics && card.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {card.topics.slice(0, 3).map((topic: string) => (
              <span
                key={topic}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {topic}
              </span>
            ))}
            {card.topics.length > 3 && (
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded">
                +{card.topics.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Link */}
      {card.link && (
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1 mt-4"
        >
          Learn More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </Card>
  );
};

export default DevCard;