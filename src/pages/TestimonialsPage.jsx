import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle } from 'lucide-react';
import ManualTestimonials from './ManualTestimonials'; // Ensure to import the ManualTestimonials component

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setTestimonials(storedFeedbacks);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
        <title>Client Testimonials - Alpenrose Digital Solutions</title>
        <meta name="description" content="Read what our clients say about our digital marketing services. Discover success stories and testimonials from businesses we've helped grow their online presence." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-extrabold">Client Testimonials</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Hear from our satisfied clients about their success stories and how we've helped transform their businesses.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about working with Alpenrose Digital Solutions.
              </p>
            </motion.div>

            {testimonials.length > 0 ? (
              <ManualTestimonials testimonials={testimonials} />
            ) : (
               <motion.div {...fadeIn} className="text-center py-16 px-6 bg-white rounded-3xl shadow-lg">
                <MessageCircle className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Testimonials Yet</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Be the first to share your experience! Your feedback helps us and other clients.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage;