import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Send, MessageCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    setFeedbacks(storedFeedbacks);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const feedback = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    const existingFeedback = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(existingFeedback));
    setFeedbacks(existingFeedback);
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '', rating: 5 });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <Star
          className={`h-5 w-5 ${
            index < rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      </motion.div>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Feedback - Alpenrose Digital Solutions</title>
        <meta name="description" content="Share your feedback with Alpenrose Digital Solutions. Help us improve our services." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold">Share Your Feedback</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Your opinion matters to us. Help us improve our services.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
                Share Your Feedback
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your opinion matters to us. Help us improve our services and see what others are saying.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Feedback Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="thank-you"
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -50 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                      >
                        <MessageCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
                      <p className="text-lg text-gray-600">Your feedback has been submitted successfully.</p>
                      <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                        <Link to="/clients">
                          View All Feedback
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-6"
                    >
                      <motion.h3
                        variants={itemVariants}
                        className="text-2xl font-bold text-gray-900 mb-6"
                      >
                        Tell Us About Your Experience
                      </motion.h3>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 focus:shadow-lg"
                          />
                        </motion.div>
                        <motion.div
                          whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 focus:shadow-lg"
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= formData.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 focus:shadow-lg"
                          placeholder="Tell us about your experience..."
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="text-center">
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                                Submitting...
                              </motion.div>
                            ) : (
                              <motion.div
                                key="submit"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                Submit Feedback
                                <Send className="ml-2 h-4 w-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Recent Feedbacks Display */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-6"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-bold text-gray-900 mb-6"
                >
                  Recent Feedbacks
                </motion.h3>

                {feedbacks.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {feedbacks.slice(-3).reverse().map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200 p-1 flex-shrink-0">
                            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg font-bold">{feedback.name.charAt(0).toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-900">{feedback.name}</h4>
                              <div className="flex items-center space-x-1">
                                {renderStars(feedback.rating)}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm italic mb-2">"{feedback.message}"</p>
                            <p className="text-xs text-gray-500">{new Date(feedback.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-12 px-6 bg-gray-50 rounded-2xl"
                  >
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h4 className="text-lg font-bold text-gray-800 mb-2">No Feedbacks Yet</h4>
                    <p className="text-gray-600 text-sm">
                      Be the first to share your experience! Your feedback helps us improve.
                    </p>
                  </motion.div>
                )}

                {feedbacks.length > 3 && (
                  <motion.div variants={itemVariants} className="text-center">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/clients">
                        View All Feedbacks
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeedbackPage;
