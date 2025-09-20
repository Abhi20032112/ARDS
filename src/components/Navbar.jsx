import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '@/components/ui/tooltip';
import { Home, Info, Wrench, Star, Phone, MessageSquare, Briefcase } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Wrench },
    { name: 'Our Work', path: '/our-work', icon: Briefcase },
    { name: 'Testimonials', path: '/testimonials', icon: Star },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    let lastScroll = 0;
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    const onScroll = () => {
      const current = window.pageYOffset || document.documentElement.scrollTop;
      if (current > 60 && current > lastScroll) {
        nav.classList.add('translate-y-[-6px]', 'shadow-md', 'backdrop-brightness-95');
        nav.classList.add('!py-0');
      } else if (current <= 60) {
        nav.classList.remove('translate-y-[-6px]', 'shadow-md', 'backdrop-brightness-95');
        nav.classList.remove('!py-0');
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="site-nav" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <Link to="/" className="flex items-center space-x-3 shrink-0 overflow-hidden">
            <img 
              src={logo} 
              alt="Alpenrose Digital Solutions Logo" 
              className="h-12 w-auto"
            />
            <span className="font-bold text-gray-800 text-base sm:text-xl md:text-2xl whitespace-nowrap">
              Alpenrose Digital Solutions
            </span>
          </Link>

          {/* right side: nav links (desktop) and menu button (mobile) */}
          <div className="hidden md:flex items-center ml-auto gap-[30px]">
            {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-semibold nav-underline transition-all duration-300 rounded-md whitespace-nowrap hover:scale-105 ${isActive(item.path) ? 'active text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <span className="inline-flex items-center space-x-2">
                    {item.icon && (
                      <item.icon className="h-3 w-3 text-gray-500" />
                    )}
                    <span className="whitespace-nowrap">{item.name}</span>
                  </span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-indigo-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Open main menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                    isActive(item.path)
                      ? 'text-indigo-700 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  <span className="inline-flex items-center space-x-3">
                    {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;