import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    const existingFeedback = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(existingFeedback));
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', rating: 5 });
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
              {submitted ? (
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
                  <p className="text-lg text-gray-600">Your feedback has been submitted successfully.</p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Link to="/clients">
                      View Feedback
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
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
                      whileFocus={{ scale: 1.02 }}
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
                  </div>
                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          whileHover={{ scale: 1.1 }}
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
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Tell us about your experience..."
                    />
                  </div>
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                      Submit Feedback
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeedbackPage;
