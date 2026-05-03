// Dev Cards Section Component
import { useEffect, useState } from 'react';
import DevCard from '@features/dev-cards/components/DevCard';
import type { DevCard as DevCardType } from '@types';

const MOCK_DEV_CARDS: DevCardType[] = [
  {
    id: '1',
    title: 'Angular Mastery',
    description: 'Build scalable SPAs with Angular framework and TypeScript',
    difficulty: 'intermediate',
    learningTime: '4 weeks',
    icon: '🔴',
    topics: ['Angular', 'RxJS', 'TypeScript', 'Reactive Programming'],
    link: '#',
  },
  {
    id: '2',
    title: 'TypeScript Advanced',
    description: 'Master advanced TypeScript patterns and type system',
    difficulty: 'advanced',
    learningTime: '3 weeks',
    icon: '🔵',
    topics: ['TypeScript', 'Generics', 'Advanced Types', 'Decorators'],
    link: '#',
  },
  {
    id: '3',
    title: '.NET & C# Fundamentals',
    description: 'Learn backend development with .NET and C#',
    difficulty: 'beginner',
    learningTime: '5 weeks',
    icon: '🟩',
    topics: ['.NET', 'C#', 'ASP.NET Core', 'SQL'],
    link: '#',
  },
  {
    id: '4',
    title: 'GitHub Copilot Pro',
    description: 'Leverage AI to accelerate your development workflow',
    difficulty: 'beginner',
    learningTime: '2 weeks',
    icon: '🤖',
    topics: ['GitHub Copilot', 'AI', 'Productivity', 'Best Practices'],
    link: '#',
  },
  {
    id: '5',
    title: 'SQL Server & Databases',
    description: 'Query optimization and database design patterns',
    difficulty: 'intermediate',
    learningTime: '4 weeks',
    icon: '💾',
    topics: ['SQL', 'Database Design', 'Performance', 'Indexing'],
    link: '#',
  },
  {
    id: '6',
    title: 'Git & Version Control',
    description: 'Master Git workflows, branching strategies, and collaboration',
    difficulty: 'beginner',
    learningTime: '1 week',
    icon: '🌳',
    topics: ['Git', 'GitHub', 'Branching', 'Collaboration'],
    link: '#',
  },
];

/**
 * DevCardsSection - Display grid of learning cards
 */
const DevCardsSection = () => {
  const [cards, setCards] = useState<DevCardType[]>(MOCK_DEV_CARDS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    const timer = setTimeout(() => {
      setCards(MOCK_DEV_CARDS);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="dev-cards" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loading...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dev-cards" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Learning Resources</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated selection of development cards covering essential technologies and concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <DevCard key={card.id} card={card} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/dev-cards"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:opacity-90 transition-opacity gap-2"
          >
            View All Dev Cards
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DevCardsSection;
