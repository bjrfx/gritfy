import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Calendar, Users, Building, ChevronRight } from 'lucide-react';
import CTA from '../../components/home/CTA';

// Define the structure for case studies
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  description: string;
  challenge: string;
  solution: string;
  approach: string[];
  results: { title: string; value: string }[];
  testimonial?: { quote: string; author: string; position: string };
  relatedServices: { name: string; path: string }[];
  heroImage: string;
  additionalImages?: string[];
}

// Component for Hero Section
interface HeroSectionProps {
  caseStudy: CaseStudy;
  parentService: { name: string; path: string };
}

const HeroSection: React.FC<HeroSectionProps> = ({ caseStudy, parentService }) => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
        <img 
          src={caseStudy.heroImage} 
          alt={caseStudy.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <Link 
            to={parentService.path}
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {parentService.name}
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            {caseStudy.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            {caseStudy.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6 mb-8"
          >
            <div className="flex items-center">
              <Building className="text-primary-400 mr-2 h-5 w-5" />
              <span className="text-gray-300"><strong>Client:</strong> {caseStudy.client}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="text-primary-400 mr-2 h-5 w-5" />
              <span className="text-gray-300"><strong>Industry:</strong> {caseStudy.industry}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="text-primary-400 mr-2 h-5 w-5" />
              <span className="text-gray-300"><strong>Duration:</strong> {caseStudy.duration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Component for Challenge and Solution section
interface ChallengeSolutionProps {
  caseStudy: CaseStudy;
}

const ChallengeAndSolution: React.FC<ChallengeSolutionProps> = ({ caseStudy }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
      <p className="text-gray-300 mb-8">{caseStudy.challenge}</p>
      
      <h2 className="text-2xl font-bold mb-6">Our Solution</h2>
      <p className="text-gray-300 mb-8">{caseStudy.solution}</p>
    </div>
  );
};

// Component for Approach section
interface ApproachProps {
  approach: string[];
}

const ApproachSection: React.FC<ApproachProps> = ({ approach }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
      <ul className="space-y-4 mb-8">
        {approach.map((step, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-primary-400 mt-1 mr-3 flex-shrink-0" />
            <span className="text-gray-300">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for Additional Images section
interface ImagesGalleryProps {
  title: string;
  images: string[];
}

const ImagesGallery: React.FC<ImagesGalleryProps> = ({ title, images }) => {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {images.map((image, index) => (
        <div key={index} className="rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={`${title} implementation ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// Component for Results section
interface ResultsProps {
  results: { title: string; value: string }[];
}

const ResultsSection: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {results.map((result, index) => (
          <div key={index} className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
            <h3 className="text-lg font-semibold text-primary-400 mb-2">{result.title}</h3>
            <p className="text-white font-medium">{result.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for Testimonial section
interface TestimonialProps {
  testimonial?: { quote: string; author: string; position: string };
}

const TestimonialSection: React.FC<TestimonialProps> = ({ testimonial }) => {
  if (!testimonial) return null;
  
  return (
    <div className="relative p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-lg border border-gray-800 mb-8">
      <div className="absolute top-0 left-10 transform -translate-y-5">
        <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 18H9C9.83333 12.6667 13 9.66667 18.5 9V13.5C15.5 14 14 16 14 19.5V36H0V19.5L1.5 18C1.5 12.6667 3.66667 8.16667 8 4.5C11.6667 1.5 16.1667 0 21.5 0L20 4.5C17 5.16667 15 6.5 14 8.5C13 10.1667 12.6667 13.3333 13 18ZM37.5 18H33C33.8333 12.6667 37 9.66667 42.5 9V13.5C39.5 14 38 16 38 19.5V36H24V19.5L25.5 18C25.5 12.6667 27.6667 8.16667 32 4.5C35.6667 1.5 40.1667 0 45.5 0L44 4.5C41 5.16667 39 6.5 38 8.5C37 10.1667 36.6667 13.3333 37 18Z" fill="rgba(59, 130, 246, 0.2)"/>
        </svg>
      </div>
      <blockquote className="text-gray-300 italic mt-6 relative z-10">
        "{testimonial.quote}"
      </blockquote>
      <div className="mt-4">
        <p className="font-semibold text-white">{testimonial.author}</p>
        <p className="text-primary-400 text-sm">{testimonial.position}</p>
      </div>
    </div>
  );
};

// Component for Project Sidebar
interface SidebarProps {
  caseStudy: CaseStudy;
}

const ProjectSidebar: React.FC<SidebarProps> = ({ caseStudy }) => {
  return (
    <div className="lg:col-span-1">
      <div className="glass-card p-6 mb-8 sticky top-28">
        <h3 className="text-xl font-semibold mb-4">Project Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Client</p>
            <p className="font-medium">{caseStudy.client}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Industry</p>
            <p className="font-medium">{caseStudy.industry}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Project Duration</p>
            <p className="font-medium">{caseStudy.duration}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Team Size</p>
            <p className="font-medium">{caseStudy.teamSize}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Related Services</h3>
          <ul className="space-y-2">
            {caseStudy.relatedServices.map((service, index) => (
              <li key={index}>
                <Link 
                  to={service.path}
                  className="flex items-center text-primary-400 hover:text-primary-300 transition py-1"
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Need a similar solution?</h3>
          <p className="text-gray-300 mb-4">Contact us to discuss how we can help with your transformation journey.</p>
          <Link to="/contact" className="btn btn-primary w-full text-center">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

// Component for Main Content
interface MainContentProps {
  caseStudy: CaseStudy;
}

const MainContent: React.FC<MainContentProps> = ({ caseStudy }) => {
  return (
    <div className="lg:col-span-2">
      <div className="glass-card p-8 mb-12">
        <ChallengeAndSolution caseStudy={caseStudy} />
        <ApproachSection approach={caseStudy.approach} />
        
        {caseStudy.additionalImages && (
          <ImagesGallery title={caseStudy.title} images={caseStudy.additionalImages} />
        )}
      </div>
      
      <div className="glass-card p-8">
        <ResultsSection results={caseStudy.results} />
        <TestimonialSection testimonial={caseStudy.testimonial} />
      </div>
    </div>
  );
};

// Comprehensive case studies database
const caseStudies: Record<string, CaseStudy> = {
  'supply-chain-transformation': {
    id: 'supply-chain-transformation',
    title: 'Supply Chain Transformation',
    client: 'Global Manufacturing Enterprise',
    industry: 'Manufacturing',
    duration: '9 months',
    teamSize: '11 specialists',
    description: 'Implemented a blockchain-based supply chain solution that increased end-to-end traceability by 85% and reduced dispute resolution time by 90%.',
    challenge: 'The client, a global manufacturing enterprise with operations across 12 countries and a complex network of suppliers, distributors, and retailers, was facing significant challenges in their supply chain operations. They struggled with limited visibility across their supply chain network, frequent disputes with suppliers over deliveries and payments, counterfeit components entering their supply chain, and inefficient manual processes for tracking and verification. These issues were resulting in production delays, increased costs, and potential brand damage from quality concerns.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive blockchain-based supply chain solution using Hyperledger Fabric. The platform created an immutable, transparent record of all supply chain transactions and events, providing end-to-end visibility and traceability. We implemented smart contracts to automate payment releases based on verified deliveries, deployed IoT integration for automated tracking and condition monitoring, and created a user-friendly interface for all supply chain participants. The solution included a comprehensive analytics dashboard providing real-time insights into supply chain performance.',
    approach: [
      'Conducted thorough assessment of existing supply chain processes and pain points',
      'Designed scalable blockchain architecture using Hyperledger Fabric for enterprise requirements',
      'Implemented comprehensive digital identity solution for all supply chain participants',
      'Developed smart contracts for key business processes including procurement, shipping, and payments',
      'Created IoT integration framework for real-time tracking and condition monitoring',
      'Implemented RESTful APIs for integration with existing ERP and inventory systems',
      'Deployed advanced analytics and reporting dashboard for supply chain insights',
      'Executed phased rollout strategy across supplier network and distribution channels',
      'Provided comprehensive training and onboarding for all stakeholders'
    ],
    results: [
      { title: 'Supply Chain Visibility', value: '85% increase in end-to-end traceability' },
      { title: 'Dispute Resolution', value: '90% reduction in time to resolve supplier disputes' },
      { title: 'Counterfeit Reduction', value: '100% elimination of counterfeit components' },
      { title: 'Process Efficiency', value: '65% reduction in manual verification processes' },
      { title: 'Working Capital', value: '40% improvement in working capital efficiency' }
    ],
    testimonial: {
      quote: "The blockchain supply chain solution has transformed our operations in ways we hadn't imagined possible. Beyond the impressive metrics around traceability and efficiency, it's given us a level of trust and transparency with our partners that creates real business value. The reduction in disputes alone has saved us millions, and our customers now have complete confidence in our product authenticity and quality control processes.",
      author: "James Richardson",
      position: "Chief Supply Chain Officer, Global Manufacturing Enterprise"
    },
    relatedServices: [
      { name: 'Blockchain Solutions', path: '/services/blockchain' },
      { name: 'IoT Solutions', path: '/services/iot' },
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' }
    ],
    heroImage: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/4483608/pexels-photo-4483608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'ai-driven-demand-forecasting': {
    id: 'ai-driven-demand-forecasting',
    title: 'AI-Driven Demand Forecasting',
    client: 'Global Manufacturing Enterprise',
    industry: 'Manufacturing',
    duration: '7 months',
    teamSize: '9 specialists',
    description: 'Implemented an advanced AI forecasting system that reduced inventory costs by 22% and improved order fulfillment by 18%.',
    challenge: 'The client, a global manufacturing enterprise with operations across 15 countries, was struggling with inventory management challenges that significantly impacted their business performance. They faced excessive inventory costs due to overstocking of certain products, while simultaneously experiencing stockouts of high-demand items, leading to lost sales and customer dissatisfaction. Their existing forecasting system relied heavily on historical averages and manual adjustments, which couldn\'t effectively account for complex market dynamics, seasonal variations, or emerging trends. With over 10,000 SKUs and highly variable demand patterns, they needed a sophisticated forecasting solution that could dramatically improve accuracy.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive AI-driven demand forecasting system using advanced machine learning techniques. We built a solution that incorporated multiple models including LSTM neural networks, XGBoost, and Facebook\'s Prophet algorithm, which were ensemble-weighted based on performance metrics. The system integrated diverse data sources including historical sales, market indicators, weather data, competitor activity, and macroeconomic factors. We deployed the solution on a scalable cloud infrastructure with automated retraining pipelines and a business-friendly dashboard for forecast visualization and what-if scenario planning.',
    approach: [
      'Conducted thorough analysis of existing forecasting methods and identified key improvement areas',
      'Developed data integration pipeline to combine internal and external data sources',
      'Created feature engineering framework to identify and utilize relevant demand signals',
      'Built ensemble of machine learning models optimized for different product categories and time horizons',
      'Implemented automated model evaluation and selection based on forecast accuracy metrics',
      'Developed real-time dashboard for visualization and collaborative forecast adjustments',
      'Created what-if scenario planning capabilities for disruption analysis',
      'Integrated with existing ERP and inventory management systems',
      'Established MLOps pipeline for continuous model monitoring and retraining'
    ],
    results: [
      { title: 'Forecast Accuracy', value: '42% improvement in forecast accuracy (MAPE reduction)' },
      { title: 'Inventory Reduction', value: '22% reduction in overall inventory costs' },
      { title: 'Order Fulfillment', value: '18% improvement in order fulfillment rate' },
      { title: 'Stockout Reduction', value: '65% decrease in stockout events' },
      { title: 'Planning Efficiency', value: '75% reduction in manual forecast adjustments' }
    ],
    testimonial: {
      quote: "The AI forecasting system that Gritfy built has transformed our supply chain operations. We've significantly reduced both excess inventory and stockouts, which has had a direct impact on our bottom line. What impressed us most was their holistic approach—they didn't just deliver advanced AI models, but ensured the solution was fully integrated with our business processes and systems. The intuitive dashboard has made adoption across our planning teams seamless.",
      author: "Robert Chen",
      position: "SVP of Supply Chain, Global Manufacturing Enterprise"
    },
    relatedServices: [
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' },
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
      { name: 'AWS Services', path: '/services/aws' }
    ],
    heroImage: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'intelligent-document-processing': {
    id: 'intelligent-document-processing',
    title: 'Intelligent Document Processing',
    client: 'Financial Services Company',
    industry: 'Financial Services',
    duration: '5 months',
    teamSize: '7 specialists',
    description: 'Developed an AI solution that automated document processing, reducing processing time by 85% and error rates by 94%.',
    challenge: 'The client, a leading financial services company, was dealing with a massive volume of documents including loan applications, financial statements, and compliance forms—processing over 50,000 documents monthly. Their manual document processing workflow was labor-intensive, error-prone, and created significant bottlenecks in their operations. Document processing took an average of 4-5 business days, causing customer dissatisfaction and limiting business scalability. The complex, varied document formats and requirements for data extraction accuracy in financial documents made automation particularly challenging.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive intelligent document processing solution using advanced AI technologies. The system combined computer vision, OCR (Optical Character Recognition), and natural language processing with domain-specific machine learning models to automatically classify documents, extract relevant information, and validate extracted data. We built a configurable workflow engine that routed exceptions for human review while continuously learning from corrections. The solution was integrated with their existing CRM and loan management systems, providing a seamless end-to-end process.',
    approach: [
      'Conducted thorough analysis of document workflows and established processing requirements',
      'Developed document classification system using convolutional neural networks',
      'Created custom OCR pipeline optimized for financial document formats',
      'Implemented named entity recognition and relationship extraction for contextual understanding',
      'Built validation engines using business rules and machine learning for data verification',
      'Developed exception handling workflow with human-in-the-loop review capabilities',
      'Created feedback loop for continuous model improvement from human corrections',
      'Implemented secure API integration with existing enterprise systems',
      'Established comprehensive audit trail for compliance and governance requirements'
    ],
    results: [
      { title: 'Processing Time', value: '85% reduction in document processing time' },
      { title: 'Error Rate', value: '94% reduction in data extraction errors' },
      { title: 'Cost Efficiency', value: '70% decrease in processing costs' },
      { title: 'Throughput', value: '400% increase in document processing capacity' },
      { title: 'Customer Satisfaction', value: '40% improvement in customer satisfaction scores' }
    ],
    testimonial: {
      quote: "The intelligent document processing solution has been transformative for our operations. What used to take days now happens in minutes, with far greater accuracy than our manual process. Gritfy's solution stood out because it wasn't just about the AI technology—they truly understood our business processes and compliance requirements. The system's ability to learn continuously has been particularly valuable, as it gets better with every document processed.",
      author: "Maria Johnson",
      position: "COO, Financial Services Company"
    },
    relatedServices: [
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' },
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6476190/pexels-photo-6476190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'large-scale-aws-migration': {
    id: 'large-scale-aws-migration',
    title: 'Large-Scale AWS Migration',
    client: 'Retail Chain',
    industry: 'Retail',
    duration: '8 months',
    teamSize: '12 specialists',
    description: 'Successfully migrated 200+ applications to AWS, resulting in 40% reduced infrastructure costs and 99.99% uptime.',
    challenge: 'The client, a rapidly growing retail chain with stores across North America, was struggling with an aging on-premises infrastructure that couldn\'t scale to meet their growing needs. They faced frequent outages, maintenance windows that disrupted business operations, and escalating hardware costs. They needed to transition to a more flexible, scalable, and reliable infrastructure while ensuring minimal disruption to their business-critical applications.',
    solution: 'Gritfy Technologies designed and executed a comprehensive AWS migration strategy, including infrastructure assessment, application dependency mapping, cloud architecture design, and phased migration. We implemented a hybrid cloud approach initially to minimize risk and gradually transitioned all systems to AWS while optimizing for cost, performance, and security.',
    approach: [
      'Conducted thorough assessment of existing infrastructure and application dependencies',
      'Developed a detailed migration roadmap with risk mitigation strategies',
      'Designed AWS architecture optimized for the client\'s specific workload requirements',
      'Implemented infrastructure as code using AWS CloudFormation for repeatable deployments',
      'Established automated deployment pipelines for continuous delivery',
      'Created comprehensive monitoring and alerting framework for operational visibility',
      'Executed phased migration with extensive testing at each stage'
    ],
    results: [
      { title: 'Cost Reduction', value: '40% decrease in total infrastructure costs' },
      { title: 'Uptime Improvement', value: 'Achieved 99.99% system availability' },
      { title: 'Deployment Speed', value: '85% faster application deployment' },
      { title: 'Resource Utilization', value: '60% improvement in resource efficiency' },
      { title: 'Disaster Recovery', value: 'Recovery time reduced from days to hours' }
    ],
    testimonial: {
      quote: "Gritfy's AWS migration expertise transformed our IT operations. What impressed us most was their methodical approach and focus on business continuity during the transition. The cost savings and reliability improvements exceeded our expectations.",
      author: "Jane Martinez",
      position: "CTO, Retail Chain"
    },
    relatedServices: [
      { name: 'AWS Services', path: '/services/aws' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'Managed Services', path: '/services/managed-services' }
    ],
    heroImage: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'serverless-e-commerce-platform': {
    id: 'serverless-e-commerce-platform',
    title: 'Serverless E-commerce Platform',
    client: 'Online Marketplace',
    industry: 'E-commerce',
    duration: '6 months',
    teamSize: '8 specialists',
    description: 'Designed a serverless architecture on AWS that handled 10x traffic increases during peak periods with zero downtime.',
    challenge: 'The client, a growing online marketplace, faced significant challenges during seasonal sales events when traffic would surge by 10x or more. Their traditional infrastructure couldn\'t scale quickly enough to handle these spikes, resulting in slow page loads and checkout failures during their most important business periods. Additionally, they were paying for excess capacity during normal business operations to prepare for these peak events.',
    solution: 'Gritfy Technologies architected and implemented a complete serverless solution on AWS, leveraging AWS Lambda, API Gateway, DynamoDB, and S3 for the backend, with CloudFront for content delivery. This event-driven architecture automatically scaled with demand without any manual intervention, allowing the platform to handle massive traffic spikes with consistent performance.',
    approach: [
      'Conducted performance analysis on existing platform to identify scaling bottlenecks',
      'Designed event-driven serverless architecture with AWS Lambda as the computational backbone',
      'Implemented DynamoDB with auto-scaling for database operations',
      'Created multi-region failover capability with Aurora Global Database',
      'Deployed CloudFront CDN with edge optimization for static assets',
      'Built comprehensive monitoring system with CloudWatch and X-Ray',
      'Executed gradual transition from monolithic application to microservices'
    ],
    results: [
      { title: 'Peak Performance', value: 'Successfully handled 10x traffic spikes with consistent response times' },
      { title: 'Availability', value: 'Zero downtime during major sales events' },
      { title: 'Cost Efficiency', value: '65% reduction in infrastructure costs through pay-per-use model' },
      { title: 'Page Load Times', value: '70% improvement in average page load times' },
      { title: 'Developer Productivity', value: '40% increase in deployment frequency' }
    ],
    testimonial: {
      quote: "The serverless architecture Gritfy designed has been transformative for our business. We no longer worry about capacity planning for big sale events, and our costs now align perfectly with our actual usage. The system just scales automatically, letting us focus on our customers instead of infrastructure concerns.",
      author: "Michael Chen",
      position: "Head of Engineering, Online Marketplace"
    },
    relatedServices: [
      { name: 'AWS Services', path: '/services/aws' },
      { name: 'Cloud Services', path: '/services/aws' },
      { name: 'Product Engineering', path: '/services/product-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5716035/pexels-photo-5716035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'enterprise-azure-migration': {
    id: 'enterprise-azure-migration',
    title: 'Enterprise Azure Migration',
    client: 'Financial Services Provider',
    industry: 'Financial Services',
    duration: '10 months',
    teamSize: '14 specialists',
    description: 'Migrated critical applications to Azure with zero downtime, resulting in 45% infrastructure cost savings and improved compliance capabilities.',
    challenge: 'The client, a prominent financial services provider, was operating with legacy infrastructure that created significant compliance challenges and limited their ability to scale operations. They needed to modernize their IT infrastructure while maintaining the highest levels of security and compliance required in the financial sector. With over 50 business-critical applications and strict regulations governing financial data, the migration required meticulous planning and execution.',
    solution: 'Gritfy Technologies designed a comprehensive Azure migration strategy that prioritized security, compliance, and business continuity. We implemented a phased approach that included thorough discovery and assessment, Azure architecture design optimized for financial workloads, and a carefully orchestrated migration plan. The solution leveraged Azure Security Center, Azure Policy, and advanced networking features to create a highly secure, compliant environment.',
    approach: [
      'Conducted comprehensive compliance assessment and gap analysis',
      'Developed detailed cloud governance framework aligned with financial regulations',
      'Designed high-availability architecture with geo-redundant components',
      'Implemented enhanced security controls including Azure Sentinel for SIEM capabilities',
      'Created a custom migration factory approach for application migration',
      'Executed zero-downtime migration using advanced replication techniques',
      'Established continuous compliance monitoring and reporting mechanisms'
    ],
    results: [
      { title: 'Cost Efficiency', value: '45% reduction in infrastructure costs' },
      { title: 'Compliance Posture', value: 'Achieved 100% compliance with financial regulations' },
      { title: 'Performance', value: '60% improvement in application performance' },
      { title: 'Scalability', value: 'Ability to scale resources on-demand within minutes' },
      { title: 'Security Enhancement', value: '85% reduction in security vulnerabilities' }
    ],
    testimonial: {
      quote: "The Azure migration executed by Gritfy was flawless. They understood our strict compliance requirements and delivered a solution that not only met every regulatory standard but significantly improved our operational efficiency and reduced costs. Their expertise in financial services technology was evident throughout the project.",
      author: "Sarah Johnson",
      position: "CIO, Financial Services Provider"
    },
    relatedServices: [
      { name: 'Azure Cloud Services', path: '/services/azure' },
      { name: 'Managed Cloud Services', path: '/services/managed-services' },
      { name: 'Cybersecurity', path: '/services/cybersecurity' }
    ],
    heroImage: 'https://images.pexels.com/photos/7567533/pexels-photo-7567533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'azure-devops-transformation': {
    id: 'azure-devops-transformation',
    title: 'Azure DevOps Transformation',
    client: 'Healthcare Technology Company',
    industry: 'Healthcare Technology',
    duration: '7 months',
    teamSize: '9 specialists',
    description: 'Implemented comprehensive Azure DevOps platform reducing deployment time from days to minutes and increasing release frequency by 300%.',
    challenge: 'The client, a rapidly growing healthcare technology company, was struggling with slow and inconsistent software delivery processes that hindered their ability to respond to market demands. Their legacy development practices resulted in lengthy release cycles (6-8 weeks), frequent production issues, and an inability to quickly implement healthcare compliance changes. Manual testing and deployment processes were error-prone and resource-intensive, causing significant operational inefficiencies.',
    solution: 'Gritfy Technologies implemented a complete Azure DevOps transformation that modernized their development practices and toolchain. We established a comprehensive CI/CD platform leveraging Azure DevOps Services, including Azure Boards, Repos, Pipelines, and Test Plans. The solution included infrastructure as code practices using Azure Resource Manager templates and Terraform, automated testing frameworks, and security-focused DevSecOps practices tailored for healthcare applications.',
    approach: [
      'Conducted thorough assessment of existing development practices and identified bottlenecks',
      'Designed customized Azure DevOps implementation roadmap with phased adoption strategy',
      'Implemented trunk-based development practices with feature branching strategies',
      'Created automated CI/CD pipelines with integrated security and compliance checks',
      'Established automated testing framework including unit, integration, and end-to-end tests',
      'Developed infrastructure as code templates for consistent environment provisioning',
      'Provided comprehensive training and enablement for development and operations teams'
    ],
    results: [
      { title: 'Deployment Speed', value: 'Reduced deployment time from days to minutes' },
      { title: 'Release Frequency', value: 'Increased from monthly to weekly releases (300% improvement)' },
      { title: 'Defect Reduction', value: '65% fewer defects in production' },
      { title: 'Development Efficiency', value: '45% reduction in development effort through automation' },
      { title: 'Compliance Management', value: '90% faster implementation of regulatory changes' }
    ],
    testimonial: {
      quote: "The Azure DevOps transformation has revolutionized our software delivery capabilities. We can now respond to healthcare regulation changes and market opportunities in days rather than months. Gritfy's expertise in both healthcare compliance requirements and Azure DevOps best practices made them the perfect partner for this critical initiative.",
      author: "Dr. David Chen",
      position: "VP of Engineering, Healthcare Technology Company"
    },
    relatedServices: [
      { name: 'Azure Cloud Services', path: '/services/azure' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'CI/CD Consulting', path: '/services/cicd' }
    ],
    heroImage: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/8088449/pexels-photo-8088449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'bigquery-analytics-implementation': {
    id: 'bigquery-analytics-implementation',
    title: 'BigQuery Analytics Implementation',
    client: 'E-Commerce Leader',
    industry: 'E-commerce',
    duration: '5 months',
    teamSize: '7 specialists',
    description: 'Implemented a BigQuery data warehouse processing 5TB of daily data, enabling real-time decision making and increasing conversion rates by 18%.',
    challenge: 'The client, a leading e-commerce platform with millions of daily visitors, was struggling to make timely business decisions due to their fragmented data infrastructure. They had data spread across multiple legacy systems, resulting in delayed reporting, inconsistent analytics, and limited ability to leverage their vast amounts of customer and operational data. Leadership needed faster insights to stay competitive, but the existing infrastructure couldn\'t scale to handle the 5TB of daily data being generated.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive Google Cloud BigQuery data warehouse solution that consolidated data from all sources into a unified analytics platform. We developed automated ETL pipelines using Cloud Dataflow, implemented real-time streaming analytics with Pub/Sub, and created interactive visualization dashboards with Looker. The solution was designed for massive scalability, enabling sub-second query responses even on petabyte-scale datasets.',
    approach: [
      'Conducted thorough assessment of existing data infrastructure and business requirements',
      'Designed cloud-native data architecture with BigQuery as the central data warehouse',
      'Developed data ingestion pipelines using Cloud Dataflow for batch processing',
      'Implemented real-time data streams with Pub/Sub and Dataflow streaming',
      'Created data transformation logic and built analytical data models',
      'Deployed Looker dashboards with role-based access control for business users',
      'Implemented machine learning models using BigQuery ML for predictive analytics'
    ],
    results: [
      { title: 'Decision Speed', value: 'Reduced time-to-insight from days to seconds' },
      { title: 'Conversion Rate', value: '18% increase through real-time personalization' },
      { title: 'Cost Efficiency', value: '52% reduction in total analytics infrastructure costs' },
      { title: 'Query Performance', value: '99% of queries completing in under 10 seconds' },
      { title: 'Data Integration', value: 'Unified 24 previously isolated data sources' }
    ],
    testimonial: {
      quote: "The BigQuery implementation fundamentally transformed how we use data. We went from making decisions based on week-old reports to having real-time insights at our fingertips. The ability to instantly analyze our full customer journey data has given us a competitive edge that directly impacts our bottom line. Gritfy's expertise in Google Cloud technologies exceeded our expectations.",
      author: "Emily Rodriguez",
      position: "Chief Data Officer, E-Commerce Leader"
    },
    relatedServices: [
      { name: 'Google Cloud Services', path: '/services/google-cloud' },
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' }
    ],
    heroImage: 'https://images.pexels.com/photos/7689937/pexels-photo-7689937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'gke-microservices-platform': {
    id: 'gke-microservices-platform',
    title: 'GKE Microservices Platform',
    client: 'SaaS Provider',
    industry: 'Software and Technology',
    duration: '8 months',
    teamSize: '11 specialists',
    description: 'Designed and deployed a scalable microservices architecture on GKE that reduced infrastructure costs by 35% and improved application resilience.',
    challenge: 'The client, a rapidly growing SaaS provider, was experiencing significant scaling challenges with their monolithic application architecture. As their customer base expanded, they faced increasing performance issues, deployment bottlenecks, and reliability concerns. Their development velocity had slowed dramatically, with release cycles taking 3-4 weeks, and the system experienced frequent outages during peak usage periods. They needed a modern, scalable architecture that could support their growth trajectory.',
    solution: 'Gritfy Technologies architected and implemented a complete application modernization using Google Kubernetes Engine (GKE). We decomposed the monolithic application into microservices, containerized each component, and orchestrated them using Kubernetes. The solution included implementing a service mesh with Istio for enhanced observability and traffic management, CI/CD pipelines with Cloud Build, and automated scaling policies. We also implemented advanced monitoring and alerting using Google Cloud Operations suite.',
    approach: [
      'Conducted thorough assessment of the existing application architecture',
      'Designed domain-driven microservices architecture with bounded contexts',
      'Implemented containerization strategy using Docker with optimized images',
      'Deployed GKE clusters across multiple regions with autoscaling capabilities',
      'Established service mesh patterns using Istio for resilience and observability',
      'Created CI/CD pipelines for automated testing and deployment',
      'Implemented comprehensive monitoring, logging, and alerting',
      'Executed phased migration from monolith to microservices with zero downtime'
    ],
    results: [
      { title: 'Infrastructure Cost', value: '35% reduction through efficient resource utilization' },
      { title: 'Release Frequency', value: 'Decreased from weeks to multiple times per day' },
      { title: 'System Resilience', value: '99.99% availability, up from 97%' },
      { title: 'Scalability', value: 'Ability to handle 5x previous peak load without performance degradation' },
      { title: 'Developer Productivity', value: '65% improvement in time-to-market for new features' }
    ],
    testimonial: {
      quote: "The microservices architecture Gritfy implemented on GKE completely transformed our development and operational capabilities. We went from constant firefighting to a stable, scalable platform where we can deploy multiple times a day with confidence. The reduction in infrastructure costs was a welcome bonus, but the real value is in the agility and resilience we've gained.",
      author: "Alex Thompson",
      position: "CTO, SaaS Provider"
    },
    relatedServices: [
      { name: 'Google Cloud Services', path: '/services/google-cloud' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'CI/CD Consulting', path: '/services/cicd' }
    ],
    heroImage: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'devops-transformation': {
    id: 'devops-transformation',
    title: 'DevOps Transformation',
    client: 'Enterprise Software Company',
    industry: 'Enterprise Software',
    duration: '9 months',
    teamSize: '10 specialists',
    description: 'Implemented a comprehensive CI/CD pipeline that reduced deployment time from days to minutes and increased release frequency by 400%.',
    challenge: 'The client, a leading enterprise software company with over 200 developers across multiple teams, was struggling with lengthy, manual deployment processes that took 3-5 days to complete. Each release required extensive coordination between development, QA, and operations teams, with frequent rollbacks due to integration issues. The company\'s monolithic architecture and lack of automated testing resulted in long development cycles, unpredictable release schedules, and significant customer dissatisfaction. They needed a complete overhaul of their software delivery practices to remain competitive in the market.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive DevOps transformation, including a modern CI/CD pipeline tailored to their enterprise software ecosystem. We established a complete delivery platform using GitLab CI/CD, integrated with automated testing frameworks, infrastructure as code using Terraform, and containerized deployments with Docker. The solution included feature flag capabilities for safe production deployments, automated environment provisioning, and comprehensive monitoring and observability tooling.',
    approach: [
      'Conducted thorough assessment of existing development and deployment processes',
      'Designed modular CI/CD architecture with separation of concerns across pipeline stages',
      'Implemented trunk-based development practices with short-lived feature branches',
      'Created automated testing framework with unit, integration and end-to-end tests',
      'Established infrastructure as code practices using Terraform for all environments',
      'Containerized application components with Docker for consistent deployments',
      'Implemented automated security scanning and compliance checks in the pipeline',
      'Developed comprehensive deployment strategies with zero-downtime capabilities',
      'Created observability framework with centralized logging and monitoring'
    ],
    results: [
      { title: 'Deployment Time', value: 'Reduced from 3-5 days to under 30 minutes' },
      { title: 'Release Frequency', value: 'Increased from monthly to multiple times per week (400% improvement)' },
      { title: 'Build Success Rate', value: 'Improved from 62% to 97%' },
      { title: 'Time to Market', value: '65% reduction in time from feature request to production' },
      { title: 'System Reliability', value: 'Reduced production incidents by 78%' }
    ],
    testimonial: {
      quote: "The DevOps transformation delivered by Gritfy has fundamentally changed how we build and ship software. What used to take our teams days of coordination and manual effort now happens automatically in minutes. The impact on our business has been tremendous - we can respond to customer needs faster, ship new features with confidence, and our development teams are more productive and happier. The ROI on this initiative has exceeded our expectations.",
      author: "Jennifer Reeves",
      position: "CTO, Enterprise Software Company"
    },
    relatedServices: [
      { name: 'CI/CD Consulting', path: '/services/cicd' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'kubernetes-migration': {
    id: 'kubernetes-migration',
    title: 'Kubernetes Migration',
    client: 'Media Streaming Platform',
    industry: 'Media and Entertainment',
    duration: '7 months',
    teamSize: '9 specialists',
    description: 'Designed and implemented a containerized architecture with automated CI/CD pipelines, improving scalability and reducing infrastructure costs by 45%.',
    challenge: 'The client, a rapidly growing media streaming platform with 2 million subscribers, was experiencing significant scalability and reliability issues with their legacy infrastructure. During peak streaming times, their monolithic application would frequently crash or experience severe performance degradation, resulting in poor user experience and subscriber churn. Their manual deployment process took up to 48 hours, making it difficult to roll out fixes quickly. The company needed a modern, scalable architecture that could handle unpredictable traffic patterns while allowing for rapid feature development.',
    solution: 'Gritfy Technologies architected and implemented a complete infrastructure modernization using Kubernetes. We decomposed their monolithic application into microservices, containerized each component using Docker, and orchestrated them with Kubernetes. The solution included a comprehensive CI/CD implementation with ArgoCD for GitOps, automated testing at multiple stages of the pipeline, and infrastructure as code using Terraform. We also implemented service mesh capabilities with Istio for enhanced traffic management and observability.',
    approach: [
      'Conducted in-depth assessment of existing application architecture and traffic patterns',
      'Designed microservices architecture with domain-driven design principles',
      'Created containerization strategy with optimized Docker images for each service',
      'Implemented Kubernetes clusters across multiple availability zones for high reliability',
      'Established GitOps workflow with ArgoCD for declarative, version-controlled deployments',
      'Built comprehensive CI/CD pipelines with integrated security scanning',
      'Designed blue-green and canary deployment strategies for zero-downtime updates',
      'Implemented advanced monitoring and alerting with Prometheus and Grafana',
      'Created custom auto-scaling policies based on traffic patterns'
    ],
    results: [
      { title: 'Infrastructure Cost', value: '45% reduction through efficient resource utilization' },
      { title: 'Release Frequency', value: 'Decreased from weeks to multiple times per day' },
      { title: 'System Resilience', value: '99.99% availability, up from 97%' },
      { title: 'Scalability', value: 'Ability to handle 5x previous peak load without performance degradation' },
      { title: 'Developer Productivity', value: '65% improvement in time-to-market for new features' }
    ],
    testimonial: {
      quote: "The Kubernetes migration delivered by Gritfy has been transformative for our platform and business. We can now handle traffic spikes seamlessly during major streaming events, add new features without downtime, and our development teams are deploying multiple times a day instead of every two weeks. The reduction in infrastructure costs was significant, but the biggest impact has been the improved reliability and scalability of our platform.",
      author: "Mark Sanchez",
      position: "VP of Engineering, Media Streaming Platform"
    },
    relatedServices: [
      { name: 'CI/CD Consulting', path: '/services/cicd' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'AWS Services', path: '/services/aws' }
    ],
    heroImage: 'https://images.pexels.com/photos/204495/pexels-photo-204495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'enterprise-data-warehouse-implementation': {
    id: 'enterprise-data-warehouse-implementation',
    title: 'Enterprise Data Warehouse Implementation',
    client: 'Healthcare Provider',
    industry: 'Healthcare',
    duration: '9 months',
    teamSize: '8 specialists',
    description: 'Built a comprehensive data warehouse that unified data from 12 disparate systems, enabling advanced analytics and improving reporting efficiency by 78%.',
    challenge: 'The client, a large healthcare provider with multiple facilities across three states, was struggling with fragmented data across 12 different systems. This fragmentation created significant challenges for reporting, slowed decision-making processes, and prevented holistic patient care analysis. Leadership had minimal visibility into cross-facility operations, and generating comprehensive reports required weeks of manual data extraction and manipulation. Regulatory compliance reporting was labor-intensive and error-prone, creating risk for the organization.',
    solution: 'Gritfy Technologies designed and implemented a modern healthcare-focused enterprise data warehouse using Snowflake, with comprehensive ETL pipelines built on Azure Data Factory. We created a unified data model that standardized information across all systems, implemented HIPAA-compliant security controls at every layer, and deployed a suite of Tableau dashboards for clinical, operational, and financial analytics. The solution included automated compliance reporting, data quality monitoring, and a self-service analytics portal for non-technical users.',
    approach: [
      'Conducted thorough assessment of existing data systems and reporting requirements',
      'Designed healthcare-specific data warehouse architecture with dimensional modeling',
      'Developed robust ETL processes with data validation and quality checks',
      'Implemented comprehensive data governance framework and security controls',
      'Created master data management solution for patient and provider information',
      'Developed clinical, operational, and financial analytics dashboards',
      'Established automated compliance reporting for regulatory requirements',
      'Deployed self-service analytics portal for business users',
      'Provided comprehensive training and knowledge transfer to client teams'
    ],
    results: [
      { title: 'Reporting Efficiency', value: '78% improvement in reporting time' },
      { title: 'Data Integration', value: '12 previously disparate systems unified into a single source of truth' },
      { title: 'Decision Speed', value: '65% reduction in time to generate insights' },
      { title: 'Resource Utilization', value: '45% decrease in IT resource time spent on reporting' },
      { title: 'Compliance', value: '100% automation of mandatory regulatory reporting' }
    ],
    testimonial: {
      quote: "The enterprise data warehouse that Gritfy implemented has transformed how we use data at every level of our organization. What used to take weeks now happens at the click of a button. Our clinicians now have real-time insights that directly impact patient care, and our leadership team can make strategic decisions based on comprehensive, accurate data. This project delivered value beyond what we anticipated and continues to be the foundation of our data strategy.",
      author: "Dr. Jennifer Martinez",
      position: "Chief Medical Information Officer, Healthcare Provider"
    },
    relatedServices: [
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' },
      { name: 'Cloud Services', path: '/services/aws' }
    ],
    heroImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'real-time-analytics-platform': {
    id: 'real-time-analytics-platform',
    title: 'Real-time Analytics Platform',
    client: 'E-commerce Company',
    industry: 'Retail & E-commerce',
    duration: '6 months',
    teamSize: '10 specialists',
    description: 'Developed a real-time analytics platform that processed millions of events daily, providing instant insights into customer behavior and business performance.',
    challenge: 'The client, a rapidly growing e-commerce company with over 3 million monthly active users, was unable to leverage their vast amounts of user interaction data for real-time decision making. Their existing batch-processing analytics system had a 24-hour delay, preventing them from responding quickly to emerging trends, identifying technical issues, or optimizing marketing campaigns in real-time. During flash sales and promotion events, this delay resulted in missed opportunities and suboptimal user experiences that directly impacted revenue.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive real-time analytics platform using Apache Kafka for event streaming, Apache Flink for stream processing, and Elasticsearch for real-time data indexing and search. We deployed a fully scalable cloud infrastructure on AWS, implementing auto-scaling capabilities to handle traffic spikes. The solution included real-time dashboards for marketing, operations, and technical teams, anomaly detection algorithms for instant alerting, and an API layer for integrating analytics with customer-facing applications.',
    approach: [
      'Conducted assessment of existing analytics infrastructure and real-time requirements',
      'Designed event-driven architecture with fault-tolerance and scalability',
      'Implemented Apache Kafka cluster for high-throughput event ingestion',
      'Developed stream processing pipelines using Apache Flink',
      'Created real-time data models and aggregations for business metrics',
      'Implemented advanced anomaly detection using machine learning models',
      'Deployed Elasticsearch clusters for real-time data indexing and analytics',
      'Developed interactive dashboards for different business stakeholders',
      'Established event schema governance and evolution framework'
    ],
    results: [
      { title: 'Data Latency', value: 'Reduced from 24 hours to sub-second analysis' },
      { title: 'Event Processing', value: 'Successfully handling over 25,000 events per second' },
      { title: 'Conversion Uplift', value: '14% increase through real-time personalization' },
      { title: 'Issue Detection', value: '90% faster identification of technical problems' },
      { title: 'Marketing ROI', value: '32% improvement in campaign effectiveness' }
    ],
    testimonial: {
      quote: "The real-time analytics platform that Gritfy built has completely changed how we run our business. We've gone from making decisions based on yesterday's data to responding to what's happening right now. During our recent flash sale, we were able to adjust promotions on the fly based on real-time performance, resulting in our most successful event ever. The platform has become mission-critical for every department in our company.",
      author: "Marcus Johnson",
      position: "CTO, E-commerce Company"
    },
    relatedServices: [
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
      { name: 'Cloud Services', path: '/services/aws' },
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' }
    ],
    heroImage: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'enterprise-saas-platform-development': {
    id: 'enterprise-saas-platform-development',
    title: 'Enterprise SaaS Platform Development',
    client: 'B2B Technology Provider',
    industry: 'B2B Technology',
    duration: '14 months',
    teamSize: '16 specialists',
    description: 'Engineered a comprehensive SaaS platform from concept to launch, achieving 50,000+ users within six months and 99.9% system reliability.',
    challenge: 'The client, a leading B2B technology provider, needed to transform their legacy on-premises software into a modern, cloud-based SaaS platform. Their existing software required complex installation processes, had limited scalability, and offered poor user experience, resulting in high customer churn and limited market growth. Additionally, the monolithic architecture made it difficult to innovate or add new features quickly. They needed a complete reimagining of their product to stay competitive in an increasingly cloud-focused market.',
    solution: 'Gritfy Technologies designed and developed a comprehensive enterprise SaaS platform using a microservices architecture deployed on AWS. We implemented a multi-tenant architecture with robust data isolation, built a React-based frontend with an intuitive user experience, and established a CI/CD pipeline for continuous deployment. The solution included comprehensive analytics, role-based access control, enterprise-grade security, and a flexible API ecosystem for third-party integrations.',
    approach: [
      'Conducted thorough analysis of existing product and user requirements',
      'Designed scalable microservices architecture with domain-driven design principles',
      'Implemented multi-tenant data model with strong security isolation',
      'Built modern React frontend with responsive design and accessibility compliance',
      'Developed comprehensive API layer with GraphQL for efficient data fetching',
      'Established robust CI/CD pipeline with automated testing and blue-green deployments',
      'Implemented infrastructure as code using Terraform for repeatable deployments',
      'Created comprehensive monitoring and alerting system with detailed observability',
      'Designed and implemented a seamless data migration path from legacy systems'
    ],
    results: [
      { title: 'User Acquisition', value: 'Gained 50,000+ users within six months of launch' },
      { title: 'System Reliability', value: 'Achieved 99.9% uptime with robust failover capabilities' },
      { title: 'Feature Velocity', value: '8x improvement in time-to-market for new features' },
      { title: 'Customer Satisfaction', value: '92% customer satisfaction rating, up from 67%' },
      { title: 'Operating Costs', value: '45% reduction in infrastructure and operational costs' }
    ],
    testimonial: {
      quote: "The SaaS platform that Gritfy engineered has transformed our business model and market position. What impressed us most was their ability to balance technical excellence with business requirements. The platform has not only improved our operational efficiency but has opened new revenue streams through its API ecosystem. The architecture they designed has proven its value repeatedly as we've scaled to tens of thousands of users without performance degradation.",
      author: "Robert Chen",
      position: "Chief Product Officer, B2B Technology Provider"
    },
    relatedServices: [
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Cloud Services', path: '/services/aws' },
      { name: 'DevOps Services', path: '/services/devops' }
    ],
    heroImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'mobile-application-modernization': {
    id: 'mobile-application-modernization',
    title: 'Mobile Application Modernization',
    client: 'Financial Services Company',
    industry: 'Financial Services',
    duration: '8 months',
    teamSize: '10 specialists',
    description: 'Redesigned and rebuilt a legacy mobile application using modern architecture, resulting in 35% faster performance and 92% user satisfaction.',
    challenge: 'The client, an established financial services company, was struggling with an outdated mobile application that had become increasingly difficult to maintain and enhance. The legacy codebase had accumulated significant technical debt over years of ad-hoc development, resulting in slow performance, frequent crashes, and poor user experience. Customer ratings had dropped to 2.3 stars, and user acquisition costs were rising due to high abandonment rates. The company needed a complete modernization of their mobile application while preserving existing functionality and ensuring a seamless transition for their 500,000+ users.',
    solution: 'Gritfy Technologies led a comprehensive mobile application modernization initiative, rebuilding the application from the ground up using React Native for cross-platform efficiency. We implemented a clean architecture pattern with clear separation of concerns, robust state management using Redux, and offline-first capabilities for seamless user experience even in poor connectivity. The solution included biometric authentication, enhanced security features, real-time transaction monitoring, and an intuitive, accessible UI designed for diverse user demographics.',
    approach: [
      'Conducted thorough analysis of existing application, user feedback, and performance metrics',
      'Created comprehensive user journey maps and wireframes for improved user experience',
      'Designed scalable architecture with component-based development methodology',
      'Implemented React Native framework with TypeScript for type safety and developer productivity',
      'Developed custom UI component library aligned with brand guidelines and accessibility standards',
      'Created efficient API integration layer with caching strategies and retry mechanisms',
      'Implemented comprehensive automated testing suite including unit, integration and E2E tests',
      'Executed phased rollout strategy to minimize user disruption and gather feedback',
      'Established continuous integration and delivery pipeline for rapid iteration'
    ],
    results: [
      { title: 'Performance Improvement', value: '35% faster performance across all core user journeys' },
      { title: 'App Rating', value: 'Increased from 2.3 to 4.7 stars on app stores' },
      { title: 'User Satisfaction', value: '92% positive user feedback post-launch' },
      { title: 'Abandonment Rate', value: '60% reduction in onboarding abandonment' },
      { title: 'Maintenance Efficiency', value: '75% reduction in bug reports and maintenance overhead' }
    ],
    testimonial: {
      quote: "The mobile application modernization project has exceeded our expectations in every way. What was once our biggest customer pain point has become our strongest competitive advantage. Gritfy not only delivered a technically excellent solution but truly understood our business and customer needs. The phased rollout approach they recommended ensured we could transition our large user base without disruption, and the results speak for themselves in our dramatically improved ratings and customer engagement metrics.",
      author: "Lisa Martinez",
      position: "Chief Digital Officer, Financial Services Company"
    },
    relatedServices: [
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'UX Engineering', path: '/services/ux-engineering' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'test-automation-transformation': {
    id: 'test-automation-transformation',
    title: 'Test Automation Transformation',
    client: 'Enterprise Software Provider',
    industry: 'Enterprise Software',
    duration: '6 months',
    teamSize: '8 specialists',
    description: 'Implemented a comprehensive test automation framework that reduced regression testing time by 85% and increased test coverage by 60%.',
    challenge: 'The client, a leading enterprise software provider serving Fortune 500 companies, was struggling with lengthy manual testing cycles that were becoming unsustainable as their product portfolio grew. Each release required 3-4 weeks of manual regression testing, causing significant delays in their release schedule and creating a competitive disadvantage. Test coverage was inconsistent, quality issues were frequently discovered in production, and the testing team was overwhelmed with repetitive manual test execution.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive test automation strategy that transformed their quality engineering practice. We built a scalable, maintainable automation framework using Selenium, Cypress, and custom tools, implemented behavior-driven development practices with Cucumber, and integrated automated testing into their CI/CD pipeline. The solution included UI, API, and integration test automation, along with detailed reporting and analytics on test coverage and quality metrics.',
    approach: [
      'Conducted thorough assessment of existing testing processes and automation readiness',
      'Designed modular, scalable test automation architecture with separation of concerns',
      'Implemented page object model and other design patterns for maintainable automation code',
      'Created behavior-driven development framework with Cucumber for business-readable test scenarios',
      'Developed comprehensive UI automation using Selenium and Cypress for different application components',
      'Implemented API test automation with RestAssured and contract testing with Pact',
      'Established continuous testing integration within Jenkins CI/CD pipeline',
      'Created centralized reporting and analytics dashboard for test results and coverage',
      'Provided knowledge transfer and training to enable client team ownership'
    ],
    results: [
      { title: 'Testing Efficiency', value: '85% reduction in regression testing time' },
      { title: 'Test Coverage', value: '60% increase in functional test coverage' },
      { title: 'Release Velocity', value: 'Release cycle reduced from 6 weeks to 2 weeks' },
      { title: 'Defect Leakage', value: '75% reduction in production defects' },
      { title: 'ROI', value: '320% return on investment within first year' }
    ],
    testimonial: {
      quote: "The test automation framework that Gritfy built for us has been a game-changer. What used to take our team weeks now completes in hours, with far greater consistency and coverage. Beyond the technical implementation, they helped us transform our entire approach to quality engineering. Our development teams now build with testability in mind, and automated tests are a natural part of our definition of done. The impact on our release velocity and product quality has exceeded our expectations.",
      author: "Sarah Johnson",
      position: "VP of Engineering, Enterprise Software Provider"
    },
    relatedServices: [
      { name: 'Quality Engineering', path: '/services/quality-engineering' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'CI/CD Consulting', path: '/services/cicd' }
    ],
    heroImage: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'performance-engineering-implementation': {
    id: 'performance-engineering-implementation',
    title: 'Performance Engineering Implementation',
    client: 'Financial Services Platform',
    industry: 'Financial Services',
    duration: '4 months',
    teamSize: '6 specialists',
    description: 'Designed and executed performance testing strategy that identified critical bottlenecks, improving application response time by 70% and supporting 3x user load.',
    challenge: 'The client, a rapidly growing financial services platform, was experiencing significant performance issues as their user base expanded. Their platform was suffering from slow response times, timeout errors, and occasional system crashes during peak usage periods. As they prepared for a major product launch that would bring an anticipated 3x increase in concurrent users, they needed to ensure their platform could handle the increased load without compromising user experience or stability.',
    solution: 'Gritfy Technologies implemented a comprehensive performance engineering solution that included both testing and optimization strategies. We established a performance testing framework using JMeter and Gatling, created realistic load models based on current and projected usage patterns, and developed a continuous performance testing pipeline integrated with their CI/CD process. The solution included detailed performance monitoring with Grafana and Prometheus, as well as code-level and infrastructure optimizations.',
    approach: [
      'Conducted baseline performance assessment to identify current system limitations',
      'Developed detailed performance test scenarios mimicking real user behavior patterns',
      'Created scalable test infrastructure to generate enterprise-level load',
      'Implemented continuous performance testing integrated with CI/CD pipeline',
      'Established comprehensive performance monitoring with real-time dashboards',
      'Conducted database query optimization and implemented efficient indexing',
      'Optimized API endpoints and implemented caching strategies',
      'Redesigned critical transaction flows for improved efficiency',
      'Implemented horizontal scaling capabilities for high-traffic components'
    ],
    results: [
      { title: 'Response Time', value: '70% improvement in average application response time' },
      { title: 'Load Capacity', value: 'Successfully validated support for 3x the previous concurrent user load' },
      { title: 'Resource Utilization', value: '45% reduction in server resource consumption under load' },
      { title: 'Transaction Throughput', value: '150% increase in transactions per second capability' },
      { title: 'Error Rate', value: '95% reduction in timeout errors during peak usage' }
    ],
    testimonial: {
      quote: "The performance engineering work by Gritfy transformed our platform's capabilities. Their methodical approach not only fixed our immediate scaling challenges but established a foundation for continued growth. What impressed us most was their ability to translate technical performance improvements into business metrics we could track. Our platform now handles significantly more users with better response times, directly improving our conversion rates and customer satisfaction scores.",
      author: "Michael Richardson",
      position: "CTO, Financial Services Platform"
    },
    relatedServices: [
      { name: 'Quality Engineering', path: '/services/quality-engineering' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'AWS Services', path: '/services/aws' }
    ],
    heroImage: 'https://images.pexels.com/photos/8092507/pexels-photo-8092507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/7567473/pexels-photo-7567473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7567619/pexels-photo-7567619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'enterprise-portal-redesign': {
    id: 'enterprise-portal-redesign',
    title: 'Enterprise Portal Redesign',
    client: 'Global Manufacturing Company',
    industry: 'Manufacturing',
    duration: '5 months',
    teamSize: '8 specialists',
    description: 'Redesigned and modernized a complex enterprise portal, improving user efficiency by 45% and reducing training time by 60%.',
    challenge: 'The client, a leading global manufacturing company with operations in 20+ countries, was struggling with an outdated enterprise portal that served as the primary interface for over 5,000 employees across various departments. The legacy system had evolved over a decade with inconsistent design patterns, complex navigation, and outdated UI components, resulting in significant usability problems. Employees required extensive training to use the portal effectively, productivity was hampered by confusing workflows, and the system couldn\'t adapt to modern mobile usage patterns. As manufacturing operations became increasingly digital, these user experience issues were creating a major bottleneck in operational efficiency.',
    solution: 'Gritfy Technologies led a comprehensive UX redesign of the enterprise portal, creating a modern, intuitive interface that dramatically improved usability while maintaining access to all critical functionality. We implemented a user-centered design process that began with extensive user research across different departments and roles. Based on these insights, we developed a unified design system with consistent components and patterns, simplified the information architecture, and created streamlined user journeys for key tasks. The redesigned portal featured responsive design for multi-device usage, personalized dashboards based on user roles, and an intuitive navigation system that reduced clicks to complete common tasks.',
    approach: [
      'Conducted extensive user research including interviews, surveys, and contextual observation with employees across departments',
      'Created detailed user personas and journey maps to identify pain points and opportunities',
      'Developed comprehensive information architecture to simplify content organization and access',
      'Designed unified component library and design system for visual and interaction consistency',
      'Created interactive prototypes for iterative user testing and validation',
      'Implemented responsive design for seamless use across desktop and mobile devices',
      'Developed personalization framework to tailor experiences based on user roles',
      'Created simplified workflows that reduced steps for common tasks by 60%',
      'Provided comprehensive design documentation and transition support for development teams'
    ],
    results: [
      { title: 'User Efficiency', value: '45% improvement in task completion time' },
      { title: 'Training Requirements', value: '60% reduction in new user training time' },
      { title: 'User Satisfaction', value: '87% positive feedback from previously frustrated users' },
      { title: 'Mobile Adoption', value: '350% increase in mobile portal usage' },
      { title: 'Error Reduction', value: '70% decrease in user errors and support tickets' }
    ],
    testimonial: {
      quote: "The portal redesign has transformed how our global teams interact with critical business systems. What was previously a friction point in our digital operations is now a productivity multiplier. Gritfy's team took the time to truly understand the varied needs of our diverse user base and delivered a solution that works beautifully for everyone from executives to factory floor operators. The impact on our operational efficiency has exceeded our expectations.",
      author: "Richard Martinez",
      position: "Global IT Director, Global Manufacturing Company"
    },
    relatedServices: [
      { name: 'UX Engineering', path: '/services/ux-engineering' },
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'mobile-app-ux-transformation': {
    id: 'mobile-app-ux-transformation',
    title: 'Mobile App UX Transformation',
    client: 'Retail Banking Institution',
    industry: 'Financial Services',
    duration: '6 months',
    teamSize: '9 specialists',
    description: 'Transformed a poorly-rated banking app into an industry-leading mobile experience, increasing user engagement by 70% and app store rating from 2.1 to 4.7 stars.',
    challenge: 'The client, a well-established retail banking institution with over 2 million customers, was struggling with an outdated mobile banking application that had poor user reviews (2.1/5 stars average) and high abandonment rates. The existing app suffered from confusing navigation, inconsistent design patterns, slow performance, and limited functionality compared to competitors. User feedback consistently highlighted frustration with basic banking tasks taking too many steps, frequent crashes, and an overall dated appearance. As mobile banking became the primary channel for customer interactions, this poor digital experience was directly impacting customer satisfaction and retention, with younger demographics particularly affected.',
    solution: 'Gritfy Technologies executed a complete UX transformation of the mobile banking application, reimagining the entire customer experience while ensuring security and compliance requirements were met. We implemented a comprehensive user-centered design process that began with in-depth research to understand customer pain points and priorities. Based on these insights, we designed an intuitive interface with streamlined user journeys for common banking tasks, implemented modern design patterns and microinteractions for enhanced engagement, and created a design system that ensured consistency across all features. The solution included personalized experiences based on user behavior, accessibility features for diverse users, and performance optimizations that dramatically improved app responsiveness.',
    approach: [
      'Conducted comprehensive user research including interviews, surveys, and usability testing of existing app',
      'Analyzed competitor apps and industry best practices for mobile banking experiences',
      'Created detailed user personas and journey maps to identify pain points and opportunities',
      'Developed simplified information architecture that prioritized most-used features',
      'Designed intuitive navigation patterns that reduced steps to complete common tasks',
      'Created responsive, component-based design system for visual and functional consistency',
      'Implemented sophisticated microinteractions and transitions for enhanced user engagement',
      'Designed personalized dashboard with customizable widgets based on user preferences',
      'Conducted iterative usability testing throughout the design process to validate improvements'
    ],
    results: [
      { title: 'App Store Rating', value: 'Increased from 2.1 to 4.7 stars' },
      { title: 'User Engagement', value: '70% increase in daily active users' },
      { title: 'Session Duration', value: '45% increase in average session length' },
      { title: 'Task Completion', value: '60% reduction in time to complete common banking tasks' },
      { title: 'Customer Acquisition', value: '35% increase in new account signups via mobile' }
    ],
    testimonial: {
      quote: "The transformed mobile banking experience has completely changed our customers' perception of our digital capabilities. Gritfy's team didn't just make the app look better – they fundamentally reimagined how our customers interact with our services on mobile devices. The metrics speak for themselves, but what's most impressive is the qualitative feedback from customers who now view our app as a reason to stay with our bank rather than a reason to leave. This project has been one of our most successful digital investments.",
      author: "Jennifer Williams",
      position: "Head of Digital Banking, Retail Banking Institution"
    },
    relatedServices: [
      { name: 'UX Engineering', path: '/services/ux-engineering' },
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Mobile Development', path: '/services/mobile-development' }
    ],
    heroImage: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6347720/pexels-photo-6347720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'kubernetes-migration-project': {
    id: 'kubernetes-migration-project',
    title: 'Kubernetes Migration Project',
    client: 'E-commerce Platform',
    industry: 'E-commerce',
    duration: '5 months',
    teamSize: '7 specialists',
    description: 'Designed and implemented a containerized architecture with automated CI/CD pipelines, improving scalability and reducing infrastructure costs by 45%.',
    challenge: 'The client, a rapidly growing e-commerce platform with over 3 million monthly visitors, was struggling with an inflexible monolithic architecture that couldn\'t efficiently handle traffic spikes during sales events. Their deployment process was manual and error-prone, often resulting in downtime during critical business periods. As customer acquisition accelerated, the platform suffered from increasing performance issues, and the development team was unable to implement new features quickly due to the tightly coupled architecture.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive Kubernetes-based containerization strategy that decomposed the monolithic application into microservices. We established a GitOps workflow using ArgoCD, built automated CI/CD pipelines with integrated security scanning, and implemented infrastructure as code using Terraform. The solution included advanced monitoring and observability using Prometheus and Grafana, along with custom auto-scaling policies to handle traffic fluctuations efficiently.',
    approach: [
      'Conducted thorough assessment of the existing architecture and identified service boundaries',
      'Designed microservices architecture with domain-driven design principles',
      'Containerized application components using Docker with optimized images',
      'Implemented Kubernetes clusters with high-availability configuration across multiple zones',
      'Established GitOps workflow for declarative, version-controlled deployments',
      'Built comprehensive CI/CD pipelines with integrated security scanning',
      'Implemented blue-green and canary deployment strategies for zero-downtime updates',
      'Created custom auto-scaling policies based on historical traffic patterns',
      'Deployed comprehensive monitoring and alerting with Prometheus and Grafana'
    ],
    results: [
      { title: 'Infrastructure Cost', value: '45% reduction in cloud infrastructure spending' },
      { title: 'Deployment Frequency', value: 'Increased from weekly to multiple times per day' },
      { title: 'System Uptime', value: 'Improved to 99.99%, even during major sales events' },
      { title: 'Scalability', value: 'Successfully handles 5x traffic spikes with no performance degradation' },
      { title: 'Developer Productivity', value: '60% improvement in feature delivery time' }
    ],
    testimonial: {
      quote: "The Kubernetes migration has completely transformed our platform's ability to scale and adapt. What used to be stressful sales events with all-hands-on-deck to manage traffic are now business as usual. Our developers can deploy multiple times a day with confidence, and the infrastructure automatically scales to meet demand. The reduction in cloud costs was an unexpected bonus that has significantly improved our unit economics.",
      author: "Sarah Johnson",
      position: "CTO, E-commerce Platform"
    },
    relatedServices: [
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'CI/CD Consulting', path: '/services/cicd' },
      { name: 'Cloud Services', path: '/services/aws' }
    ],
    heroImage: 'https://images.pexels.com/photos/204495/pexels-photo-204495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'devops-transformation-journey': {
    id: 'devops-transformation-journey',
    title: 'DevOps Transformation Journey',
    client: 'Healthcare Technology Provider',
    industry: 'Healthcare Technology',
    duration: '8 months',
    teamSize: '9 specialists',
    description: 'Implemented a comprehensive DevOps transformation that reduced release cycles from months to days and improved system reliability by 99.99%.',
    challenge: 'The client, a leading healthcare technology provider serving major hospital systems, was struggling with lengthy release cycles that took 2-3 months, making it difficult to respond to market needs and regulatory changes. Their manual deployment processes were error-prone and frequently resulted in production issues, causing critical healthcare systems to experience downtime. Development and operations teams worked in silos, with limited collaboration and frequent conflicts during releases, further slowing down the delivery pipeline.',
    solution: 'Gritfy Technologies designed and implemented a complete DevOps transformation strategy tailored for healthcare technology requirements. We established a comprehensive CI/CD platform with Jenkins, integrated automated testing frameworks, implemented infrastructure as code using Terraform, and containerized applications with Docker and Kubernetes. The solution included comprehensive security and compliance automation to meet HIPAA and other healthcare regulatory requirements.',
    approach: [
      'Conducted in-depth assessment of existing delivery processes and identified bottlenecks',
      'Developed a phased transformation roadmap with clear milestones and success metrics',
      'Established cross-functional DevOps teams with representatives from development, QA, and operations',
      'Implemented trunk-based development practices with feature toggling capabilities',
      'Built comprehensive automated testing framework with unit, integration, and end-to-end tests',
      'Deployed containerized infrastructure using Kubernetes with high-availability configuration',
      'Created automated security and compliance testing integrated into the CI/CD pipeline',
      'Implemented robust monitoring and observability solution with ELK stack and Prometheus',
      'Provided extensive training and mentoring to build internal DevOps capabilities'
    ],
    results: [
      { title: 'Release Cycle', value: 'Reduced from 2-3 months to 3-5 days (95% improvement)' },
      { title: 'System Reliability', value: 'Increased to 99.99% uptime (from 98.5%)' },
      { title: 'Deployment Frequency', value: '40x increase in deployment frequency' },
      { title: 'Regulatory Response', value: '80% faster implementation of compliance requirements' },
      { title: 'Incident Resolution', value: '70% reduction in mean time to resolve incidents' }
    ],
    testimonial: {
      quote: "The DevOps transformation with Gritfy has fundamentally changed how we build and deliver software. We've gone from quarterly releases that often caused outages to deploying multiple times a week with exceptional reliability. Most importantly, we can now rapidly respond to healthcare regulatory changes and customer needs while maintaining the highest levels of compliance and security. This has been a game-changer for our competitive position in the healthcare technology space.",
      author: "Michael Chen",
      position: "VP of Engineering, Healthcare Technology Provider"
    },
    relatedServices: [
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'CI/CD Consulting', path: '/services/cicd' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'engineering-capability-center': {
    id: 'engineering-capability-center',
    title: 'Engineering Capability Center',
    client: 'Global Software Organization',
    industry: 'Software and Technology',
    duration: '10 months',
    teamSize: '15 specialists',
    description: 'Established a 200-person global capability center that reduced operational costs by 40% while accelerating product development cycles by 35%.',
    challenge: 'The client, a rapidly growing software organization with headquarters in North America, was facing significant challenges in scaling their engineering operations to meet increasing market demand. They were struggling with high development costs in their primary location, a competitive local talent market making it difficult to hire specialists, and delays in project delivery due to resource constraints. As their product portfolio expanded, they needed a sustainable strategy to scale their engineering capacity without compromising quality or agility.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive global capability center strategy. We established a 200-person engineering hub in a strategic location with a strong technical talent pool and favorable economics. The solution included designing the organizational structure, creating knowledge transfer and training frameworks, implementing collaborative workflows between distributed teams, and building a scalable technical infrastructure with robust security measures. We developed specialized recruiting strategies for the local market and implemented continuous improvement processes to ensure ongoing optimization.',
    approach: [
      'Conducted thorough assessment of client needs, existing processes, and strategic objectives',
      'Performed location analysis and selection based on talent availability, cost structure, and operational risks',
      'Designed organizational structure with clear roles, responsibilities, and reporting relationships',
      'Created comprehensive knowledge transfer methodology and documentation standards',
      'Implemented agile development practices adapted for distributed teams',
      'Established robust communication protocols and collaboration tools',
      'Developed specialized recruitment strategy and employer brand for the local market',
      'Built technical infrastructure with enterprise-grade security and compliance measures',
      'Created performance management framework with specific KPIs for the capability center',
      'Implemented continuous improvement methodology for ongoing optimization'
    ],
    results: [
      { title: 'Cost Efficiency', value: '40% reduction in operational costs compared to primary location' },
      { title: 'Development Speed', value: '35% acceleration in product development cycles' },
      { title: 'Team Growth', value: 'Successfully scaled to 200 engineers within 10 months' },
      { title: 'Quality Metrics', value: 'Maintained equal or better quality KPIs compared to headquarters' },
      { title: 'Business Impact', value: '28% overall increase in product delivery capacity' }
    ],
    testimonial: {
      quote: "The global capability center that Gritfy helped us establish has been transformative for our business. It's not just about the cost savings, which have been substantial, but about our ability to access specialized talent and scale our operations in ways that weren't possible before. What impressed us most was Gritfy's understanding that this wasn't simply about outsourcing work, but about creating a true extension of our engineering culture in a new location. The knowledge transfer framework they implemented ensured a seamless integration, and the center now contributes some of our most innovative product features.",
      author: "Jennifer Harris",
      position: "CTO, Global Software Organization"
    },
    relatedServices: [
      { name: 'Global Capability Center', path: '/services/global-capability' },
      { name: 'DevOps Services', path: '/services/devops' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'digital-innovation-hub': {
    id: 'digital-innovation-hub',
    title: 'Digital Innovation Hub',
    client: 'Financial Services Provider',
    industry: 'Financial Services',
    duration: '9 months',
    teamSize: '12 specialists',
    description: 'Created a specialized innovation center focused on emerging technologies, delivering 12 new digital products in the first year of operation.',
    challenge: 'The client, a well-established financial services provider with a legacy technology infrastructure, was struggling to keep pace with fintech competitors who were rapidly disrupting the market with innovative digital products. Their traditional development processes were too slow and risk-averse, making it difficult to experiment with emerging technologies or respond quickly to changing customer expectations. Leadership recognized the need for digital transformation but lacked the organizational structure and expertise to drive innovation at scale.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive Digital Innovation Hub—a dedicated center of excellence focused on rapid exploration and development of emerging technologies. We established a cross-functional team structure, implemented agile innovation methodologies, and created a technology sandbox environment for rapid prototyping. The solution included governance frameworks for transitioning successful innovations to production, as well as metrics and KPIs specifically designed to measure innovation outcomes.',
    approach: [
      'Conducted in-depth assessment of innovation readiness and digital transformation objectives',
      'Designed organizational structure optimized for rapid experimentation and innovation',
      'Established cross-functional teams combining business, design, and technology expertise',
      'Implemented agile innovation methodologies and design thinking practices',
      'Created technology sandbox environment for rapid prototyping and concept validation',
      'Developed funding and governance models for innovation initiatives',
      'Established metrics framework focused on innovation outcomes and business value',
      'Created knowledge sharing and training programs for innovation capabilities',
      'Implemented portfolio management approach for balancing innovation initiatives',
      'Designed transition frameworks for moving from innovation to production implementation'
    ],
    results: [
      { title: 'New Digital Products', value: '12 new products launched in first year of operation' },
      { title: 'Time to Market', value: '75% reduction in concept-to-market timeline' },
      { title: 'Customer Acquisition', value: '38% increase in digital customer acquisition' },
      { title: 'Revenue Impact', value: '$15M in incremental revenue from new digital offerings' },
      { title: 'Innovation Culture', value: '82% employee engagement in innovation initiatives' }
    ],
    testimonial: {
      quote: "The Digital Innovation Hub has transformed our organization's ability to compete in an increasingly digital financial services market. What was previously a multi-year process to bring new ideas to market now happens in weeks or months. Gritfy's approach was particularly effective because they didn't just focus on the technology—they helped us build the right teams, processes, and culture to sustain innovation long-term. The hub has become the engine driving our digital transformation strategy.",
      author: "Sarah Johnson",
      position: "Chief Innovation Officer, Financial Services Provider"
    },
    relatedServices: [
      { name: 'Digital Transformation', path: '/services/digital-transformation' },
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' }
    ],
    heroImage: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'ai-powered-customer-insights': {
    id: 'ai-powered-customer-insights',
    title: 'AI-Powered Customer Insights',
    client: 'Telecom Enterprise',
    industry: 'Telecommunications',
    duration: '6 months',
    teamSize: '8 specialists',
    description: 'Built a predictive analytics platform that increased customer retention by 25% and reduced churn by identifying at-risk customers before they departed.',
    challenge: 'The client, a major telecom provider with 5+ million subscribers, was experiencing a concerning trend of increasing customer churn rates despite competitive service offerings. Their existing analytics tools provided only historical reporting with no predictive capabilities, making it difficult to identify at-risk customers before they cancelled services. With customer acquisition costs 5-7 times higher than retention costs, reducing churn was critical to profitability, but the company lacked the technical capabilities to implement advanced AI/ML solutions internally.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive AI-powered customer insights platform using advanced machine learning techniques to predict customer churn before it happened. We integrated data from multiple sources including customer service interactions, billing history, service usage patterns, and network performance metrics. The solution featured a real-time predictive analytics engine, personalized retention action recommendations, an intuitive dashboard for customer success teams, and automated triggers for proactive retention campaigns.',
    approach: [
      'Conducted thorough data discovery and assessment across all customer touchpoints',
      'Designed a unified data architecture to integrate multiple disparate data sources',
      'Implemented data cleansing and feature engineering for optimal model performance',
      'Built a suite of machine learning models including gradient boosting and neural networks',
      'Created an explainable AI framework to provide actionable insights from predictions',
      'Developed a real-time scoring mechanism for continuous customer risk assessment',
      'Integrated with existing CRM systems for seamless workflow integration',
      'Established automated retention campaign triggers based on risk thresholds',
      'Implemented continuous model retraining pipeline to adapt to changing patterns'
    ],
    results: [
      { title: 'Churn Reduction', value: '25% decrease in monthly customer churn rate' },
      { title: 'Prediction Accuracy', value: '87% accuracy in identifying at-risk customers' },
      { title: 'Revenue Impact', value: '$4.2M in preserved annual recurring revenue' },
      { title: 'ROI', value: '420% return on investment within 12 months' },
      { title: 'Retention Efficiency', value: '35% less spent on retention offers through targeted interventions' }
    ],
    testimonial: {
      quote: "The AI customer insights platform has transformed our approach to customer retention. Instead of reacting to cancellations, we're now proactively engaging customers with personalized retention strategies before they consider leaving. The precision of the predictions and the actionable nature of the recommendations have made this our most valuable customer success tool. The impact on our churn metrics and bottom line has been remarkable.",
      author: "Jennifer Wilson",
      position: "Chief Customer Officer, Telecom Enterprise"
    },
    relatedServices: [
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' },
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
      { name: 'Customer Experience Solutions', path: '/services/ux-engineering' }
    ],
    heroImage: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'enterprise-cloud-management': {
    id: 'enterprise-cloud-management',
    title: 'Enterprise Cloud Management',
    client: 'Global Retail Corporation',
    industry: 'Retail',
    duration: '12 months',
    teamSize: '15 specialists',
    description: 'Provided 24/7 managed services for multi-cloud infrastructure, improving uptime to 99.99% and reducing operational costs by 32%.',
    challenge: 'The client, a global retail corporation with operations in 24 countries and over 3,500 stores, was facing significant challenges managing their complex multi-cloud environment. Their IT operations team was overwhelmed dealing with frequent outages, performance bottlenecks, and escalating cloud costs across AWS, Azure, and Google Cloud platforms. They lacked consistent monitoring, automated remediation capabilities, and a unified management approach, resulting in an average monthly downtime of 6 hours and cloud spending exceeding budget by 45%. Additionally, their security posture varied across cloud providers, creating compliance risks.',
    solution: 'Gritfy Technologies implemented a comprehensive managed cloud services solution that provided 24/7 monitoring, management, and optimization across all cloud environments. We deployed a unified cloud management platform with centralized monitoring and automated incident response capabilities. The solution included comprehensive cost optimization through resource right-sizing, automated scaling, and reserved instance management. We implemented standardized security controls and compliance frameworks across all cloud platforms, with continuous security monitoring and automated remediation for common issues.',
    approach: [
      'Conducted thorough assessment of existing cloud infrastructure and identified critical pain points',
      'Implemented unified monitoring platform with custom dashboards for different stakeholder groups',
      'Deployed automated incident detection and response workflows using AIOps capabilities',
      'Established standardized security posture across all cloud platforms with centralized policy management',
      'Created comprehensive cost management framework with tagging strategies and budget controls',
      'Implemented infrastructure as code practices for consistent environment deployments',
      'Developed disaster recovery and business continuity solutions with regular testing',
      'Provided dedicated support team with 24/7 coverage and escalation procedures'
    ],
    results: [
      { title: 'Improved Uptime', value: 'Increased from 98.5% to 99.99% (less than 1 hour of downtime per year)' },
      { title: 'Cost Reduction', value: '32% decrease in total cloud expenditure' },
      { title: 'Incident Resolution', value: '78% faster incident resolution time' },
      { title: 'Security Posture', value: '100% compliance with industry security standards' },
      { title: 'Resource Utilization', value: '45% improvement in overall cloud resource efficiency' }
    ],
    testimonial: {
      quote: "The managed cloud services provided by Gritfy Technologies have transformed our IT operations. We've gone from constantly firefighting issues to a proactive, efficient cloud management approach. The cost savings exceeded our expectations, but the real value has been in the improved reliability and performance of our critical retail systems. Their team has become an extension of our organization, providing expertise and support that would have been impossible to build in-house.",
      author: "Sarah Johnson",
      position: "CIO, Global Retail Corporation"
    },
    relatedServices: [
      { name: 'Managed Cloud Services', path: '/services/managed-services' },
      { name: 'AWS Services', path: '/services/aws' },
      { name: 'Azure Cloud Services', path: '/services/azure' }
    ],
    heroImage: 'https://images.pexels.com/photos/1181616/pexels-photo-1181616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
  'cloud-security-overhaul': {
    id: 'cloud-security-overhaul',
    title: 'Cloud Security Overhaul',
    client: 'Financial Technology Startup',
    industry: 'Financial Services',
    duration: '7 months',
    teamSize: '9 specialists',
    description: 'Implemented comprehensive security controls and monitoring across cloud environments, achieving regulatory compliance and preventing multiple potential breaches.',
    challenge: 'The client, a rapidly growing fintech startup handling sensitive financial data for over 500,000 customers, was facing critical security vulnerabilities in their cloud infrastructure. As they scaled, they had accumulated technical debt in their security practices, resulting in inconsistent controls, limited visibility into potential threats, and significant compliance gaps with financial regulations including PCI DSS and GDPR. They had recently experienced a minor security incident and were concerned about more serious breaches as they expanded their customer base and entered new markets with stricter regulatory requirements.',
    solution: 'Gritfy Technologies designed and implemented a comprehensive cloud security overhaul that addressed all aspects of their security posture. We developed a defense-in-depth security architecture with multiple layers of protection across their cloud environment. The solution included advanced threat detection using AI-powered security information and event management (SIEM), comprehensive identity and access management controls, and automated compliance monitoring and reporting. We also implemented DevSecOps practices to ensure security was embedded throughout their development lifecycle.',
    approach: [
      'Conducted thorough security assessment including vulnerability scanning and penetration testing',
      'Designed comprehensive cloud security architecture aligned with financial industry requirements',
      'Implemented zero-trust security model with strong identity and access management controls',
      'Deployed advanced threat detection and response capabilities with 24/7 security monitoring',
      'Established data protection framework including encryption, masking, and secure data handling',
      'Created automated compliance monitoring and reporting for PCI DSS, GDPR, and other regulations',
      'Implemented DevSecOps practices including security-as-code and automated security testing',
      'Provided comprehensive security training for development and operations teams'
    ],
    results: [
      { title: 'Security Posture', value: 'Remediated 100% of critical and high vulnerabilities' },
      { title: 'Regulatory Compliance', value: 'Achieved full compliance with PCI DSS, GDPR, and SOC 2' },
      { title: 'Threat Detection', value: '95% reduction in mean time to detect security events' },
      { title: 'Response Time', value: '87% improvement in security incident response time' },
      { title: 'Development Security', value: '79% reduction in security issues in new code' }
    ],
    testimonial: {
      quote: "The cloud security overhaul performed by Gritfy Technologies has been transformative for our business. Not only did they significantly improve our security posture, but they also helped us achieve the regulatory compliance necessary to expand into new markets. Their approach seamlessly integrated security into our development practices without slowing us down. The peace of mind knowing our customers' financial data is protected is invaluable, and it's become a competitive advantage as we pitch to enterprise clients.",
      author: "Michael Chen",
      position: "Chief Technology Officer, Financial Technology Startup"
    },
    relatedServices: [
      { name: 'Managed Cloud Services', path: '/services/managed-services' },
      { name: 'Cybersecurity', path: '/services/cybersecurity' },
      { name: 'DevOps Services', path: '/services/devops' }
    ],
    heroImage: 'https://images.pexels.com/photos/5380651/pexels-photo-5380651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    additionalImages: [
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ]
  },
};

const CaseStudyDetail: React.FC = () => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const navigate = useNavigate();
  const [parentService, setParentService] = useState({
    name: 'Services',
    path: '/services'
  });

  useEffect(() => {
    // Set page title
    if (caseStudy) {
      document.title = `${caseStudy.title} - Gritfy Technologies`;
      
      // Determine parent service for the "Back to" link
      if (caseStudyId) {
        if (caseStudyId.includes('aws')) {
          setParentService({ name: 'AWS Services', path: '/services/aws' });
        } else if (caseStudyId.includes('azure')) {
          setParentService({ name: 'Azure Cloud Services', path: '/services/azure' });
        } else if (caseStudyId.includes('google')) {
          setParentService({ name: 'Google Cloud Services', path: '/services/google-cloud' });
        } else if (caseStudyId.includes('blockchain')) {
          setParentService({ name: 'Blockchain Solutions', path: '/services/blockchain' });
        } else if (caseStudyId.includes('iot')) {
          setParentService({ name: 'IoT Solutions', path: '/services/iot' });
        } else if (caseStudyId.includes('rcm')) {
          setParentService({ name: 'Revenue Cycle Management', path: '/services/rcm' });
        } else if (caseStudyId === 'devops-transformation' || caseStudyId === 'kubernetes-migration') {
          setParentService({ name: 'CI/CD Consulting', path: '/services/cicd' });
        } else if (caseStudyId === 'enterprise-data-warehouse-implementation' || caseStudyId === 'real-time-analytics-platform') {
          setParentService({ name: 'Data Analytics & BI', path: '/services/data-analytics' });
        } else if (caseStudyId === 'enterprise-saas-platform-development' || caseStudyId === 'mobile-application-modernization') {
          setParentService({ name: 'Product Engineering', path: '/services/product-engineering' });
        } else {
          // Default fallback
          setParentService({ name: 'Services', path: '/services' });
        }
      }
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [caseStudy, caseStudyId]);

  useEffect(() => {
    if (caseStudyId && caseStudies[caseStudyId]) {
      setCaseStudy(caseStudies[caseStudyId]);
    } else {
      // If case study doesn't exist, redirect to a 404 page
      navigate('/not-found', { replace: true });
    }
  }, [caseStudyId, navigate]);

  if (!caseStudy) {
    return null; // Loading state or handled by redirect
  }

  return (
    <>
      <HeroSection caseStudy={caseStudy} parentService={parentService} />
      
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <MainContent caseStudy={caseStudy} />
            <ProjectSidebar caseStudy={caseStudy} />
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default CaseStudyDetail;