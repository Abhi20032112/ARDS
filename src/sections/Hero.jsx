import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedTypewriter from '@/components/AnimatedTypewriter';

import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

const Hero = () => {
  // Manual slider component (lightweight fallback)
  function ManualSlider() {
    const slides = [
      slide1,
      slide2,
      slide3,
    ];
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
      const next = () => setIndex((i) => (i + 1) % slides.length);
      timeoutRef.current = setInterval(next, 3500);
      return () => clearInterval(timeoutRef.current);
    }, []);

    return (
      <div className="relative">
        <img 
          src={slides[index]} 
          alt={`Slide ${index + 1}`} 
          className="w-full h-auto rounded-3xl object-cover" 
          loading="lazy"
        />
        <button
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
        >
          ›
        </button>
      </div>
    );
  }

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <section id="hero" className="relative hero-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-8 z-10 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <AnimatedTypewriter texts={["We Grow Your Brand", "Like It's Our Own"]} />
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A complete digital marketing agency specializing in social media management, ad campaigns, and branding. Transform your business with our expert solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                <a href="#contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
            data-aos="zoom-in"
          >
            <div className="floating-animation">
              <div className="rounded-3xl shadow-2xl relative overflow-hidden bg-gradient-to-br from-black/20 to-transparent">
                <ManualSlider />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
