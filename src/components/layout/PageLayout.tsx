// Page Layout Wrapper Component
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageLayout - Wrapper component that includes Navbar and Footer
 * Provides consistent layout for all pages
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className={`flex-1 mt-16 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;