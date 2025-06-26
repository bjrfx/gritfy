import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CTA from '../components/home/CTA';
import { Users, Award, Target, Clock } from 'lucide-react';

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About Gritfy Technologies";
  }, []);

  const values = [
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Client Partnership",
      description: "We foster long-term relationships built on trust, transparency, and mutual success."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "Excellence",
      description: "We are committed to delivering exceptional quality and exceeding expectations in everything we do."
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: "Innovation",
      description: "We continuously explore new technologies and approaches to drive meaningful business impact."
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-400" />,
      title: "Reliability",
      description: "We deliver on our promises with consistency, integrity, and unwavering commitment."
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "With over 15 years of experience in technology leadership, Sarah leads Gritfy Technologies's strategic vision."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Michael brings exceptional technical expertise from his background at leading tech companies."
    },
    {
      name: "Priya Patel",
      role: "Head of AI",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Priya is a recognized AI expert with multiple patents and research publications in the field."
    },
    {
      name: "David Wilson",
      role: "Cloud Solutions Director",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "David has architected cloud solutions for Fortune 500 companies across diverse industries."
    },
  ];

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Gritfy Technologies</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              Building the future through innovative technology solutions for forward-thinking enterprises.
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center lg:space-x-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 mb-12 lg:mb-0"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden glass-card p-2">
                  <img 
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Gritfy Technologies Team" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 glass-card p-6 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">Est. 2014</div>
                  <div className="text-sm text-gray-400">A decade of excellence</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-6">
                Founded in 2014, Gritfy Technologies Solutions began with a simple yet powerful vision: to help businesses 
                harness the transformative power of technology. What started as a small team of passionate 
                technologists has grown into a global enterprise solutions provider trusted by companies across 
                industries.
              </p>
              <p className="text-gray-300 mb-6">
                Our journey has been defined by continuous innovation, deep expertise, and an unwavering commitment 
                to our clients' success. As technology evolves, so do we—constantly expanding our capabilities to 
                meet the changing needs of the digital landscape.
              </p>
              <p className="text-gray-300">
                Today, Gritfy Technologies stands at the forefront of AI development, cloud transformation, and digital 
                innovation, helping enterprises navigate complex technological challenges and unlock new 
                opportunities for growth.
              </p>
            </motion.div>
          </div>
          
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="max-w-2xl mx-auto text-gray-400">
                The principles that guide everything we do at Gritfy Technologies
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="glass-card p-6 text-center hover-glow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-24">
            {/* Leadership Team Section - Commented Out
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="max-w-2xl mx-auto text-gray-400">
                Meet the experts leading Gritfy Technologies's innovation and growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="glass-card p-5 hover-glow"
                >
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full aspect-square object-cover object-center"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-primary-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
            */}
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default About;