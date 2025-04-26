import React, { useEffect, useState } from 'react';

const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Initialize window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate blob positions based on mouse movement
  const blobStyle1 = {
    width: '35vw',
    height: '35vw',
    left: `${30 + mousePosition.x * 10}%`,
    top: `${20 + mousePosition.y * 10}%`,
    background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.8), rgba(59, 130, 246, 0))',
    animationDelay: '0s',
  };

  const blobStyle2 = {
    width: '40vw',
    height: '40vw',
    right: `${20 - mousePosition.x * 10}%`,
    top: `${60 - mousePosition.y * 10}%`,
    background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0))',
    animationDelay: '-5s',
  };

  const blobStyle3 = {
    width: '25vw',
    height: '25vw',
    left: `${70 - mousePosition.x * 10}%`,
    bottom: `${20 - mousePosition.y * 10}%`,
    background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.7), rgba(217, 70, 239, 0))',
    animationDelay: '-10s',
  };

  return (
    <div className="animated-bg">
      <div className="gradient-blob" style={blobStyle1}></div>
      <div className="gradient-blob" style={blobStyle2}></div>
      <div className="gradient-blob" style={blobStyle3}></div>
    </div>
  );
};

export default AnimatedBackground;