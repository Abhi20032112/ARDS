import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle } from 'lucide-react';

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-lg p-8 card-hover relative flex flex-col"
                  >
                    <Quote className="absolute top-6 right-6 h-10 w-10 text-indigo-100" />
                    <div className="flex items-center mb-6 z-10">
                       <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-indigo-200 p-1">
                        <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{new Date(testimonial.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {renderStars(5)}
                    </div>
                    <p className="text-gray-700 leading-relaxed italic flex-grow">
                      "{testimonial.message}"
                    </p>
                  </motion.div>
                ))}
              </div>
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