import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ExperienceEffects from '@/components/ExperienceEffects';
import '@/components/LightHeroes.css';
import '@/components/ResponsiveHardening.css';

const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const OurWorkPage = lazy(() => import('@/pages/OurWorkPage'));
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage'));
const FeedbackPage = lazy(() => import('@/pages/FeedbackPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const SolutionLanding = lazy(() => import('@/pages/SolutionLanding'));
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'));

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
          <ExperienceEffects />
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<div className="route-loading" role="status" aria-label="Loading page" />}><Routes>
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
            </Routes></Suspense>
          </main>
          <Footer />
          <a href="https://wa.me/919308579699" target="_blank" rel="noopener noreferrer" className="whatsapp-only-float" aria-label="Chat with ARDS on WhatsApp"><MessageCircle /></a>
          <Toaster />
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
