import React, { useEffect, useState } from 'react';

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the device is mobile using media query
    const checkIfMobile = () => {
      const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
      setIsMobileDevice(isMobile);
      return isMobile;
    };

    // Initial check
    const isMobile = checkIfMobile();

    // Skip cursor effect setup for mobile devices
    if (isMobile) return;

    // Create and inject a stylesheet specifically for cursor handling
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'cursor-style-overrides');
    styleElement.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }

      body, html, a, button, input, [role="button"], .nav-link, .btn {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', () => setHidden(true));
    window.addEventListener('mouseenter', () => setHidden(false));

    // Update link hover state handling
    const setupHoverListeners = () => {
      const clickableElements = document.querySelectorAll('a, button, input, [role="button"], .nav-link, .btn, nav *');
      
      clickableElements.forEach(el => {
        el.addEventListener('mouseenter', handleLinkHoverStart);
        el.addEventListener('mouseleave', handleLinkHoverEnd);
      });
    };

    // Initial setup
    setupHoverListeners();
    
    // Refresh event listeners periodically
    const intervalId = setInterval(setupHoverListeners, 1000);

    // Listen for window resize events to update device type
    const handleResize = () => {
      checkIfMobile();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', () => setHidden(true));
      window.removeEventListener('mouseenter', () => setHidden(false));
      window.removeEventListener('resize', handleResize);
      
      clearInterval(intervalId);
      
      if (document.getElementById('cursor-style-overrides')) {
        document.head.removeChild(styleElement);
      }
      
      // Clean up event listeners
      const clickableElements = document.querySelectorAll('a, button, input, [role="button"], .nav-link, .btn, nav *');
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Don't render custom cursor on mobile devices
  if (isMobileDevice) {
    return null;
  }

  return (
    <>
      <div 
        className="cursor-dot"
        style={{ 
          position: 'fixed',
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: '6px',
          height: '6px',
          backgroundColor: '#8B5CF6',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: hidden ? 0 : 0.7,
          mixBlendMode: 'screen',
          filter: 'blur(4px)',
          transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : linkHovered ? 2 : 1})`,
          zIndex: 99999,
          transition: 'transform 0.1s ease, opacity 0.2s ease'
        }}
      />
      <div
        className="cursor-outline"
        style={{ 
          position: 'fixed',
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: '30px',
          height: '30px',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: hidden ? 0 : 0.4,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.9 : linkHovered ? 1.5 : 1})`,
          zIndex: 99999,
          transition: 'transform 0.15s ease, opacity 0.2s ease'
        }}
      />
    </>
  );
};

export default CursorEffect;