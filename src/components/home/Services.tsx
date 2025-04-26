import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Brain, Cloud, Database, Code, Smartphone, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, index }) => {
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
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="glass-card p-6 h-full hover-glow group transition-all duration-300"
    >
      <div className="mb-4 text-primary-400 p-3 rounded-lg inline-block bg-gray-800/70">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      <Link 
        to={link} 
        className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
      >
        Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const services = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Enterprise AI Development",
      description: "Cutting-edge AI solutions tailored for enterprise needs, from predictive analytics to intelligent automation systems.",
      link: "/services/enterprise-ai"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Services",
      description: "Comprehensive cloud solutions including AWS, Azure, and Google Cloud with expert CI/CD consulting and managed services.",
      link: "/services/cloud"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Analytics & BI",
      description: "Transform raw data into actionable insights with our advanced analytics and business intelligence solutions.",
      link: "/services/data-analytics"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Product Engineering",
      description: "End-to-end product development services with quality engineering, UX excellence, and DevOps integration.",
      link: "/services/product-engineering"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Digital Transformation",
      description: "Comprehensive digital solutions including blockchain technology, IoT implementation, and cybersecurity services.",
      link: "/services/digital"
    }
  ];

  return (
    <section className="py-16 md:py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="gradient-text">Enterprise Solutions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Comprehensive technology services designed to transform your business and drive innovation in the digital age.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;