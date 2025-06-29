import React from 'react';
import { Brain, Cloud, Database, Code, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Brain className="w-10 h-10 text-primary-400" />, 
    title: "Enterprise AI Development",
    description: "Cutting-edge AI solutions tailored for enterprise needs, from predictive analytics to intelligent automation systems.",
    link: "/services/enterprise-ai",
    details: [
      "Custom AI model development and deployment",
      "Predictive analytics and forecasting systems",
      "AI-powered process automation",
      "Natural language processing and computer vision"
    ]
  },
  {
    icon: <Cloud className="w-10 h-10 text-primary-400" />, 
    title: "Cloud Services",
    description: "Comprehensive cloud solutions including AWS, Azure, and Google Cloud with expert CI/CD consulting and managed services.",
    link: "/services/cloud",
    details: [
      "Cloud migration and modernization",
      "Serverless architecture development",
      "DevOps and CI/CD pipeline automation",
      "Managed cloud services and support"
    ]
  },
  {
    icon: <Database className="w-10 h-10 text-primary-400" />, 
    title: "Data Analytics & BI",
    description: "Transform raw data into actionable insights with our advanced analytics and business intelligence solutions.",
    link: "/services/data-analytics",
    details: [
      "Data warehouse design and implementation",
      "Business intelligence dashboard development",
      "Real-time analytics solutions",
      "Predictive analytics models"
    ]
  },
  {
    icon: <Code className="w-10 h-10 text-primary-400" />, 
    title: "Product Engineering",
    description: "End-to-end product development services with quality engineering, UX excellence, and DevOps integration.",
    link: "/services/product-engineering",
    details: [
      "Custom software development",
      "Product strategy and roadmap planning",
      "UI/UX design and implementation",
      "Quality assurance and testing"
    ]
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary-400" />, 
    title: "Digital Transformation",
    description: "Comprehensive digital solutions including blockchain technology, IoT implementation, and cybersecurity services.",
    link: "/services/digital",
    details: [
      "Blockchain and IoT integration",
      "Cybersecurity solutions",
      "Process automation",
      "Legacy modernization"
    ]
  }
];

const Services: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Enterprise Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Explore our comprehensive range of services designed to accelerate your digital transformation journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div key={service.title} className="glass-card hover-glow p-8 flex flex-col h-full">
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-2xl font-semibold mb-2 text-white text-center">{service.title}</h2>
              <p className="text-gray-400 mb-4 text-center">{service.description}</p>
              <ul className="mb-6 text-gray-300 list-disc list-inside text-sm">
                {service.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="mt-auto text-center">
                <Link to={service.link} className="btn btn-primary inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
