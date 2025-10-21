import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lightbox from '@/components/Lightbox';

import project1Image from '../assets/project1.jpg';
import project2Image from '../assets/project2.jpg';
import project3Image from '../assets/project3.jpg';
import project4Image from '../assets/project4.jpg';
import project5Image from '../assets/project5.jpg';
import project6Image from '../assets/project6.jpg';

// Lazy load images
const lazyLoadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.src = src;
  });
};

const OurWorkPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

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

  const openLightbox = (image, alt) => {
    setLightboxImage(image);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };



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
        <section className="parallax-bg py-24 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-4xl lg:text-6xl font-extrabold reveal-fade"
            >
              Our Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto reveal-fade stagger-1"
            >
              Discover how we've helped businesses transform their digital presence and achieve extraordinary results.
            </motion.p>
          </motion.div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Our Portfolio</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover our transformative digital marketing solutions and success stories</p>
            </motion.div>



            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer reveal-fade stagger-2"
                >
                  <div className="relative h-64 overflow-hidden" onClick={() => openLightbox(project.image, project.title)}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm">Key Results:</h4>
                      {project.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center text-gray-700 text-sm">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                          {result}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                      View Case Study
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        imageSrc={lightboxImage} 
        alt={lightboxAlt} 
      />
    </>
  );
};

export default OurWorkPage;
