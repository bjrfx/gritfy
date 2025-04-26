import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cloud, Database, Code, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;
      
      const icons = iconRef.current.querySelectorAll('.floating-icon');
      
      icons.forEach((icon: Element) => {
        const speed = parseFloat((icon as HTMLElement).dataset.speed || '1');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        (icon as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
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
            <div className="relative w-full aspect-square max-w-md mx-auto">
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
              
              {/* Floating icons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="floating-icon absolute top-0 left-10 w-14 h-14 bg-blue-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-blue-700/50 shadow-lg"
                data-speed="2"
              >
                <Brain className="text-blue-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="floating-icon absolute top-1/4 right-0 w-16 h-16 bg-purple-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-purple-700/50 shadow-lg"
                data-speed="4"
              >
                <Cloud className="text-purple-400 h-9 w-9" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="floating-icon absolute bottom-1/4 left-0 w-14 h-14 bg-green-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-green-700/50 shadow-lg"
                data-speed="3"
              >
                <Database className="text-green-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="floating-icon absolute bottom-0 right-10 w-14 h-14 bg-yellow-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-yellow-700/50 shadow-lg"
                data-speed="2.5"
              >
                <Code className="text-yellow-400 h-8 w-8" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="floating-icon absolute bottom-1/3 right-1/3 w-12 h-12 bg-pink-900/30 backdrop-blur-md rounded-lg flex items-center justify-center border border-pink-700/50 shadow-lg"
                data-speed="3.5"
              >
                <Shield className="text-pink-400 h-7 w-7" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;