import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Brain, Cloud, Database, 
  Code, Smartphone, HomeIcon, InfoIcon, Phone, BookOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' 
      : 'bg-transparent'
  }`;

  // Define services structure
  const services = {
    AI: [
      { name: 'Enterprise AI Development', path: '/services/enterprise-ai' },
    ],
    Cloud: [
      { name: 'AWS Services', path: '/services/aws' },
      { name: 'Azure Cloud Services', path: '/services/azure' },
      { name: 'Google Cloud Services', path: '/services/google-cloud' },
      { name: 'CI/CD Consulting', path: '/services/cicd' },
      { name: 'Managed Services', path: '/services/managed-services' },
    ],
    Data: [
      { name: 'Data Analytics & BI', path: '/services/data-analytics' },
    ],
    Engineering: [
      { name: 'Product Engineering', path: '/services/product-engineering' },
      { name: 'Quality Engineering', path: '/services/quality-engineering' },
      { name: 'UX Engineering', path: '/services/ux-engineering' },
      { name: 'DevOps Services', path: '/services/devops' },
    ],
    Digital: [
      { name: 'Global Capability Center', path: '/services/global-capability' },
      { name: 'Blockchain', path: '/services/blockchain' },
      { name: 'IoT', path: '/services/iot' },
      { name: 'RCM', path: '/services/rcm' },
      { name: 'Cybersecurity', path: '/services/cybersecurity' },
    ],
  };

  // Icons for service categories
  const serviceIcons = {
    AI: <Brain className="w-5 h-5 text-blue-400" />,
    Cloud: <Cloud className="w-5 h-5 text-purple-400" />,
    Data: <Database className="w-5 h-5 text-green-400" />,
    Engineering: <Code className="w-5 h-5 text-yellow-400" />,
    Digital: <Smartphone className="w-5 h-5 text-pink-400" />,
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <nav className={navbarClasses} ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Logo />
                <span className="ml-2 text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  TechNova
                </span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('services')}
                  className="nav-link flex items-center"
                  id="services-dropdown-button"
                >
                  Services
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="fixed left-0 right-0 mx-auto px-4"
                      style={{ 
                        top: '4rem',
                        zIndex: 100,
                        maxWidth: '1200px',
                        width: '90%',
                        margin: '0 auto'
                      }}
                    >
                      <div className="glass-card p-5 grid grid-cols-5 gap-6">
                        {Object.entries(services).map(([category, items]) => (
                          <div key={category} className="space-y-3">
                            <div className="flex items-center space-x-2 mb-2">
                              {serviceIcons[category as keyof typeof serviceIcons]}
                              <h3 className="font-semibold text-white">
                                {category}
                              </h3>
                            </div>
                            <ul className="space-y-2">
                              {items.map((item) => (
                                <li key={item.name}>
                                  <Link 
                                    to={item.path}
                                    className="block text-gray-300 hover:text-white text-sm transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link to="/about" className="nav-link flex items-center">
                <InfoIcon className="w-4 h-4 mr-1" />
                About
              </Link>
              
              <Link to="/contact" className="nav-link flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Link>
              
              <Link to="/blog" className="nav-link flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                Blog
              </Link>
              
              <Link to="/contact" className="btn btn-primary ml-4 text-sm flex items-center">
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="space-y-1">
                <button
                  onClick={() => toggleDropdown('mobileServices')}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-200 hover:text-white flex justify-between items-center"
                >
                  Services
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 'mobileServices' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobileServices' && (
                  <div className="pl-4 space-y-2">
                    {Object.entries(services).map(([category, items]) => (
                      <div key={category} className="py-2">
                        <div className="flex items-center space-x-2 mb-2 text-primary-400">
                          {serviceIcons[category as keyof typeof serviceIcons]}
                          <span className="font-medium">{category}</span>
                        </div>
                        <ul className="pl-6 space-y-2">
                          {items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.path}
                                className="block text-sm text-gray-300 hover:text-white"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
              >
                Contact
              </Link>
              
              <Link
                to="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
              >
                Blog
              </Link>
              
              <Link
                to="/contact"
                className="block px-4 py-2 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md text-base font-medium"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;