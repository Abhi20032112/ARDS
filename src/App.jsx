import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import TeamPage from '@/pages/TeamPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
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
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </main>
          <Footer />
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
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
