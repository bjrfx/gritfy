import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo size="sm" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Gritfy Technologies
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Transforming businesses through enterprise-grade AI development, cloud services,
              and digital innovation solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/enterprise-ai" className="text-gray-400 hover:text-white transition-colors">
                  Enterprise AI Development
                </Link>
              </li>
              <li>
                <Link to="/services/aws" className="text-gray-400 hover:text-white transition-colors">
                  AWS Services
                </Link>
              </li>
              <li>
                <Link to="/services/data-analytics" className="text-gray-400 hover:text-white transition-colors">
                  Data Analytics & BI
                </Link>
              </li>
              <li>
                <Link to="/services/product-engineering" className="text-gray-400 hover:text-white transition-colors">
                  Product Engineering
                </Link>
              </li>
              <li>
                <Link to="/services/cybersecurity" className="text-gray-400 hover:text-white transition-colors">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="text-gray-400 hover:text-white transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  London, On, Canada.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <a href="tel:+14373761965" className="text-gray-400 hover:text-white transition-colors">
                  +1 (437) 376-1965
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <a href="mailto:contact@gritfytechnologies.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@gritfytechnologies.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Gritfy Technologies. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;