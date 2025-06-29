import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  useEffect(() => {
    document.title = "Contact Gritfy Technologies";
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Attempting to submit form to Firebase...");
      // Add form data to Firestore
      const docRef = await addDoc(collection(db, "contactSubmissions"), {
        ...formState,
        createdAt: serverTimestamp(),
      });
      
      console.log("Document successfully written with ID:", docRef.id);
      
      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      setIsSubmitting(false);
      
      // Provide more specific error messages based on the Firebase error
      if (error.code === 'permission-denied') {
        setSubmitError("You don't have permission to submit this form. Please contact support.");
      } else if (error.code === 'unavailable') {
        setSubmitError("We're having trouble reaching our servers. Please check your internet connection and try again.");
      } else {
        setSubmitError(`There was an error submitting your message: ${error.message}. Please try again.`);
      }
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary-400" />,
      title: "Email Us",
      details: "Click to send us an email",
      action: "mailto:info@gritfytechnologies.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-400" />,
      title: "Call Us",
      details: "+1 (647) 919-1366",
      action: "tel:+16479191366",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-400" />,
      title: "Visit Us",
      details: "London, ON, Canada.",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-400" />,
      title: "Working Hours",
      details: "Monday-Friday: 9AM-6PM EST",
      action: null,
    },
  ];

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Have questions or ready to start your digital transformation journey? 
            Our team is here to help.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-5 hover-glow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div className="ml-4 overflow-hidden">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 break-words" >
                        {item.action ? (
                          <a 
                            href={item.action} 
                            className="hover:text-primary-400 transition-colors break-all"
                            target={item.action.startsWith('http') ? "_blank" : undefined}
                            rel={item.action.startsWith('http') ? "noopener noreferrer" : undefined}
                          >
                            {item.details}
                          </a>
                        ) : (
                          item.details
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="glass-card p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3">Global Presence</h3>
                <p className="text-gray-400 mb-4">
                  With offices across North America and Asia, we provide localized 
                  support backed by global expertise.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white">North America</h4>
                    {/* <p className="text-gray-400">San Francisco</p>
                    <p className="text-gray-400">New York</p> */}
                    <p className="text-gray-400">London</p>
                  </div>
                  {/* <div>
                    <h4 className="font-semibold text-white">Europe</h4>
                    <p className="text-gray-400">London</p>
                    <p className="text-gray-400">Berlin</p>
                    <p className="text-gray-400">Stockholm</p>
                  </div> */}
                  <div>
                    <h4 className="font-semibold text-white">Asia</h4>
                    <p className="text-gray-400">India</p>
                    {/* <p className="text-gray-400">Tokyo</p>
                    <p className="text-gray-400">Sydney</p> */}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mb-32 -mr-32"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for contacting us. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="w-full overflow-hidden">
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="service">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                      >
                        <option value="">Select a service</option>
                        <option value="AI">Enterprise AI Development</option>
                        <option value="Cloud">Cloud Services</option>
                        <option value="Data">Data Analytics & BI</option>
                        <option value="Engineering">Product Engineering</option>
                        <option value="Digital">Digital Transformation</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  
                  {submitError && (
                    <div className="mb-6 p-3 rounded-md bg-red-500/20 border border-red-500/50">
                      <p className="text-red-400">{submitError}</p>
                    </div>
                  )}
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
        
        <div className="glass-card p-6 overflow-hidden relative">
          <div className="aspect-[16/5] rounded-lg overflow-hidden">
            <iframe 
              title="Gritfy Technologies Office Location" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186904.87211065143!2d-81.41342715923388!3d42.94901410695336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef20ea88d9b0b%3A0x28c7d7699a056b95!2sLondon%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1750915875151!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;