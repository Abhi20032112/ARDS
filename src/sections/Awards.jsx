import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock } from 'lucide-react';

const Awards = () => {
  const awards = [
    {
      id: 1,
      title: '100% Success Rate',
      icon: TrendingUp,
      description: 'Consistently delivering results that exceed expectations.'
    },
    {
      id: 2,
      title: '50+ Happy Clients',
      icon: Users,
      description: 'Trusted by businesses across various industries.'
    },
    {
      id: 3,
      title: '24/7 Excellence',
      icon: Clock,
      description: 'Round-the-clock support and dedication to your success.'
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <section id="awards" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Our Achievements</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Milestones that define our commitment to excellence and client satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-lg text-center text-white card-hover"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6 shadow-md">
                <award.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{award.title}</h3>
              <p className="text-white/90 leading-relaxed">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
