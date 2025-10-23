import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Info,
  Wrench,
  Briefcase,
  Star,
  Users,
  ArrowUp,
  TrendingUp,
  Users as UsersIcon,
  Award,

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Tooltip from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ScrollToTop';
import logo from '@/assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        variant: 'destructive',
      });
      return;
    }
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    toast({
      title: 'Success!',
      description: 'Thank you for subscribing to our newsletter!',
    });
    setEmail('');
  };

  const quickLinks = [
    { name: 'About', id: 'about', icon: Info },
    { name: 'Services', id: 'services', icon: Wrench },
    { name: 'Work', id: 'work', icon: Briefcase },
    { name: 'Feedback', id: 'feedback', icon: Star },
    { name: 'Contact', id: 'contact', icon: Phone },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61578637610542',
      label: 'Facebook',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/alpenrosedigitalsolutions/',
      label: 'Instagram',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/alpenrose-digital-solutions/',
      label: 'LinkedIn',
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/@AlpenroseDigitalSolutions',
      label: 'YouTube',
    },

  ];

  return (
    <footer className="bg-white text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100 opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.05),transparent_50%)]"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + About */}
          <motion.div variants={itemVariants} className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <a href="#hero" className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Alpenrose Digital Solutions Logo"
                className="h-12 w-auto"
              />
              <span className="font-bold text-black text-xl">
                Alpenrose Digital Solutions
              </span>
            </a>
            <p className="text-gray-600 text-sm">
              Your partner in digital excellence. We grow brands with passion and precision.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-indigo-600 hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)] transition duration-300 transform hover:scale-110 hover:rotate-12"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  whileTap={{ scale: 0.95 }}

                >
                  <Tooltip text={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Tooltip>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm font-semibold text-black tracking-wider uppercase">Quick Links</p>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <link.icon className="h-5 w-5 text-indigo-600" />
                  <a
                    href={`#${link.id}`}
                    className="text-gray-600 text-sm hover:text-indigo-600 transition hover:scale-105"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm font-semibold text-black tracking-wider uppercase">Contact Info</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">Patna, Bihar, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-600 shrink-0" />
                <a
                  href="mailto:business@ards.in"
                  className="text-gray-600 text-sm hover:text-indigo-600 transition hover:scale-105"
                >
                  business@ards.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-600 shrink-0" />
                <a
                  href="tel:+919308579699"
                  className="text-gray-600 text-sm hover:text-indigo-600 transition hover:scale-105"
                >
                  +91 9308579699
                </a>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-sm font-semibold text-black tracking-wider uppercase">Stay Updated</p>
            <p className="text-gray-600 text-sm">
              Subscribe to get the latest digital marketing insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-200 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black text-sm shadow-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                Go
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center relative">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <ScrollToTop />
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Alpenrose Digital Solutions. All Rights Reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
