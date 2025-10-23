import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Wrench, Star, Phone, Users, Briefcase, MessageSquare } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Wrench },
    { name: 'Work', path: '/work', icon: Briefcase },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-2xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Centered on mobile, left on desktop */}
            <div className="flex-1 flex justify-center lg:justify-start">
              <Link to="/" className="flex items-center space-x-3">
                <motion.img
                  src={logo}
                  alt="Alpenrose Digital Solutions Logo"
                  className="h-10 lg:h-12 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
                <motion.span
                  className="font-bold text-gray-900 text-lg lg:text-2xl tracking-tight transition-colors duration-200 whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                >
                  Alpenrose Digital Solutions
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Link
                      to={item.path}
                      className="text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-md text-primary transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around items-center">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center space-y-1 text-primary transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
            <motion.button
              onClick={toggleMenu}
              className="flex flex-col items-center space-y-1 text-primary transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs">More</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gray-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-md text-primary transition-colors duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>



                {/* Navigation Links */}
                <div className="space-y-4 mb-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={toggleMenu}
                        className="flex items-center space-x-4 px-4 py-3 rounded-lg text-primary transition-all duration-200"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>



                {/* Social Links */}
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="h-6 w-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
