import React, { useEffect, useRef } from 'react';
import Hero from '../components/home/Hero';
import EnhancedServices from '../components/home/EnhancedServices';
import CTA from '../components/home/CTA';
import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Clock, Award, Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import InfiniteServicesScroll from '../components/home/InfiniteServicesScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home: React.FC = () => {
  // Refs for GSAP animations
  const statsRef = useRef<HTMLDivElement>(null);
  const innovationSectionRef = useRef<HTMLDivElement>(null);
  const innovationTextRef = useRef<HTMLDivElement>(null);
  const innovationImageRef = useRef<HTMLDivElement>(null);
  const statsItems = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    document.title = "Gritfy Technologies - Enterprise AI & Cloud Innovation";
    
    // Initialize scroll animations when component mounts
    const ctx = gsap.context(() => {
      // Stats section animation
      gsap.from(statsItems.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
      
      // Innovation section animations
      const innovationTl = gsap.timeline({
        scrollTrigger: {
          trigger: innovationSectionRef.current,
          start: "top 70%",
          end: "center 30%",
          toggleActions: "play none none reverse",
          // markers: true, // Enable for debugging
        }
      });
      
      innovationTl
        .from(innovationTextRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
        })
        .from(innovationImageRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
        }, "-=0.5");
        
      // Create a parallax effect for the image
      gsap.to(innovationImageRef.current, {
        scrollTrigger: {
          trigger: innovationSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 50,
      });
    });
    
    // Cleanup function
    return () => ctx.revert();
  }, []);

  const stats = [
    { 
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      value: "10+", 
      label: "Years of Excellence",
    },
    { 
      icon: <Award className="w-6 h-6 text-purple-400" />,
      value: "500+", 
      label: "Projects Delivered",
    },
    { 
      icon: <Users className="w-6 h-6 text-green-400" />,
      value: "50+", 
      label: "Enterprise Clients",
    },
    { 
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      value: "100%", 
      label: "Client Satisfaction",
    },
  ];

  // Keep the Framer Motion controls for components that still use it
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <>
      <Hero />
      <EnhancedServices />
      <InfiniteServicesScroll />
      
      <section ref={statsRef} className="py-16 md:py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={el => statsItems.current[i] = el}
                className="glass-card p-6 hover-glow"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section ref={innovationSectionRef} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div ref={innovationTextRef} className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Driving <span className="gradient-text">Innovation</span> Through Technology
              </h2>
              <p className="text-gray-300 mb-6">
                At Gritfy Technologies, we believe in harnessing the power of cutting-edge technology to solve complex 
                business challenges. Our team of experts works closely with you to understand your unique needs 
                and deliver tailored solutions that drive growth.
              </p>
              <p className="text-gray-300 mb-8">
                With a focus on innovation and excellence, we help businesses of all sizes leverage AI, 
                cloud technology, and digital transformation to stay ahead in today's competitive landscape.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start feature-item">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Client-Focused</h4>
                    <p className="text-sm text-gray-400">Tailored solutions for your needs</p>
                  </div>
                </div>
                <div className="flex items-start feature-item">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Future-Ready</h4>
                    <p className="text-sm text-gray-400">Cutting-edge technologies</p>
                  </div>
                </div>
                <div className="flex items-start feature-item">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Agile Process</h4>
                    <p className="text-sm text-gray-400">Flexible and responsive</p>
                  </div>
                </div>
                <div className="flex items-start feature-item">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Expert Team</h4>
                    <p className="text-sm text-gray-400">Skilled professionals</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div ref={innovationImageRef} className="w-full lg:w-1/2">
              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-xl glass-card p-1">
                  <img 
                    src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 glass-card p-4 backdrop-blur-lg success-stat">
                  <div className="text-xl font-bold gradient-text mb-1">98%</div>
                  <div className="text-sm text-gray-400">Project Success Rate</div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-card p-4 backdrop-blur-lg support-stat">
                  <div className="text-xl font-bold gradient-text mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default Home;