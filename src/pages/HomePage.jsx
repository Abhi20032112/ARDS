import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Clock, Star, Zap, Target, Briefcase, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/AnimatedNumber';
import AnimatedTypewriter from '@/components/AnimatedTypewriter';
import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Keep this import if needed for other parts of the code
import slide1 from '/src/assets/slide1.jpg';
import slide2 from '/src/assets/slide2.jpg';
import slide3 from '/src/assets/slide3.jpg';

// Lazy load images
const lazyLoadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.src = src;
  });
};

const HomePage = () => {
  const metrics = [
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '100%', label: 'Success Rate' },
    { icon: Clock, value: '24/7', label: 'Support' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Results',
      description: 'Our streamlined processes get your campaigns up and running in record time, delivering swift impact.',
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'We use data-driven strategies to reach your ideal audience with unparalleled accuracy and effectiveness.',
    },
    {
      icon: Star,
      title: 'Premium Quality Content',
      description: 'Our award-winning creative team produces compelling content that elevates your brand and engages your audience.',
    },
  ];
  
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  // Manual slider component (lightweight fallback to avoid Swiper module issues)
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
        <img src={slides[index]} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-3xl object-cover" />
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

  return (
    <>
      <Helmet>
        <title>Alpenrose Digital Solutions - Best Digital Marketing Agency Worldwide</title>
        <meta name="description" content="Best digital marketing agency worldwide. Global branding and marketing solutions for startups and enterprises." />
        <meta property="og:title" content="Alpenrose Digital Solutions - Best Digital Marketing Agency Worldwide" />
        <meta property="og:description" content="Best digital marketing agency worldwide. Global branding and marketing solutions for startups and enterprises." />
        <meta property="og:image" content="/src/assets/logo.png" />
        <meta property="og:url" content="https://alpenrose-digital.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Alpenrose Digital Solutions",
            "url": "https://alpenrose-digital.com",
            "logo": "/src/assets/logo.png",
            "description": "Complete digital marketing agency specializing in social media management, ad campaigns, and branding.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-1234567890",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/alpenrose",
              "https://www.instagram.com/alpenrose",
              "https://www.linkedin.com/company/alpenrose"
            ]
          })}
        </script>
      </Helmet>

      <div className="page-container">
        <section className="relative hero-gradient text-white overflow-hidden parallax-bg">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="space-y-8 z-10 text-center lg:text-left reveal-fade"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  <AnimatedTypewriter texts={["We Grow Your Brand", "Like It's Our Own"]} />
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  A complete digital marketing agency specializing in social media management, ad campaigns, and branding. Transform your business with our expert solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 pulse-slow">
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="relative hidden lg:block reveal-zoom"
              >
                <div className="floating-animation">
                  <div className="rounded-3xl shadow-2xl relative overflow-hidden hover-lift">
                    <ManualSlider className="w-full" />
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

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`text-center p-8 rounded-3xl bg-white shadow-lg card-hover reveal-fade stagger-${index + 1}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-5 shadow-md icon-spin">
                    <metric.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-5xl font-extrabold gradient-text mb-2">
                    <AnimatedNumber value={metric.value.replace(/[+%]/g, '')} formatter={(n) => `${n}${metric.value.includes('+') ? '+' : metric.value.includes('%') ? '%' : ''}`} />
                  </h3>
                  <p className="text-gray-600 font-semibold text-lg">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
                Why Choose Alpenrose?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                As the best digital marketing agency worldwide, we deliver global branding and marketing solutions for startups and enterprises. Our professional SEO services worldwide drive organic growth. We excel as social media marketing experts, creating engaging content marketing strategies. Partner with our creative digital agency for comprehensive digital growth. We build strong online branding that resonates globally. Trust us to elevate your brand with proven performance marketing techniques.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Link to="/contact">
                    Partner with Alpenrose to Grow Your Brand Globally
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  transition={{ duration: 0.35, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`bg-gray-50 p-8 rounded-3xl shadow-lg card-hover border border-gray-200/50 tilt-card reveal-fade stagger-${index + 1}`}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-6 shadow-md icon-spin">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
                Explore Our Work & Insights
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover our latest projects and stay updated with industry trends through our blog.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift group cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Portfolio</h3>
                  <p className="text-gray-600 mb-6">See how we've helped businesses thrive with our digital marketing expertise.</p>
                  <Link
                    to="/work"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover-lift group cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-r from-teal-500 to-cyan-600">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Blog</h3>
                  <p className="text-gray-600 mb-6">Get insights, tips, and trends from our digital marketing experts.</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    Read Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeIn} className="text-white space-y-8 reveal-fade">
              <h2 className="text-4xl lg:text-5xl font-extrabold">
                Ready to Transform Your Brand?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust Alpenrose Digital Solutions to drive their growth.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 pulse-slow">
                <Link to="/contact">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
