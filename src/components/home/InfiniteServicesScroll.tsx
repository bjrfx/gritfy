import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Cloud, Database, Code, Smartphone, ArrowRight, Layers, Shield, Network, Cpu, BarChart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, color, link }) => {
  return (
    <div className={`service-card glass-card hover-glow p-6 min-w-[300px] md:min-w-[350px] h-[300px] flex flex-col`}>
      <div className={`p-3 rounded-lg inline-block ${color} backdrop-blur-xl mb-4 w-12 h-12 flex items-center justify-center`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      
      <p className="text-gray-400 mb-6 flex-grow">
        {description}
      </p>
      
      <div className="mt-auto">
        <Link 
          to={link} 
          className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-all group"
        >
          Learn more
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
};

const InfiniteServicesScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Extended service list for horizontal scrolling
  const services = [
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "Enterprise AI Development",
      description: "Cutting-edge AI solutions tailored for enterprise needs, from predictive analytics to intelligent automation systems.",
      color: "bg-blue-600/30",
      link: "/services/enterprise-ai"
    },
    {
      icon: <Cloud className="w-6 h-6 text-white" />,
      title: "Cloud Services",
      description: "Comprehensive cloud solutions including AWS, Azure, and Google Cloud with expert CI/CD consulting.",
      color: "bg-purple-600/30",
      link: "/services/cloud"
    },
    {
      icon: <Database className="w-6 h-6 text-white" />,
      title: "Data Analytics & BI",
      description: "Transform raw data into actionable insights with our advanced analytics and business intelligence solutions.",
      color: "bg-green-600/30",
      link: "/services/data-analytics"
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: "Product Engineering",
      description: "End-to-end product development with quality engineering, UX excellence, and DevOps integration.",
      color: "bg-yellow-600/30",
      link: "/services/product-engineering"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-white" />,
      title: "Digital Transformation",
      description: "Comprehensive digital solutions including blockchain, IoT implementation, and cybersecurity services.",
      color: "bg-red-600/30",
      link: "/services/digital"
    },
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: "UX Engineering",
      description: "Create intuitive and engaging user experiences with our expert UX engineering services.",
      color: "bg-pink-600/30",
      link: "/services/ux-engineering"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Cybersecurity",
      description: "Protect your business with comprehensive cybersecurity solutions including vulnerability assessment and incident response.",
      color: "bg-indigo-600/30",
      link: "/services/cybersecurity"
    },
    {
      icon: <Network className="w-6 h-6 text-white" />,
      title: "IoT Solutions",
      description: "Connect and optimize your business with cutting-edge Internet of Things implementation and management.",
      color: "bg-teal-600/30",
      link: "/services/iot"
    },
    {
      icon: <Cpu className="w-6 h-6 text-white" />,
      title: "DevOps Services",
      description: "Streamline your development and operations with our expert DevOps consulting and implementation.",
      color: "bg-amber-600/30",
      link: "/services/devops"
    },
    {
      icon: <BarChart className="w-6 h-6 text-white" />,
      title: "Quality Engineering",
      description: "Ensure your products meet the highest standards with our comprehensive quality engineering services.",
      color: "bg-emerald-600/30",
      link: "/services/quality-engineering"
    }
  ];

  useEffect(() => {
    // Initialize horizontal scroll animation when component mounts
    const container = scrollContainerRef.current;
    const track = servicesTrackRef.current;
    const title = titleRef.current;
    
    if (!container || !track || !title) return;
    
    // Simple fade-in for title
    gsap.fromTo(title, 
      { opacity: 0, y: 50 }, 
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        delay: 0.2
      }
    );
    
    // Make sure services are visible initially
    gsap.set('.service-card', {
      opacity: 1,
      scale: 1
    });
    
    // Get the width of the content for scrolling
    const trackWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    
    // Create a ScrollTrigger with proper pinning
    gsap.to(track, {
      x: () => -(trackWidth - windowWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 0%", // Pin exactly at the top of the viewport (0%)
        end: () => `+=${trackWidth * 1.2}`, // Slightly increase scroll distance for smoother experience
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });
    
    // Individual card animations for extra flair
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 20, opacity: 0.5 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Cleanup function - this is crucial for proper behavior with other sections
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <section ref={scrollContainerRef} className="py-20 md:py-32 relative overflow-hidden bg-slate-950/50" id="infinite-services">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Technology Expertise</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Discover our comprehensive range of services designed to accelerate your digital transformation journey.
          </p>
          
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-8"></div>
        </div>
      </div>
      
      <div className="overflow-hidden relative z-10">
        <div ref={servicesTrackRef} className="services-track flex gap-6 pl-4 lg:pl-8 pr-[100vw]">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              link={service.link}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 flex justify-center items-center">
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <div className="w-8 h-[1px] bg-gray-600"></div>
          <span>Scroll to explore</span>
          <div className="w-8 h-[1px] bg-gray-600"></div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteServicesScroll;