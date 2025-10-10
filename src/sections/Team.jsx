import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code } from 'lucide-react';

import vikrant from '../assets/Vikrant.jpeg';
import abhijeet from '../assets/Abhijeet.jpeg';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Vikrant Mishra',
      role: 'Founder & CEO',
      image: vikrant,
      description: 'Visionary leader with 5+ years in digital marketing, driving innovation and growth for Alpenrose Digital Solutions.',
      icon: Users
    },
    {
      id: 2,
      name: 'Abhijeet M Mishra',
      role: 'Head of Technical Support',
      image: abhijeet,
      description: 'Technical expert ensuring seamless digital infrastructure and exceptional client support.',
      icon: Code
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate professionals behind Alpenrose Digital Solutions, dedicated to your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500 border-4 border-white group-hover:border-indigo-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <member.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-indigo-600 font-semibold mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
