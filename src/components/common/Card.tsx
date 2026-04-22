// Reusable Card Component
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Card - Reusable card container component
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      hoverEffect = true,
      padding = 'md',
      border = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'bg-white rounded-lg shadow-sm transition-all duration-300 dark:bg-gray-900';
    const hoverClasses = hoverEffect ? 'hover:shadow-lg hover:-translate-y-1' : '';
    const borderClass = border ? 'border border-gray-200 dark:border-gray-800' : '';
    const paddingClass = paddingClasses[padding];

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${hoverClasses} ${borderClass} ${paddingClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;