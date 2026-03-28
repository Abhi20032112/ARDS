import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import OurWorkPage from '@/pages/OurWorkPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import FeedbackPage from '@/pages/FeedbackPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ScrollToTop from '@/components/ScrollToTop';

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('button, [role="button"], a[href], .glow-hover');
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'scale-150' : ''}`} 
      style={{ left: position.x - 10, top: position.y - 10 }}
    />
  );
}

function UniverseParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        rotation: 0
      }));
      setParticles(prev => [...prev.slice(-19), ...newParticles]); // Keep 20 active
    };

    const interval = setInterval(generateParticles, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="universe-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="universe-particle"
          style={{
            left: p.x,
            width: p.size * 2,
            height: p.size * 2,
            animationDuration: `${20 / p.speed}s`,
            animationDelay: `-${p.y / p.speed * 0.01}s`
          }}
        />
      ))}
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-universe-gradient text-white relative">
      <Cursor />
      <UniverseParticles />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<OurWorkPage />} />
            <Route path="/clients" element={<TestimonialsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500/90 backdrop-blur-sm text-white p-4 rounded-full shadow-2xl glow-hover hover:bg-green-600 transition-all z-50"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
