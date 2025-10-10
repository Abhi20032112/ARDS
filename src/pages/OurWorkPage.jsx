import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import project1Image from '../assets/project1.jpg';
import project2Image from '../assets/project2.jpg';
import project3Image from '../assets/project3.jpg';
import project4Image from '../assets/project4.jpg';
import project5Image from '../assets/project5.jpg';
import project6Image from '../assets/project6.jpg';

const OurWorkPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Brand Transformation',
      category: 'Brand Identity & Social Media',
      description: 'Complete brand makeover and social media strategy for a growing e-commerce business, resulting in a 300% increase in engagement.',
      image: project1Image,
      results: ['300% increase in engagement', '150% boost in sales', '50K+ new followers'],
    },
    {
      id: 2,
      title: 'Tech Startup Launch Campaign',
      category: 'Digital Marketing & Ads',
      description: 'Comprehensive digital marketing campaign for a tech startup launch, achieving 500K+ impressions in the first month.',
      image: project2Image,
      results: ['500K+ impressions', '25% conversion rate', '10,000+ app downloads'],
    },
    {
      id: 3,
      title: 'Restaurant Chain Rebranding',
      category: 'Brand Strategy & Content',
      description: 'Complete rebranding and content strategy for a restaurant chain, leading to a 40% increase in foot traffic across all locations.',
      image: project3Image,
      results: ['40% increase in foot traffic', '200% social media growth', '95% customer satisfaction'],
    },
    {
      id: 4,
      title: 'Healthcare Digital Presence',
      category: 'Website & SEO',
      description: 'Built a comprehensive digital presence for a healthcare provider, improving online appointment bookings by 180%.',
      image: project4Image,
      results: ['250% improved visibility', '180% more appointments', 'Top 3 Google rankings'],
    },
    {
      id: 5,
      title: 'Fashion Brand Influencer Campaign',
      category: 'Social Media & Influencer Marketing',
      description: 'Creative social media campaign for a fashion brand, reaching 2M+ people and driving significant sales growth through influencers.',
      image: project5Image,
      results: ['2M+ reach', '85% engagement rate', '120% sales increase'],
    },
    {
      id: 6,
      title: 'Real Estate Lead Generation',
      category: 'Lead Generation & Ads',
      description: 'Developed a comprehensive digital strategy for a real estate company, generating 500+ qualified leads monthly.',
      image: project6Image,
      results: ['500+ monthly leads', '60% conversion rate', '300% ROI improvement'],
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <>
      <Helmet>
        <title>Our Work - Alpenrose Digital Solutions</title>
        <meta name="description" content="Explore our portfolio of successful digital marketing projects and campaigns. See how we've helped businesses grow their online presence and achieve remarkable results." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold">Our Work</h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their digital presence and achieve extraordinary results.
            </p>
          </motion.div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0.5, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.5, x: -200 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="grid grid-cols-1 lg:grid-cols-2"
                  >
                    <div className="relative h-80 lg:h-auto">
                      <img className="w-full h-full object-cover" alt={projects[currentSlide].title} src={projects[currentSlide].image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                          {projects[currentSlide].category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {projects[currentSlide].title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {projects[currentSlide].description}
                      </p>
                      <div className="space-y-4 mb-8">
                        <h4 className="text-lg font-semibold text-gray-900">Key Results:</h4>
                        <ul className="space-y-2">
                          {projects[currentSlide].results.map((result, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 shrink-0"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="outline" className="w-fit font-semibold border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                        View Case Study
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 z-10 backdrop-blur-sm"><ChevronLeft className="h-6 w-6" /></button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 z-10 backdrop-blur-sm"><ChevronRight className="h-6 w-6" /></button>
              </div>
              <div className="flex justify-center mt-8 space-x-3">
                {projects.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-indigo-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 hero-gradient text-white text-center">
          <motion.div {...fadeIn} className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold">Ready to Create Your Success Story?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">Let's work together to create the next amazing project that showcases your brand's potential.</p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default OurWorkPage;
