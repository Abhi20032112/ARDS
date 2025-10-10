import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">
            About Alpenrose Digital Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a passionate team of digital marketing experts dedicated to helping businesses thrive in the online world. Our mission is to deliver innovative solutions that drive real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div {...fadeIn} className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">The Story Behind Our Startup Journey</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2020, Alpenrose Digital Solutions emerged from a vision to bridge the gap between businesses and their digital potential. Our founders, with over 5 years of combined experience in digital marketing, recognized the need for comprehensive, results-driven marketing services that small and medium-sized businesses could afford and rely on.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a small consultancy has grown into a full-service digital marketing agency, serving clients across various industries. Our commitment to transparency, innovation, and measurable results has been the cornerstone of our success.
            </p>
          </motion.div>
          <motion.div {...fadeIn} transition={{...fadeIn.transition, delay: 0.2}} className="relative">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="Team collaboration" className="rounded-3xl shadow-2xl w-full h-96 object-cover" loading="lazy" />
          </motion.div>
        </div>

        <motion.div {...fadeIn} className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Our Core Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-md">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Mission</h4>
              <p className="text-gray-600">
                To empower businesses with cutting-edge digital marketing strategies that drive growth, engagement, and measurable success in the ever-evolving online landscape.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-md">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Vision</h4>
              <p className="text-gray-600">
                To be the leading digital marketing partner for businesses worldwide, recognized for our innovative approach, exceptional results, and unwavering commitment to client success.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-md">
                <Gem className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Values</h4>
              <p className="text-gray-600">
                Integrity, innovation, collaboration, and excellence. We believe in building long-term partnerships based on trust, transparency, and mutual growth.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeIn} className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-md">
            <a href="#contact">
              Let's Talk
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
