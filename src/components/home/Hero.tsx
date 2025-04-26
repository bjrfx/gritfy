import React, { useEffect, useRef } from 'react';
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
  Lock
} from 'lucide-react';

const Hero: React.FC = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const mousePosition = useRef<{x: number, y: number} | null>(null);

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
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                <span className="gradient-text">Transform</span> Your Business with 
                <span className="gradient-text"> Enterprise Technology</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
                Cutting-edge AI solutions, cloud services, and digital transformation 
                expertise to drive your business forward in the digital age.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Link to="/contact" className="btn btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/services/enterprise-ai" className="btn btn-outline">
                  Explore Solutions
                </Link>
              </div>
              
              {/* <div className="flex items-center space-x-8 mt-12">
                <img src="https://images.pexels.com/photos/11035481/pexels-photo-11035481.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Company 1" className="h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                <img src="https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Company 2" className="h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                <img src="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Company 3" className="h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </div> */}
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0" ref={iconRef}>
            <div className="relative w-full aspect-square max-w-md mx-auto circle-container">
              {/* Main graphic */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center"
                style={{
                  boxShadow: `
                    0 0 25px 5px rgba(79, 70, 229, 0.3),
                    0 0 50px 10px rgba(124, 58, 237, 0.2),
                    inset 0 0 20px rgba(139, 92, 246, 0.3)
                  `,
                  animation: 'pulse 3s infinite alternate'
                }}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">Gritfy Technologies</div>
                  <div className="text-gray-400">Enterprise Solutions</div>
                </div>
              </motion.div>
              
              {/* Existing floating icons */}
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
                className="floating-icon w-16 h-16 bg-purple-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-purple-700/50 shadow-lg absolute"
                data-speed="4"
              >
                <Cloud className="text-purple-400 h-9 w-9" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="floating-icon w-14 h-14 bg-green-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-green-700/50 shadow-lg absolute"
                data-speed="3"
              >
                <Database className="text-green-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="floating-icon w-14 h-14 bg-yellow-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-yellow-700/50 shadow-lg absolute"
                data-speed="2.5"
              >
                <Code className="text-yellow-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="floating-icon w-12 h-12 bg-pink-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-pink-700/50 shadow-lg absolute"
                data-speed="3.5"
              >
                <Shield className="text-pink-400 h-7 w-7" />
              </motion.div>
              
              {/* Additional floating icons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="floating-icon w-13 h-13 bg-red-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-red-700/50 shadow-lg absolute"
                data-speed="2.2"
              >
                <Cpu className="text-red-400 h-7 w-7" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.7 }}
                className="floating-icon w-15 h-15 bg-cyan-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-cyan-700/50 shadow-lg absolute"
                data-speed="3.2"
              >
                <Network className="text-cyan-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.9 }}
                className="floating-icon w-13 h-13 bg-emerald-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-emerald-700/50 shadow-lg absolute"
                data-speed="2.7"
              >
                <Globe className="text-emerald-400 h-7 w-7" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.1 }}
                className="floating-icon w-12 h-12 bg-orange-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-orange-700/50 shadow-lg absolute"
                data-speed="1.8"
              >
                <LineChart className="text-orange-400 h-7 w-7" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.3 }}
                className="floating-icon w-14 h-14 bg-indigo-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-indigo-700/50 shadow-lg absolute"
                data-speed="2.9"
              >
                <Server className="text-indigo-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="floating-icon w-11 h-11 bg-teal-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-teal-700/50 shadow-lg absolute"
                data-speed="3.8"
              >
                <Lock className="text-teal-400 h-6 w-6" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;