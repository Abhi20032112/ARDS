import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import SolutionLanding from '@/pages/SolutionLanding';
import ExperienceEffects from '@/components/ExperienceEffects';
import IndustriesPage from '@/pages/IndustriesPage';
import '@/components/LightHeroes.css';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <ExperienceEffects />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
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
              <Route path="/ai-solutions" element={<SolutionLanding type="ai" />} />
              <Route path="/business-automation" element={<SolutionLanding type="automation" />} />
              <Route path="/industries" element={<IndustriesPage />} />
            </Routes>
          </main>
          <Footer />
          <a
            href="https://wa.me/919308579699?text=Hi%20ARDS%2C%20I%27d%20like%20to%20book%20a%20free%20demo."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
          <Toaster />
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
