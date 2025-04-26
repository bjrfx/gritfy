import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';
import CTA from '../components/home/CTA';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const Blog: React.FC = () => {
  useEffect(() => {
    document.title = "Blog - TechNova Solutions";
  }, []);

  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Enterprise AI: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends in enterprise AI that are shaping the future of business operations and decision-making processes.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Artificial Intelligence",
      author: "Michael Chen",
      date: "June 15, 2025",
      readTime: "8 min read",
      slug: "future-enterprise-ai-trends-2025"
    },
    {
      id: 2,
      title: "Cloud Migration Strategies for Complex Enterprise Systems",
      excerpt: "Learn effective strategies for migrating complex enterprise systems to the cloud while minimizing disruption and maximizing ROI.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Cloud Computing",
      author: "David Wilson",
      date: "June 10, 2025",
      readTime: "12 min read",
      slug: "cloud-migration-strategies-enterprise"
    },
    {
      id: 3,
      title: "Implementing Zero-Trust Security in the Modern Enterprise",
      excerpt: "A comprehensive guide to implementing zero-trust security architecture in enterprise environments to protect against evolving threats.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Cybersecurity",
      author: "Alex Rivera",
      date: "June 5, 2025",
      readTime: "10 min read",
      slug: "zero-trust-security-implementation"
    },
  ];

  const recentPosts: BlogPost[] = [
    {
      id: 4,
      title: "Data-Driven Decision Making: From Analytics to Action",
      excerpt: "Discover how enterprises can transform data analytics into actionable business intelligence for strategic decision making.",
      image: "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Data Analytics",
      author: "Priya Patel",
      date: "May 28, 2025",
      readTime: "7 min read",
      slug: "data-driven-decision-making"
    },
    {
      id: 5,
      title: "DevOps Excellence: Building a Culture of Continuous Improvement",
      excerpt: "Learn how to foster a culture of DevOps excellence that drives continuous improvement and innovation in your organization.",
      image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "DevOps",
      author: "James Thompson",
      date: "May 22, 2025",
      readTime: "9 min read",
      slug: "devops-excellence-continuous-improvement"
    },
    {
      id: 6,
      title: "Blockchain Beyond Cryptocurrency: Enterprise Applications",
      excerpt: "Explore practical enterprise applications of blockchain technology beyond cryptocurrency, from supply chain to identity management.",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Blockchain",
      author: "Sophia Kim",
      date: "May 18, 2025",
      readTime: "11 min read",
      slug: "blockchain-enterprise-applications"
    },
    {
      id: 7,
      title: "UX Engineering: Creating Exceptional Enterprise Experiences",
      excerpt: "Discover strategies for designing and implementing exceptional user experiences in enterprise applications and systems.",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "UX Engineering",
      author: "Emma Rodriguez",
      date: "May 15, 2025",
      readTime: "8 min read",
      slug: "ux-engineering-enterprise-experiences"
    },
    {
      id: 8,
      title: "IoT in Manufacturing: Transforming Production with Smart Technology",
      excerpt: "How Internet of Things technology is revolutionizing manufacturing processes through smart, connected systems and real-time analytics.",
      image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "IoT",
      author: "Robert Chen",
      date: "May 10, 2025",
      readTime: "10 min read",
      slug: "iot-manufacturing-smart-technology"
    },
    {
      id: 9,
      title: "Multi-Cloud Strategy: Optimizing Performance and Reducing Risk",
      excerpt: "A comprehensive guide to developing and implementing an effective multi-cloud strategy for enterprise environments.",
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Cloud Computing",
      author: "David Wilson",
      date: "May 5, 2025",
      readTime: "13 min read",
      slug: "multi-cloud-strategy-enterprise"
    },
  ];

  const categories = [
    "Artificial Intelligence",
    "Cloud Computing",
    "Data Analytics",
    "DevOps",
    "Cybersecurity",
    "Blockchain",
    "IoT",
    "UX Engineering",
    "Product Engineering",
    "Digital Transformation"
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
              TechNova <span className="gradient-text">Insights</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              Expert perspectives on AI, cloud technology, and digital transformation 
              to help you navigate the evolving tech landscape.
            </p>
          </motion.div>
          
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card overflow-hidden h-full hover-glow transition-all duration-300 group">
                      <div className="relative">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-primary-400 text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-3/4"
            >
              <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
              
              <div className="space-y-8">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="glass-card p-6 hover-glow transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
                            <div className="aspect-video md:aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="w-full md:w-2/3">
                            <div className="flex items-center mb-3">
                              <span className="px-3 py-1 bg-slate-800 text-primary-400 text-xs font-medium rounded-full mr-3">
                                {post.category}
                              </span>
                              <span className="text-gray-500 text-sm flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-500 text-sm">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </div>
                              <span className="inline-flex items-center text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
                                Read more <ArrowRight className="ml-1 w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <button className="btn btn-outline px-8">
                  Load More Articles
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full lg:w-1/4 mt-12 lg:mt-0"
            >
              <div className="glass-card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        <Tag className="w-4 h-4 mr-2" />
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="glass-card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Stay updated with our latest insights and industry news.
                </p>
                <form className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Cloud', 'AWS', 'DevOps', 'Data', 'Security', 'API', 'ML', 'Blockchain', 'React', 'UX', 'Mobile'].map((tag, index) => (
                    <Link 
                      key={index}
                      to={`/blog/tag/${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
};

export default Blog;