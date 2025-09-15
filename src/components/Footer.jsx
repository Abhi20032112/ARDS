import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Tooltip from '@/components/ui/tooltip';
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
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/our-work' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' },
  ];

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
    <footer className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + About */}
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Alpenrose Digital Solutions Logo"
                className="h-12 w-auto"
              />
              <span className="font-bold text-gray-800 text-xl">
                Alpenrose Digital Solutions
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your partner in digital excellence. We grow brands with passion and precision.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600 hover:drop-shadow-[0_0_6px_rgba(99,102,241,0.6)] transition duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <Tooltip text={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Tooltip>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 transition duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Info</p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">Patna, Bihar, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <a
                  href="mailto:business@ards.in"
                  className="text-gray-600 text-sm hover:text-indigo-600 transition"
                >
                  business@ards.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                <a
                  href="tel:+919308579699"
                  className="text-gray-600 text-sm hover:text-indigo-600 transition"
                >
                  +91 9308579699
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Stay Updated</p>
            <p className="text-gray-600 text-sm">
              Subscribe to get the latest digital marketing insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                Go
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Alpenrose Digital Solutions. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
