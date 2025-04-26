import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Brain, Cloud, Database, Code, Smartphone } from 'lucide-react';
import CTA from '../../components/home/CTA';

// Define service categories and their respective icons
const serviceCategories: Record<string, {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  benefits: { title: string; description: string }[];
  caseStudies: { title: string; client: string; description: string; image: string }[];
}> = {
  'enterprise-ai': {
    title: 'Enterprise AI Development',
    description: 'Cutting-edge AI solutions tailored for enterprise needs, from predictive analytics to intelligent automation systems.',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-blue-500 to-blue-700',
    features: [
      'Custom AI model development and deployment',
      'Machine learning operations (MLOps) implementation',
      'Natural language processing solutions',
      'Computer vision applications',
      'Predictive analytics and forecasting systems',
      'AI-powered process automation'
    ],
    benefits: [
      { 
        title: 'Increased Operational Efficiency', 
        description: 'Automate routine tasks and optimize business processes with intelligent AI systems.'
      },
      { 
        title: 'Data-Driven Decision Making', 
        description: 'Transform raw data into actionable insights with advanced predictive analytics.'
      },
      { 
        title: 'Enhanced Customer Experiences', 
        description: 'Create personalized user experiences with AI-powered recommendation systems.'
      },
      { 
        title: 'Risk Mitigation', 
        description: 'Identify potential issues before they occur with predictive maintenance and risk analysis.'
      }
    ],
    caseStudies: [
      {
        title: 'AI-Driven Demand Forecasting',
        client: 'Global Manufacturing Enterprise',
        description: 'Implemented an advanced AI forecasting system that reduced inventory costs by 22% and improved order fulfillment by 18%.',
        image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Intelligent Document Processing',
        client: 'Financial Services Company',
        description: 'Developed an AI solution that automated document processing, reducing processing time by 85% and error rates by 94%.',
        image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'aws': {
    title: 'AWS Services',
    description: 'Comprehensive AWS cloud solutions including infrastructure design, migration, optimization, and managed services.',
    icon: <Cloud className="w-12 h-12" />,
    color: 'from-orange-500 to-orange-700',
    features: [
      'AWS infrastructure design and implementation',
      'Cloud migration and modernization',
      'Serverless architecture development',
      'DevOps and CI/CD pipeline automation',
      'AWS cost optimization',
      'Managed AWS services and support'
    ],
    benefits: [
      { 
        title: 'Scalable Infrastructure', 
        description: 'Build cloud infrastructure that scales seamlessly with your business needs.'
      },
      { 
        title: 'Cost Optimization', 
        description: 'Reduce infrastructure costs with optimized AWS resource utilization and management.'
      },
      { 
        title: 'Enhanced Security', 
        description: 'Implement robust security measures with AWS best practices and compliance frameworks.'
      },
      { 
        title: 'Business Continuity', 
        description: 'Ensure business continuity with reliable disaster recovery and backup solutions.'
      }
    ],
    caseStudies: [
      {
        title: 'Large-Scale AWS Migration',
        client: 'Retail Chain',
        description: 'Successfully migrated 200+ applications to AWS, resulting in 40% reduced infrastructure costs and 99.99% uptime.',
        image: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Serverless E-commerce Platform',
        client: 'Online Marketplace',
        description: 'Designed a serverless architecture on AWS that handled 10x traffic increases during peak periods with zero downtime.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'data-analytics': {
    title: 'Data Analytics & BI',
    description: 'Transform raw data into actionable insights with our advanced analytics and business intelligence solutions.',
    icon: <Database className="w-12 h-12" />,
    color: 'from-green-500 to-green-700',
    features: [
      'Data warehouse design and implementation',
      'Business intelligence dashboard development',
      'Real-time analytics solutions',
      'Big data processing and analysis',
      'Data quality management',
      'Predictive analytics models'
    ],
    benefits: [
      { 
        title: 'Strategic Decision Support', 
        description: 'Make informed business decisions with comprehensive data insights and visualizations.'
      },
      { 
        title: 'Operational Visibility', 
        description: 'Gain real-time visibility into business operations and performance metrics.'
      },
      { 
        title: 'Revenue Optimization', 
        description: 'Identify revenue opportunities and optimize pricing strategies with data-driven insights.'
      },
      { 
        title: 'Customer Understanding', 
        description: 'Develop deeper understanding of customer behavior and preferences through advanced analytics.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise Data Warehouse Implementation',
        client: 'Healthcare Provider',
        description: 'Built a comprehensive data warehouse that unified data from 12 disparate systems, enabling advanced analytics and improving reporting efficiency by 78%.',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Real-time Analytics Platform',
        client: 'E-commerce Company',
        description: 'Developed a real-time analytics platform that processed millions of events daily, providing instant insights into customer behavior and business performance.',
        image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'product-engineering': {
    title: 'Product Engineering',
    description: 'End-to-end product development services with quality engineering, UX excellence, and DevOps integration.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-purple-500 to-purple-700',
    features: [
      'Custom software development',
      'Product strategy and roadmap planning',
      'API design and development',
      'Microservices architecture',
      'UI/UX design and implementation',
      'Quality assurance and testing'
    ],
    benefits: [
      { 
        title: 'Faster Time-to-Market', 
        description: 'Accelerate product development with agile methodologies and efficient engineering practices.'
      },
      { 
        title: 'Scalable Architecture', 
        description: 'Build products on scalable, maintainable architecture that grows with your business.'
      },
      { 
        title: 'Quality Excellence', 
        description: 'Ensure product reliability through comprehensive quality engineering and automated testing.'
      },
      { 
        title: 'User-Centered Design', 
        description: 'Create intuitive, engaging user experiences that drive adoption and satisfaction.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise SaaS Platform Development',
        client: 'B2B Technology Provider',
        description: 'Engineered a comprehensive SaaS platform from concept to launch, achieving 50,000+ users within six months and 99.9% system reliability.',
        image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Mobile Application Modernization',
        client: 'Financial Services Company',
        description: 'Redesigned and rebuilt a legacy mobile application using modern architecture, resulting in 35% faster performance and 92% user satisfaction.',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity',
    description: 'Comprehensive cybersecurity solutions to protect your enterprise data, systems, and applications from evolving threats.',
    icon: <Smartphone className="w-12 h-12" />,
    color: 'from-red-500 to-red-700',
    features: [
      'Security assessment and testing',
      'Zero-trust architecture implementation',
      'Cloud security solutions',
      'Identity and access management',
      'Security monitoring and incident response',
      'Compliance and regulatory security'
    ],
    benefits: [
      { 
        title: 'Threat Protection', 
        description: 'Protect your organization from advanced cyber threats with proactive security measures.'
      },
      { 
        title: 'Regulatory Compliance', 
        description: 'Ensure compliance with industry regulations and security standards like GDPR, HIPAA, and PCI DSS.'
      },
      { 
        title: 'Business Continuity', 
        description: 'Minimize downtime and data loss with robust security incident response capabilities.'
      },
      { 
        title: 'Customer Trust', 
        description: 'Build customer confidence with demonstrated commitment to data protection and security.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise Security Transformation',
        client: 'Healthcare Organization',
        description: 'Implemented a comprehensive security program that achieved HIPAA compliance and reduced security incidents by 75% while enabling secure digital transformation.',
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Zero-Trust Security Implementation',
        client: 'Financial Institution',
        description: 'Designed and deployed a zero-trust security architecture that strengthened protection for sensitive financial data while improving user experience.',
        image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  }
};

// Default service information for fallback
const defaultService = {
  title: 'Enterprise Services',
  description: 'Comprehensive technology solutions to drive innovation and business growth.',
  icon: <Code className="w-12 h-12" />,
  color: 'from-blue-500 to-blue-700',
  features: [
    'Custom solution development',
    'Technology consulting',
    'Implementation and integration services',
    'Ongoing support and maintenance'
  ],
  benefits: [
    { 
      title: 'Business Growth', 
      description: 'Accelerate growth with technology-enabled solutions.' 
    },
    { 
      title: 'Operational Excellence', 
      description: 'Improve efficiency and reduce operational costs.' 
    },
    { 
      title: 'Innovation', 
      description: 'Stay ahead with cutting-edge technology solutions.' 
    },
    { 
      title: 'Customer Experience', 
      description: 'Enhance customer satisfaction with improved services.' 
    }
  ],
  caseStudies: [
    {
      title: 'Digital Transformation',
      client: 'Enterprise Client',
      description: 'Helped a leading company transform their digital infrastructure and processes.',
      image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Technology Modernization',
      client: 'Industry Leader',
      description: 'Modernized legacy systems to improve performance and enable new capabilities.',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
};

const ServiceOverview: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // Get service information or fall back to default
  const service = serviceCategories[category || ''] || defaultService;
  
  useEffect(() => {
    document.title = `${service.title} - Gritfy Technologies`;
  }, [service.title]);

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full bg-gradient-to-r ${service.color} opacity-90`}>
                {service.icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.title}
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              {service.description}
            </p>
          </motion.div>
          
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
              <p className="text-gray-300 mb-8">
                At Gritfy Technologies, we deliver exceptional {service.title} through a proven, client-focused methodology that ensures 
                tailored solutions aligned with your business objectives. Our approach combines technical expertise, 
                industry knowledge, and agile delivery to drive measurable results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Process</h3>
                  <ol className="space-y-5">
                    <li className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">1</div>
                      <h4 className="font-medium text-white mb-1">Discovery & Strategy</h4>
                      <p className="text-sm text-gray-400">We analyze your requirements and develop a strategic roadmap aligned with your business goals.</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">2</div>
                      <h4 className="font-medium text-white mb-1">Design & Development</h4>
                      <p className="text-sm text-gray-400">Our expert team designs and builds solutions using best practices and cutting-edge technologies.</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">3</div>
                      <h4 className="font-medium text-white mb-1">Implementation & Optimization</h4>
                      <p className="text-sm text-gray-400">We deploy your solution and continuously optimize for performance and business impact.</p>
                    </li>
                    <li className="relative pl-10">
                      <div className="absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 font-bold text-sm">4</div>
                      <h4 className="font-medium text-white mb-1">Support & Evolution</h4>
                      <p className="text-sm text-gray-400">Our ongoing support ensures your solution evolves with your changing business needs.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-center">
              Key Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center hover-glow"
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-10 text-center">
              Success Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass-card overflow-hidden hover-glow group"
                >
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-1">{caseStudy.title}</h3>
                        <p className="text-primary-400">{caseStudy.client}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-0">
                    <p className="text-gray-300 mb-4">
                      {caseStudy.description}
                    </p>
                    <Link 
                      to={`/case-studies/${caseStudy.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
                    >
                      Read case study <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              Connect with our experts to discuss how our {service.title} can help 
              your organization achieve its business objectives.
            </p>
            <Link to="/contact" className="btn btn-primary inline-flex items-center">
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default ServiceOverview;