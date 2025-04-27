import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Cloud, 
  Database, 
  Code, 
  Shield,
  Cpu,
  Network,
  Globe,
  LineChart,
  Server,
  Lock,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from '../animations/Particles';
import Logo3D from '../3d/Logo3D';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Function to detect WebGL support
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const Hero: React.FC = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [showGlow, setShowGlow] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mousePosition = useRef<{x: number, y: number} | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const logo3DContainerRef = useRef<HTMLDivElement>(null);

  // Check for WebGL support when component mounts
  useEffect(() => {
    setSupportsWebGL(isWebGLSupported());
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Parallax effect for the hero section
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        backgroundPosition: '0 50%',
        ease: 'none',
      });

      // Text content animation on scroll
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 10%',
          end: '25% top',
          scrub: true,
          toggleActions: 'play none none reverse',
        }
      });

      heroTl
        .to(headingRef.current, {
          y: -50,
          opacity: 0.5,
          duration: 1,
        }, 0)
        .to(paragraphRef.current, {
          y: -30,
          opacity: 0.5,
          duration: 1,
        }, 0.1)
        .to(buttonsRef.current, {
          y: -20,
          opacity: 0.5,
          duration: 1,
        }, 0.2);

      // Create a reveal animation for the circle container
      gsap.from(circleContainerRef.current, {
        scrollTrigger: {
          trigger: circleContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
      
      // Animate floating icons when they scroll into view
      const floatingIcons = gsap.utils.toArray('.floating-icon');
      floatingIcons.forEach((icon: any) => {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
        });
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  useEffect(() => {
    // Initialize positions and start the animation
    const container = iconRef.current;
    if (!container) return;
    
    // Setup mouse move listener for repel effect
    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.querySelector('.circle-container')?.getBoundingClientRect();
      if (!containerRect) return;
      
      // Calculate mouse position relative to the container
      mousePosition.current = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      };
    };
    
    // Add mouse move listener
    container.addEventListener('mousemove', handleMouseMove);
    
    // Reset mouse position when mouse leaves the container
    const handleMouseLeave = () => {
      mousePosition.current = null;
    };
    
    container.addEventListener('mouseleave', handleMouseLeave);
    
    const containerRect = container.querySelector('.circle-container')?.getBoundingClientRect();
    if (!containerRect) return;

    const icons = container.querySelectorAll('.floating-icon');
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Initialize random positions, speeds and angles for each icon
    icons.forEach((icon: Element) => {
      const iconEl = icon as HTMLElement;
      iconEl.dataset.angle = (Math.random() * Math.PI * 2).toString();
      iconEl.dataset.orbitSpeed = (0.0005 + Math.random() * 0.001).toString();
      iconEl.dataset.orbitRadius = (radius * (0.7 + Math.random() * 0.3)).toString();
      iconEl.dataset.waveAmplitude = (5 + Math.random() * 10).toString();
      iconEl.dataset.waveFrequency = (0.001 + Math.random() * 0.002).toString();
    });
    
    // Animation function
    const animate = () => {
      if (!container) return;
      
      const containerRect = container.querySelector('.circle-container')?.getBoundingClientRect();
      if (!containerRect) return;
      
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      icons.forEach((icon: Element) => {
        const iconEl = icon as HTMLElement;
        
        // Update angle for orbit
        let angle = parseFloat(iconEl.dataset.angle || '0');
        const orbitSpeed = parseFloat(iconEl.dataset.orbitSpeed || '0.001');
        const orbitRadius = parseFloat(iconEl.dataset.orbitRadius || '100');
        const waveAmplitude = parseFloat(iconEl.dataset.waveAmplitude || '5');
        const waveFrequency = parseFloat(iconEl.dataset.waveFrequency || '0.001');
        
        angle += orbitSpeed;
        iconEl.dataset.angle = angle.toString();
        
        // Calculate position with some wave motion
        const time = Date.now();
        const waveX = Math.sin(time * waveFrequency) * waveAmplitude;
        const waveY = Math.cos(time * (waveFrequency * 1.2)) * waveAmplitude;
        
        let x = centerX + Math.cos(angle) * orbitRadius + waveX;
        let y = centerY + Math.sin(angle) * orbitRadius + waveY;
        
        // Apply repel effect if mouse is over the container
        if (mousePosition.current) {
          // Get icon's current position
          const iconRect = iconEl.getBoundingClientRect();
          const iconCenterX = iconRect.width / 2;
          const iconCenterY = iconRect.height / 2;
          
          // Calculate distance between mouse and icon
          const dx = mousePosition.current.x - (x - iconCenterX);
          const dy = mousePosition.current.y - (y - iconCenterY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply repel force if mouse is close to the icon
          const repelThreshold = 100; // Distance at which repel effect starts
          const repelStrength = 40; // Strength of the repel effect
          
          if (distance < repelThreshold) {
            // Calculate repel force (stronger when closer)
            const force = (repelThreshold - distance) / repelThreshold * repelStrength;
            
            // Normalize direction vector
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            
            // Apply repel force in the opposite direction of the mouse
            x -= normalizedDx * force;
            y -= normalizedDy * force;
          }
        }
        
        // Set position while accounting for the icon's size
        const offsetX = iconEl.offsetWidth / 2;
        const offsetY = iconEl.offsetHeight / 2;
        
        iconEl.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px)`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Remove event listeners
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    // Particles
    <section ref={heroRef} className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden hero-section">
      {showParticles && <Particles />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div ref={contentRef} className="w-full lg:w-1/2 lg:pr-12">
            <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              <TypewriterText />
            </h1>
            <p ref={paragraphRef} className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
              Cutting-edge AI solutions, cloud services, and digital transformation 
              expertise to drive your business forward in the digital age.
            </p>
            
            <div ref={buttonsRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link to="/contact" className="btn btn-primary">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/services/enterprise-ai" className="btn btn-outline">
                Explore Solutions
              </Link>
            </div>
            
            {/* Mobile scroll down indicator - only visible on mobile */}
            <div className="lg:hidden flex flex-col items-center mt-8 mb-6 text-gray-400 animate-bounce">
              <span className="text-sm mb-1">Scroll Down</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0" ref={iconRef}>
            {supportsWebGL ? (
              // 3D Logo when WebGL is supported
              <div 
                ref={logo3DContainerRef} 
                className="w-full mx-auto max-w-lg" /* Increased from max-w-md to max-w-lg */
                style={{
                  height: '450px', /* Increased from 400px */
                  position: 'relative',
                  transform: 'translateZ(0)',
                  isolation: 'isolate',
                  willChange: 'transform',
                }}
              >
                <Logo3D />
              </div>
            ) : (
              // Fallback to existing logo when WebGL is not supported
              <div ref={circleContainerRef} className="relative w-full aspect-square max-w-md mx-auto circle-container">
                {/* Main graphic - circle and lightning logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                >
                  <div className="relative w-48 h-48 transform-gpu">
                    {/* Enhanced 3D container with stronger perspective */}
                    <div className="absolute inset-0 perspective-[1500px]">
                      {/* 3D rotating container */}
                      <div 
                        className="absolute inset-0 transform-gpu transition-all duration-[1200ms] ease-out hover:rotate-y-[20deg] hover:rotate-x-[20deg] group"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Back glow layer (furthest back in z-space) */}
                        {showGlow && (
                          <div 
                            className="absolute inset-6 rounded-full bg-blue-500/30 blur-xl" 
                            style={{ transform: 'translateZ(-40px)' }}
                          ></div>
                        )}
                        
                        {/* Middle glow layers for depth */}
                        {showGlow && (
                          <div 
                            className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-600/40 blur-md animate-pulse-slow" 
                            style={{ transform: 'translateZ(-20px)' }}
                          ></div>
                        )}
                        
                        {/* Lightning icon base - dark backing for contrast */}
                        <div 
                          className="absolute inset-0 rounded-full bg-gray-900 flex items-center justify-center"
                          style={{ transform: 'translateZ(-5px)' }}
                        ></div>
                        
                        {/* Main circular background with gradient */}
                        <div 
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center shadow-xl" 
                          style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
                        >
                          {/* Lightning icon */}
                          <div style={{ transform: 'translateZ(20px)' }}>
                            <Zap className="w-24 h-24 text-white drop-shadow-2xl" />
                          </div>
                        </div>
                        
                        {/* Edge highlight for rim lighting effect */}
                        <div 
                          className="absolute inset-[-1px] rounded-full border-t-2 border-l-2 border-white/20" 
                          style={{ transform: 'translateZ(1px)' }}
                        ></div>
                        
                        {/* Front reflective highlight */}
                        <div 
                          className="absolute inset-0 rounded-full overflow-hidden" 
                          style={{ transform: 'translateZ(2px)' }}
                        >
                          <div 
                            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
                            style={{ transform: 'rotate(-40deg)', transformOrigin: 'bottom right' }}
                          ></div>
                        </div>
                        
                        {/* Interactive floating particles */}
                        {showGlow && (
                          <>
                            <div className="absolute w-3 h-3 rounded-full bg-blue-400/80 blur-[1px]"
                                 style={{ 
                                   transform: 'translateZ(30px) translate(20px, -15px)', 
                                   animation: 'float 6s ease-in-out infinite' 
                                 }}></div>
                            <div className="absolute w-2 h-2 rounded-full bg-purple-400/80 blur-[1px]"
                                 style={{ 
                                   transform: 'translateZ(40px) translate(-18px, 22px)', 
                                   animation: 'float 8s ease-in-out infinite 1s' 
                                 }}></div>
                            <div className="absolute w-4 h-4 rounded-full bg-indigo-400/80 blur-[2px]"
                                 style={{ 
                                   transform: 'translateZ(25px) translate(10px, 25px)', 
                                   animation: 'float 7s ease-in-out infinite 0.5s' 
                                 }}></div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Animated orbital rings */}
                    {showGlow && (
                      <>
                        {/* React-style elliptical orbital rings */}
                        <div className="react-orbit react-orbit-1"></div>
                        <div className="react-orbit react-orbit-2"></div>
                        <div className="react-orbit react-orbit-3"></div>
                      </>
                    )}
                  </div>
                </motion.div>
                
                {/* Floating icons */}
                {showIcons && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="floating-icon w-14 h-14 bg-blue-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-blue-700/50 shadow-lg absolute"
                      data-speed="2"
                    >
                      <Brain className="text-blue-400 h-8 w-8" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="floating-icon w-16 h-16 bg-purple-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-purple-700/50 shadow-lg absolute"
                      data-speed="4"
                    >
                      <Cloud className="text-purple-400 h-9 w-9" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="floating-icon w-14 h-14 bg-green-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-green-700/50 shadow-lg absolute"
                      data-speed="3"
                    >
                      <Database className="text-green-400 h-8 w-8" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.1 }}
                      className="floating-icon w-14 h-14 bg-yellow-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-yellow-700/50 shadow-lg absolute"
                      data-speed="2.5"
                    >
                      <Code className="text-yellow-400 h-8 w-8" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.3 }}
                      className="floating-icon w-12 h-12 bg-pink-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-pink-700/50 shadow-lg absolute"
                      data-speed="3.5"
                    >
                      <Shield className="text-pink-400 h-7 w-7" />
                    </motion.div>
                    
                    {/* Additional floating icons */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.5 }}
                      className="floating-icon w-13 h-13 bg-red-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-red-700/50 shadow-lg absolute"
                      data-speed="2.2"
                    >
                      <Cpu className="text-red-400 h-7 w-7" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.7 }}
                      className="floating-icon w-15 h-15 bg-cyan-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-cyan-700/50 shadow-lg absolute"
                      data-speed="3.2"
                    >
                      <Network className="text-cyan-400 h-8 w-8" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.9 }}
                      className="floating-icon w-13 h-13 bg-emerald-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-emerald-700/50 shadow-lg absolute"
                      data-speed="2.7"
                    >
                      <Globe className="text-emerald-400 h-7 w-7" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 2.1 }}
                      className="floating-icon w-12 h-12 bg-orange-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-orange-700/50 shadow-lg absolute"
                      data-speed="1.8"
                    >
                      <LineChart className="text-orange-400 h-7 w-7" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 2.3 }}
                      className="floating-icon w-14 h-14 bg-indigo-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-indigo-700/50 shadow-lg absolute"
                      data-speed="2.9"
                    >
                      <Server className="text-indigo-400 h-8 w-8" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 2.5 }}
                      className="floating-icon w-11 h-11 bg-teal-900/30 backdrop-blur-md rounded-lg flex items-center justifyCenter border border-teal-700/50 shadow-lg absolute"
                      data-speed="3.8"
                    >
                      <Lock className="text-teal-400 h-6 w-6" />
                    </motion.div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop scroll down indicator - only visible on larger screens */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center text-gray-400 animate-bounce">
        <span className="text-sm mb-1">Scroll Down</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    </section>
  );
};

// TypewriterText component for animated text effect
const TypewriterText: React.FC = () => {
  // Array of phrases to cycle through
  const phrases = [
    "Transform Your Business with Enterprise Technology",
    "Accelerate Growth with AI-Powered Solutions",
    "Innovate Faster with Cloud Technologies",
    "Scale Securely with Enterprise Architecture",
    "Optimize Operations with Digital Transformation"
  ];
  
  // State variables for the animation
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80); // Base typing speed in ms
  
  useEffect(() => {
    // Get the current phrase
    const currentPhrase = phrases[currentPhraseIndex];
    
    // Set the typing speed based on the current action
    if (isDeleting) {
      setTypingSpeed(100); // Faster when deleting
    } else if (currentText === currentPhrase) {
      // Pause at the end of typing a complete phrase
      setTypingSpeed(2000); // Pause for 2 seconds
    } else {
      setTypingSpeed(100); // Normal typing speed
    }
    
    // Handle the typing/deleting animation
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText !== currentPhrase) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        } else {
          // Start deleting after the pause
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (currentText !== "") {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Move to the next phrase after deletion is complete
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);
    
    // Cleanup timeout on unmount or state change
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed]);
  
  // Split the current text to apply gradient styling
  const formatText = () => {
    // For the first phrase
    if (currentPhraseIndex === 0) {
      const parts = currentText.split("with");
      if (parts.length > 1) {
        return (
          <>
            <span className="gradient-text">Transform</span>
            {parts[0].substring(9)} 
            with
            <span className="gradient-text">{parts[1]}</span>
          </>
        );
      }
      return currentText;
    }
    
    // For other phrases, highlight key terms
    const words = currentText.split(" ");
    return words.map((word, index) => {
      // Apply gradient to important words
      if (["Accelerate", "Growth", "AI-Powered", "Innovate", "Faster", "Cloud", "Scale", "Securely", "Enterprise", "Optimize", "Digital"].includes(word)) {
        return <span key={index} className="gradient-text">{word} </span>;
      }
      return <span key={index}>{word} </span>;
    });
  };
  
  return (
    <div className="min-h-[120px] md:min-h-[150px]">
      {formatText()}
      <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-blink"></span>
    </div>
  );
};

export default Hero;