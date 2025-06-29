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
  caseStudies: { title: string; client: string; description: string; image: string; id?: string }[];
}> = {
  'enterprise-ai': {
    title: 'Enterprise AI Development',
    description: 'AI-powered solutions for enterprises: predictive analytics, intelligent automation, NLP, computer vision, and custom ML models to drive business value.',
    icon: <Brain className="w-12 h-12" />,
    color: 'from-blue-500 to-blue-700',
    features: [
      'Custom AI/ML model development',
      'Predictive analytics and forecasting',
      'Natural language processing (NLP)',
      'Computer vision and image analysis',
      'AI-powered automation',
      'MLOps and AI lifecycle management'
    ],
    benefits: [
      { title: 'Smarter Decisions', description: 'Leverage data-driven insights for faster, more accurate business decisions.' },
      { title: 'Process Automation', description: 'Automate repetitive tasks and workflows to boost productivity.' },
      { title: 'Personalization', description: 'Deliver tailored customer experiences using AI-driven recommendations.' },
      { title: 'Competitive Edge', description: 'Innovate faster and outperform competitors with advanced AI.' }
    ],
    caseStudies: [
      {
        title: 'AI-Powered Customer Insights',
        client: 'Telecom Enterprise',
        description: 'Built a predictive analytics platform that increased customer retention by 25% and reduced churn.',
        image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'ai-powered-customer-insights'
      },
      {
        title: 'Intelligent Document Processing',
        client: 'Financial Services Company',
        description: 'Automated document processing using NLP, reducing manual effort by 80% and improving accuracy.',
        image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'intelligent-document-processing'
      }
    ]
  },
  'cloud': {
    title: 'Cloud Services',
    description: 'Unified cloud solutions across AWS, Azure, and Google Cloud, including migration, modernization, DevOps, and managed services for scalable, secure, and cost-effective operations.',
    icon: <Cloud className="w-12 h-12" />, 
    color: 'from-blue-400 to-blue-700',
    features: [
      'Multi-cloud strategy and consulting',
      'Cloud migration and modernization',
      'Serverless and containerized architectures',
      'DevOps, CI/CD, and automation',
      'Cloud security and compliance',
      'Managed cloud operations and support'
    ],
    benefits: [
      { title: 'Business Agility', description: 'Rapidly scale and adapt to market changes with flexible cloud infrastructure.' },
      { title: 'Cost Optimization', description: 'Reduce IT spend with pay-as-you-go models and resource optimization.' },
      { title: 'Security & Compliance', description: 'Protect data and meet regulatory requirements with robust cloud security.' },
      { title: 'Innovation Enablement', description: 'Leverage cloud-native services to accelerate digital transformation.' }
    ],
    caseStudies: [
      {
        title: 'Global Cloud Modernization',
        client: 'International Retailer',
        description: 'Migrated legacy systems to a multi-cloud environment, reducing downtime by 90% and IT costs by 35%.',
        image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'DevOps Cloud Automation',
        client: 'Fintech Startup',
        description: 'Implemented CI/CD and infrastructure automation, enabling 10x faster deployments and zero-downtime releases.',
        image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'digital': {
    title: 'Digital Transformation',
    description: 'Comprehensive digital transformation services including blockchain, IoT, cybersecurity, and legacy modernization to future-proof your business.',
    icon: <Smartphone className="w-12 h-12" />, 
    color: 'from-pink-500 to-purple-700',
    features: [
      'Blockchain strategy and implementation',
      'IoT platform development and integration',
      'Enterprise cybersecurity solutions',
      'Process automation and digital workflows',
      'Legacy system modernization',
      'Change management and digital adoption'
    ],
    benefits: [
      { title: 'Future-Readiness', description: 'Adopt emerging technologies to stay ahead of the competition.' },
      { title: 'Operational Efficiency', description: 'Automate and optimize business processes for maximum productivity.' },
      { title: 'Risk Reduction', description: 'Mitigate digital risks with robust cybersecurity and compliance.' },
      { title: 'Customer Experience', description: 'Deliver seamless, innovative experiences across digital channels.' }
    ],
    caseStudies: [
      {
        title: 'IoT-Driven Manufacturing',
        client: 'Industrial Manufacturer',
        description: 'Deployed IoT sensors and analytics, improving equipment uptime by 40% and reducing maintenance costs.',
        image: 'https://images.pexels.com/photos/3912412/pexels-photo-3912412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Blockchain Supply Chain',
        client: 'Logistics Provider',
        description: 'Implemented a blockchain-based supply chain, increasing transparency and reducing fraud by 80%.',
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
  'azure': {
    title: 'Azure Cloud Services',
    description: 'Comprehensive Microsoft Azure solutions for enterprises seeking secure, scalable, and innovative cloud infrastructure.',
    icon: <Cloud className="w-12 h-12" />,
    color: 'from-blue-500 to-blue-700',
    features: [
      'Azure infrastructure architecture and deployment',
      'Azure DevOps implementation',
      'Azure Kubernetes Service (AKS) orchestration',
      'Azure Functions and serverless solutions',
      'Azure database services optimization',
      'Azure AI and ML implementation'
    ],
    benefits: [
      { 
        title: 'Enterprise Integration', 
        description: 'Seamless integration with Microsoft enterprise tools and services for unified business operations.'
      },
      { 
        title: 'Hybrid Capabilities', 
        description: 'Build robust hybrid cloud environments connecting on-premises infrastructure with Azure cloud services.'
      },
      { 
        title: 'Advanced Security', 
        description: 'Implement Microsoft\'s comprehensive security features including Azure Sentinel and Azure Security Center.'
      },
      { 
        title: 'Rapid Innovation', 
        description: 'Accelerate digital transformation using Azure\'s extensive PaaS offerings and developer tools.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise Azure Migration',
        client: 'Financial Services Provider',
        description: 'Migrated critical applications to Azure with zero downtime, resulting in 45% infrastructure cost savings and improved compliance capabilities.',
        image: 'https://images.pexels.com/photos/7567533/pexels-photo-7567533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Azure DevOps Transformation',
        client: 'Healthcare Technology Company',
        description: 'Implemented comprehensive Azure DevOps platform reducing deployment time from days to minutes and increasing release frequency by 300%.',
        image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'google-cloud': {
    title: 'Google Cloud Services',
    description: 'Expert Google Cloud Platform solutions featuring advanced analytics, AI capabilities, and scalable infrastructure for modern enterprises.',
    icon: <Cloud className="w-12 h-12" />,
    color: 'from-green-500 to-teal-700',
    features: [
      'Google Cloud infrastructure design and implementation',
      'GKE (Google Kubernetes Engine) orchestration',
      'BigQuery and data analytics solutions',
      'Google Cloud AI and machine learning services',
      'Anthos multi-cloud management',
      'Google Cloud security and compliance'
    ],
    benefits: [
      { 
        title: 'Data-Driven Insights', 
        description: 'Leverage Google\'s powerful analytics and AI tools to extract actionable insights from your data.'
      },
      { 
        title: 'Global Network', 
        description: 'Access Google\'s high-performance global network for unparalleled speed and reliability.'
      },
      { 
        title: 'Innovative ML/AI', 
        description: 'Implement cutting-edge machine learning and AI solutions with Google\'s specialized tools and APIs.'
      },
      { 
        title: 'Sustainable Infrastructure', 
        description: 'Build on carbon-neutral infrastructure with industry-leading sustainability commitments.'
      }
    ],
    caseStudies: [
      {
        title: 'BigQuery Analytics Implementation',
        client: 'E-Commerce Leader',
        description: 'Implemented a BigQuery data warehouse processing 5TB of daily data, enabling real-time decision making and increasing conversion rates by 18%.',
        image: 'https://images.pexels.com/photos/7689937/pexels-photo-7689937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'GKE Microservices Platform',
        client: 'SaaS Provider',
        description: 'Designed and deployed a scalable microservices architecture on GKE that reduced infrastructure costs by 35% and improved application resilience.',
        image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'managed-services': {
    title: 'Managed Cloud Services',
    description: 'End-to-end cloud management services that optimize performance, reduce costs, and ensure reliability for your business-critical applications.',
    icon: <Cloud className="w-12 h-12" />,
    color: 'from-indigo-500 to-indigo-700',
    features: [
      '24/7 infrastructure monitoring and management',
      'Proactive issue resolution and performance optimization',
      'Security management and compliance monitoring',
      'Cost optimization and resource scaling',
      'Backup and disaster recovery services',
      'Cloud strategy consulting and roadmap development'
    ],
    benefits: [
      { 
        title: 'Operational Efficiency', 
        description: 'Free internal resources to focus on core business initiatives while we handle cloud operations.'
      },
      { 
        title: 'Cost Control', 
        description: 'Reduce cloud expenditure through expert monitoring and optimization of cloud resources.'
      },
      { 
        title: 'Enhanced Security', 
        description: 'Implement comprehensive security protocols with continuous monitoring and threat mitigation.'
      },
      { 
        title: 'Business Continuity', 
        description: 'Minimize downtime with proactive monitoring, rapid incident response, and disaster recovery planning.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise Cloud Management',
        client: 'Global Retail Corporation',
        description: 'Provided 24/7 managed services for multi-cloud infrastructure, improving uptime to 99.99% and reducing operational costs by 32%.',
        image: 'https://images.pexels.com/photos/1181616/pexels-photo-1181616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'enterprise-cloud-management'
      },
      {
        title: 'Cloud Security Overhaul',
        client: 'Financial Technology Startup',
        description: 'Implemented comprehensive security controls and monitoring across cloud environments, achieving regulatory compliance and preventing multiple potential breaches.',
        image: 'https://images.pexels.com/photos/5380651/pexels-photo-5380651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'cloud-security-overhaul'
      }
    ]
  },
  'cicd': {
    title: 'CI/CD Consulting',
    description: 'Expert DevOps consulting focused on implementing efficient continuous integration and continuous delivery pipelines for accelerated software delivery.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-amber-500 to-amber-700',
    features: [
      'CI/CD pipeline design and implementation',
      'DevOps transformation strategy',
      'Infrastructure as Code (IaC) implementation',
      'Containerization and Kubernetes orchestration',
      'Automated testing integration',
      'DevSecOps practices implementation'
    ],
    benefits: [
      { 
        title: 'Faster Delivery Cycles', 
        description: 'Accelerate software delivery with automated build, test, and deployment pipelines.'
      },
      { 
        title: 'Quality Improvement', 
        description: 'Enhance software quality with automated testing and consistent deployment processes.'
      },
      { 
        title: 'Developer Productivity', 
        description: 'Increase developer productivity by eliminating manual processes and reducing cycle time.'
      },
      { 
        title: 'Risk Reduction', 
        description: 'Mitigate deployment risks through consistent processes and automated rollback capabilities.'
      }
    ],
    caseStudies: [
      {
        title: 'DevOps Transformation',
        client: 'Enterprise Software Company',
        description: 'Implemented a comprehensive CI/CD pipeline that reduced deployment time from days to minutes and increased release frequency by 400%.',
        image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Kubernetes Migration',
        client: 'Media Streaming Platform',
        description: 'Designed and implemented a containerized architecture with automated CI/CD pipelines, improving scalability and reducing infrastructure costs by 45%.',
        image: 'https://images.pexels.com/photos/204495/pexels-photo-204495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'data-analytics': {
    title: 'Data Analytics & BI',
    description: 'Unlock actionable insights from your data with advanced analytics, business intelligence dashboards, and real-time reporting.',
    icon: <Database className="w-12 h-12" />,
    color: 'from-green-500 to-green-700',
    features: [
      'Data warehouse and lakehouse solutions',
      'Business intelligence dashboarding',
      'Real-time and big data analytics',
      'Data quality and governance',
      'Predictive and prescriptive analytics',
      'Self-service analytics platforms'
    ],
    benefits: [
      { title: 'Faster Insights', description: 'Empower teams with real-time, self-service analytics and reporting.' },
      { title: 'Data-Driven Culture', description: 'Foster a culture of data-driven decision making across the organization.' },
      { title: 'Revenue Growth', description: 'Identify new opportunities and optimize operations with deep analytics.' },
      { title: 'Risk Management', description: 'Detect anomalies and mitigate risks with advanced data monitoring.' }
    ],
    caseStudies: [
      {
        title: 'Unified Analytics Platform',
        client: 'Healthcare Network',
        description: 'Integrated 10+ data sources into a single BI dashboard, improving reporting speed by 70%.',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'enterprise-data-warehouse-implementation'
      },
      {
        title: 'Real-Time Retail Analytics',
        client: 'E-commerce Brand',
        description: 'Deployed a real-time analytics solution, increasing sales conversion by 15% and reducing stockouts.',
        image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'real-time-analytics-platform'
      }
    ]
  },
  'product-engineering': {
    title: 'Product Engineering',
    description: 'Full-cycle product engineering: strategy, design, development, QA, and DevOps for scalable, high-quality digital products.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-purple-500 to-purple-700',
    features: [
      'Product strategy and roadmap',
      'Agile software development',
      'API and microservices architecture',
      'UI/UX design and prototyping',
      'Automated testing and QA',
      'DevOps and continuous delivery'
    ],
    benefits: [
      { title: 'Accelerated Launch', description: 'Bring products to market faster with agile, iterative delivery.' },
      { title: 'Scalability', description: 'Build robust, scalable products ready for rapid growth.' },
      { title: 'Quality Assurance', description: 'Ensure reliability and performance with automated QA.' },
      { title: 'User-Centric Design', description: 'Delight users with intuitive, engaging digital experiences.' }
    ],
    caseStudies: [
      {
        title: 'SaaS Platform Launch',
        client: 'B2B SaaS Startup',
        description: 'Developed and launched a SaaS platform, acquiring 10,000+ users in the first quarter.',
        image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Mobile App Modernization',
        client: 'Banking Firm',
        description: 'Rebuilt a legacy mobile app, improving user ratings from 3.1 to 4.7 and reducing crashes by 90%.',
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
  },
  'quality-engineering': {
    title: 'Quality Engineering',
    description: 'Comprehensive quality assurance and testing solutions that ensure reliability, performance, and security of your software products.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-emerald-500 to-emerald-700',
    features: [
      'Automated testing strategy and implementation',
      'Performance and load testing',
      'Security and penetration testing',
      'API and service integration testing',
      'Continuous testing in CI/CD pipelines',
      'Test automation frameworks development'
    ],
    benefits: [
      { 
        title: 'Higher Product Quality', 
        description: 'Deliver more reliable, stable software products with comprehensive testing coverage.'
      },
      { 
        title: 'Faster Release Cycles', 
        description: 'Accelerate time-to-market with efficient, automated testing processes integrated into CI/CD.'
      },
      { 
        title: 'Reduced Development Costs', 
        description: 'Identify and fix issues earlier in the development cycle, reducing costly late-stage fixes.'
      },
      { 
        title: 'Enhanced Customer Experience', 
        description: 'Ensure a seamless user experience by preventing defects from reaching production environments.'
      }
    ],
    caseStudies: [
      {
        title: 'Test Automation Transformation',
        client: 'Enterprise Software Provider',
        description: 'Implemented a comprehensive test automation framework that reduced regression testing time by 85% and increased test coverage by 60%.',
        image: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Performance Engineering Implementation',
        client: 'Financial Services Platform',
        description: 'Designed and executed performance testing strategy that identified critical bottlenecks, improving application response time by 70% and supporting 3x user load.',
        image: 'https://images.pexels.com/photos/8092507/pexels-photo-8092507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'ux-engineering': {
    title: 'UX Engineering',
    description: 'Creating intuitive, engaging user experiences through user-centered design principles and innovative frontend technologies.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-pink-500 to-pink-700',
    features: [
      'User research and persona development',
      'Information architecture design',
      'Wireframing and interactive prototyping',
      'Usability testing and analysis',
      'Accessible design implementation',
      'Frontend development with modern frameworks'
    ],
    benefits: [
      { 
        title: 'Increased User Adoption', 
        description: 'Create experiences that users love, driving higher adoption rates and customer satisfaction.'
      },
      { 
        title: 'Lower Support Costs', 
        description: 'Reduce customer support issues with intuitive interfaces that users can navigate without assistance.'
      },
      { 
        title: 'Data-Driven Design', 
        description: 'Make informed design decisions based on user research, testing, and behavioral analysis.'
      },
      { 
        title: 'Competitive Advantage', 
        description: 'Stand out in the market with exceptional user experiences that differentiate your products.'
      }
    ],
    caseStudies: [
      {
        title: 'Enterprise Portal Redesign',
        client: 'Global Manufacturing Company',
        description: 'Redesigned an enterprise portal serving 10,000+ users, resulting in 42% improvement in task completion rates and 60% reduction in training requirements.',
        image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Mobile App UX Transformation',
        client: 'Retail Banking Institution',
        description: 'Transformed a legacy banking application with a user-centered redesign, increasing user engagement by 78% and improving App Store ratings from 3.2 to 4.8 stars.',
        image: 'https://images.pexels.com/photos/3585090/pexels-photo-3585090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'devops': {
    title: 'DevOps Services',
    description: 'Streamline your software delivery with our comprehensive DevOps solutions that integrate development and operations for faster, more reliable deployments.',
    icon: <Code className="w-12 h-12" />,
    color: 'from-cyan-500 to-cyan-700',
    features: [
      'DevOps assessment and strategy',
      'CI/CD pipeline implementation',
      'Infrastructure as Code (IaC)',
      'Container orchestration with Kubernetes',
      'Microservices architecture implementation',
      'Monitoring and observability solutions'
    ],
    benefits: [
      { 
        title: 'Faster Time-to-Market', 
        description: 'Accelerate delivery cycles with automated build, test, and deployment processes.'
      },
      { 
        title: 'Enhanced Stability', 
        description: 'Improve system reliability with consistent deployment processes and automated rollbacks.'
      },
      { 
        title: 'Reduced Operational Costs', 
        description: 'Lower infrastructure and maintenance costs through automation and efficient resource utilization.'
      },
      { 
        title: 'Improved Collaboration', 
        description: 'Break down silos between development and operations teams for better communication and efficiency.'
      }
    ],
    caseStudies: [
      {
        title: 'DevOps Transformation Journey',
        client: 'Healthcare Technology Provider',
        description: 'Implemented a comprehensive DevOps transformation that reduced release cycles from months to days and improved system reliability by 99.99%.',
        image: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Kubernetes Migration Project',
        client: 'E-commerce Platform',
        description: 'Migrated a monolithic application to microservices architecture on Kubernetes, reducing infrastructure costs by 40% and enabling 3x faster feature delivery.',
        image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'global-capability': {
    title: 'Global Capability Center',
    description: 'Strategic offshore and nearshore capability centers that extend your business operations with specialized talent and optimized cost structures.',
    icon: <Smartphone className="w-12 h-12" />,
    color: 'from-violet-500 to-violet-700',
    features: [
      'Capability center strategy and roadmap',
      'Process design and optimization',
      'Talent acquisition and development',
      'Technology infrastructure setup',
      'Knowledge transfer frameworks',
      'Continuous improvement programs'
    ],
    benefits: [
      { 
        title: 'Cost Optimization', 
        description: 'Leverage strategic global locations to optimize operational costs while maintaining quality.'
      },
      { 
        title: 'Access to Global Talent', 
        description: 'Tap into diverse talent pools with specialized skills across different regions.'
      },
      { 
        title: 'Business Continuity', 
        description: 'Ensure 24/7 operations and enhance resilience with distributed capability centers.'
      },
      { 
        title: 'Scalable Operations', 
        description: 'Rapidly scale your teams up or down based on business requirements and market conditions.'
      }
    ],
    caseStudies: [
      {
        title: 'Engineering Capability Center',
        client: 'Global Software Organization',
        description: 'Established a 200-person global capability center that reduced operational costs by 40% while accelerating product development cycles by 35%.',
        image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Digital Innovation Hub',
        client: 'Financial Services Provider',
        description: 'Created a specialized innovation center focused on emerging technologies, delivering 12 new digital products in the first year of operation.',
        image: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'blockchain': {
    title: 'Blockchain Solutions',
    description: 'Advanced blockchain technology solutions that transform business processes with enhanced security, transparency, and efficiency.',
    icon: <Database className="w-12 h-12" />,
    color: 'from-blue-400 to-blue-600',
    features: [
      'Enterprise blockchain strategy',
      'Smart contract development',
      'Decentralized application (DApp) creation',
      'Supply chain blockchain integration',
      'Blockchain security implementation',
      'Cryptocurrency and token systems'
    ],
    benefits: [
      { 
        title: 'Enhanced Security', 
        description: 'Protect critical data with immutable, cryptographically secured blockchain technology.'
      },
      { 
        title: 'Process Transparency', 
        description: 'Create transparent business processes with verifiable transaction records accessible to all stakeholders.'
      },
      { 
        title: 'Operational Efficiency', 
        description: 'Eliminate intermediaries and reduce friction with automated smart contracts and streamlined workflows.'
      },
      { 
        title: 'Trusted Ecosystems', 
        description: 'Build trusted business networks and ecosystems where participants can transact with confidence.'
      }
    ],
    caseStudies: [
      {
        title: 'Supply Chain Transformation',
        client: 'Global Manufacturing Enterprise',
        description: 'Implemented a blockchain-based supply chain solution that increased traceability by 100% and reduced dispute resolution time by 85%.',
        image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'supply-chain-transformation'
      },
      {
        title: 'Decentralized Finance Platform',
        client: 'Fintech Startup',
        description: 'Developed a secure DeFi platform that processed over $100M in transactions within the first six months with zero security incidents.',
        image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        id: 'decentralized-finance-platform'
      }
    ]
  },
  'iot': {  
    title: 'IoT Solutions',
    description: 'Connect and optimize your business operations with cutting-edge Internet of Things implementation, management, and analytics solutions.',
    icon: <Smartphone className="w-12 h-12" />,
    color: 'from-teal-500 to-teal-700',
    features: [
      'IoT strategy and architecture design',
      'Connected device implementation and integration',
      'Edge computing solutions',
      'IoT data analytics and insights',
      'Industrial IoT (IIoT) implementation',
      'IoT security and compliance'
    ],
    benefits: [
      { 
        title: 'Operational Efficiency', 
        description: 'Optimize operations with real-time monitoring and data-driven decision making.'
      },
      { 
        title: 'Predictive Maintenance', 
        description: 'Reduce downtime and extend equipment lifespan with predictive maintenance capabilities.'
      },
      { 
        title: 'Enhanced Customer Experience', 
        description: 'Create innovative, connected experiences that differentiate your products and services.'
      },
      { 
        title: 'Data-Driven Insights', 
        description: 'Capture and analyze valuable data from connected devices to drive business innovation.'
      }
    ],
    caseStudies: [
      {
        title: 'Smart Manufacturing Transformation',
        client: 'Global Industrial Manufacturer',
        description: 'Implemented comprehensive IoT solution across manufacturing facilities, reducing operational costs by 28% and improving equipment uptime by 40%.',
        image: 'https://images.pexels.com/photos/3912412/pexels-photo-3912412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Connected Healthcare Platform',
        client: 'Medical Devices Company',
        description: 'Developed an IoT platform connecting medical devices, enabling remote monitoring and reducing hospital readmissions by 32%.',
        image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  'rcm': {
    title: 'Revenue Cycle Management',
    description: 'Optimize your healthcare revenue cycle with our comprehensive RCM solutions designed to maximize reimbursements and streamline financial operations.',
    icon: <Database className="w-12 h-12" />,
    color: 'from-amber-500 to-amber-700',
    features: [
      'End-to-end revenue cycle optimization',
      'Medical coding and billing services',
      'Claims management and denial prevention',
      'Patient eligibility verification',
      'Accounts receivable management',
      'Healthcare analytics and reporting'
    ],
    benefits: [
      { 
        title: 'Increased Revenue', 
        description: 'Maximize reimbursement rates and reduce claim denials to boost your bottom line.'
      },
      { 
        title: 'Reduced Operational Costs', 
        description: 'Streamline processes and eliminate inefficiencies in your billing and collections operations.'
      },
      { 
        title: 'Improved Cash Flow', 
        description: 'Accelerate payment cycles and reduce days in accounts receivable for better financial stability.'
      },
      { 
        title: 'Regulatory Compliance', 
        description: 'Stay compliant with ever-changing healthcare regulations and billing requirements.'
      }
    ],
    caseStudies: [
      {
        title: 'Revenue Cycle Transformation',
        client: 'Multi-Specialty Medical Group',
        description: 'Implemented a comprehensive RCM solution that increased collections by 24%, reduced denial rate by 35%, and shortened the revenue cycle by 12 days.',
        image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        title: 'Healthcare Analytics Platform',
        client: 'Regional Hospital Network',
        description: 'Developed a custom analytics solution that identified $3.2M in missed revenue opportunities and improved clean claim rate from 76% to 94%.',
        image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
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
                      to={`/case-studies/${caseStudy.id || caseStudy.title.toLowerCase().replace(/\s+/g, '-')}`}
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