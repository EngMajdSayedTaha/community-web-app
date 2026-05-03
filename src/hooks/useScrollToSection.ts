// Hook for smooth scrolling to sections
import { useCallback } from 'react';

interface UseScrollToSectionReturn {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
}

/**
 * useScrollToSection - Provides methods for smooth scrolling to sections
 * Useful for navigation and anchor links
 */
export const useScrollToSection = (): UseScrollToSectionReturn => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust based on fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
        left: 0,
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToSection, scrollToTop };
};

export default useScrollToSection;
