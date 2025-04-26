import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, HelpCircle, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "Page Not Found - TechNova Solutions";
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-gray-800">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-9xl font-bold gradient-text opacity-70">404</h1>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
            We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link to="/" className="btn btn-primary inline-flex items-center justify-center">
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn-outline inline-flex items-center justify-center">
              <HelpCircle className="mr-2 w-5 h-5" />
              Contact Support
            </Link>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Looking for something?</h3>
            <div className="mb-6">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search our website..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                />
                <button className="px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h4 className="font-medium text-white mb-3">Popular pages:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <Link to="/services/enterprise-ai" className="text-gray-400 hover:text-primary-400 transition-colors">
                Enterprise AI
              </Link>
              <Link to="/services/aws" className="text-gray-400 hover:text-primary-400 transition-colors">
                AWS Services
              </Link>
              <Link to="/services/data-analytics" className="text-gray-400 hover:text-primary-400 transition-colors">
                Data Analytics
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                About Us
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;