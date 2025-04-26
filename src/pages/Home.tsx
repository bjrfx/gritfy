import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import CTA from '../components/home/CTA';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Clock, Award, Users, Zap } from 'lucide-react';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "Gritfy Technologies - Enterprise AI & Cloud Innovation";
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

  const controls = useAnimation();
  const ref = React.useRef(null);
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
      <Services />
      
      <section className="py-16 md:py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statsVariants}
                initial="hidden"
                animate={controls}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-white">Client-Focused</h4>
                      <p className="text-sm text-gray-400">Tailored solutions for your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-white">Future-Ready</h4>
                      <p className="text-sm text-gray-400">Cutting-edge technologies</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-white">Agile Process</h4>
                      <p className="text-sm text-gray-400">Flexible and responsive</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-white">Expert Team</h4>
                      <p className="text-sm text-gray-400">Skilled professionals</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video overflow-hidden rounded-xl glass-card p-1">
                  <img 
                    src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 glass-card p-4 backdrop-blur-lg">
                  <div className="text-xl font-bold gradient-text mb-1">98%</div>
                  <div className="text-sm text-gray-400">Project Success Rate</div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-card p-4 backdrop-blur-lg">
                  <div className="text-xl font-bold gradient-text mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Expert Support</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default Home;