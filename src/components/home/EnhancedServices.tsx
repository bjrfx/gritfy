import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Brain, Cloud, Database, Code, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
  color: string;
  image: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description, link, index, color, image }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.2 + 0.3,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.2 + 0.5 
      }
    }
  };

  const hoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: { 
      x: 5,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className="relative overflow-hidden"
    >
      <motion.div 
        variants={hoverVariants}
        className={`glass-card hover-glow overflow-hidden relative h-full flex flex-col`}
      >
        <div className="relative overflow-hidden h-48 mb-6">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${color} opacity-60`}></div>
          <motion.div 
            variants={iconVariants} 
            className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-lg p-3 rounded-full"
          >
            {icon}
          </motion.div>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <motion.h3 
            variants={textVariants} 
            className="text-xl font-bold mb-3 text-white"
          >
            {title}
          </motion.h3>
          
          <motion.p 
            variants={textVariants} 
            className="text-gray-400 mb-6 flex-grow"
          >
            {description}
          </motion.p>
          
          <motion.div 
            variants={textVariants}
            className="mt-auto"
          >
            <Link 
              to={link} 
              className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
            >
              Learn more
              <motion.span 
                variants={arrowVariants} 
                className="ml-2"
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EnhancedServices: React.FC = () => {
  const titleControls = useAnimation();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (titleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, titleInView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: { 
        duration: 1.2,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const services = [
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "Enterprise AI Development",
      description: "Cutting-edge AI solutions tailored for enterprise needs, from predictive analytics to intelligent automation systems.",
      link: "/services/enterprise-ai",
      color: "from-blue-600/0 to-blue-600",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Cloud className="w-8 h-8 text-white" />,
      title: "Cloud Services",
      description: "Comprehensive cloud solutions including AWS, Azure, and Google Cloud with expert CI/CD consulting and managed services.",
      link: "/services/cloud",
      color: "from-purple-600/0 to-purple-600",
      image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: "Data Analytics & BI",
      description: "Transform raw data into actionable insights with our advanced analytics and business intelligence solutions.",
      link: "/services/data-analytics",
      color: "from-green-600/0 to-green-600",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Product Engineering",
      description: "End-to-end product development services with quality engineering, UX excellence, and DevOps integration.",
      link: "/services/product-engineering",
      color: "from-yellow-600/0 to-yellow-600",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Digital Transformation",
      description: "Comprehensive digital solutions including blockchain technology, IoT implementation, and cybersecurity services.",
      link: "/services/digital",
      color: "from-red-600/0 to-red-600",
      image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-green-500 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            initial="hidden"
            animate={titleControls}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Our <span className="gradient-text">Enterprise Solutions</span>
          </motion.h2>
          
          <motion.p 
            variants={subtitleVariants}
            initial="hidden"
            animate={titleControls}
            className="max-w-2xl mx-auto text-gray-400 text-lg mb-8"
          >
            Comprehensive technology services designed to transform your business and drive innovation in the digital age.
          </motion.p>
          
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            animate={titleControls}
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceItem 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              index={index}
              color={service.color}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;