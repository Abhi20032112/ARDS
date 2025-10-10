import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';

const Clients = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setTestimonials(storedFeedbacks);
  }, []);

  const fallbackTestimonials = [
    { id: 1, name: 'Tech Innovators Inc.', message: 'Excellent service!', submittedAt: new Date().toISOString() },
    { id: 2, name: 'Fashion Forward Ltd.', message: 'Transformed our brand.', submittedAt: new Date().toISOString() },
    { id: 3, name: 'Health Solutions Co.', message: 'Outstanding results.', submittedAt: new Date().toISOString() },
    { id: 4, name: 'Realty Experts', message: 'Highly recommended.', submittedAt: new Date().toISOString() },
    { id: 5, name: 'Foodie Delights', message: 'Great partnership.', submittedAt: new Date().toISOString() },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  useEffect(() => {
    if (displayTestimonials.length > 0) {
      const next = () => setIndex((i) => (i + 1) % displayTestimonials.length);
      timeoutRef.current = setInterval(next, 4500);
      return () => clearInterval(timeoutRef.current);
    }
  }, [testimonials]);

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="clients" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Our Clients</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by leading businesses across various industries. Here's what our clients say about working with us.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.slice(index, index + 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-8 card-hover relative flex flex-col h-full"
              >
                <div className="flex items-center mb-6 z-10">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-indigo-200 p-1">
                    <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{t.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-600">{new Date(t.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {renderStars()}
                </div>

                <p className="text-gray-700 leading-relaxed italic flex-grow">"{t.message}"</p>
              </motion.div>
            ))}
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
            <button
              aria-label="Previous clients"
              onClick={() => setIndex((i) => (i - 1 + displayTestimonials.length) % displayTestimonials.length)}
              className="bg-white/90 text-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
            >
              ‹
            </button>
            <button
              aria-label="Next clients"
              onClick={() => setIndex((i) => (i + 1) % displayTestimonials.length)}
              className="bg-white/90 text-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
