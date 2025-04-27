import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const ScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Show scroll button when user scrolls down a bit
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top with animation
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1, 
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut"
    });
  };

  return (
    <div 
      className={`scroll-indicator ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} className="text-white" />
    </div>
  );
};

export default ScrollIndicator;