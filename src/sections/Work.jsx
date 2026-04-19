import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, TrendingUp, Users, Award, Star } from 'lucide-react';

import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';
import project4 from '../assets/project4.jpg';
import project5 from '../assets/project5.jpg';
import project6 from '../assets/project6.jpg';

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Government College – Digital Campus Transformation',
      category: 'Education',
      description: 'Designed and deployed comprehensive digital ecosystem for government college with 3000+ students including dynamic website, ERP for admissions/hostel, AI-powered canteen system.',
      image: project1,
      results: ['80% reduction in manual administrative workload', 'Real-time student data and reporting', 'Improved transparency in hostel and canteen operations']
    },
    {
      id: 2,
      title: 'Smart Swimming Pool Management System',
      category: 'Fitness',
      description: 'AI-based biometric attendance and pool management for 1000+ daily participants with session timing, automated billing, inventory analytics.',
      image: project2,
      results: ['Accurate attendance with zero proxy entries', 'Automated payment tracking and reporting', 'Inventory optimization and reduced losses']
    },
    {
      id: 3,
      title: 'Medical Equipment Manufacturing Company – Corporate Website',
      category: 'Healthcare',
      description: 'Professional responsive website showcasing complete product portfolio with detailed specs and user-friendly navigation for B2B inquiries.',
      image: project3,
      results: ['Strong digital presence in healthcare sector', 'Improved lead generation and client engagement', 'Clear product presentation for global audiences']
    },
    {
      id: 4,
      title: 'Large-Scale Agro and Lab Chemical Supplier – Business Website',
      category: 'Agriculture',
      description: 'Scalable robust website optimized for performance, accessibility, easy content management to connect with distributors and customers.',
      image: project4,
      results: ['Enhanced brand visibility in chemicals sector', 'Simplified product discovery for customers', 'Increased inquiry conversions']
    },
    {
      id: 5,
      title: 'Security & Manpower Facility Service Provider – Digital Identity',
      category: 'Security',
      description: 'Modern corporate website presenting service offerings, operational strength, client portfolio to attract enterprise clients and government contracts.',
      image: project5,
      results: ['Professional brand positioning', 'Increased trust among corporate clients', 'Improved business inquiries and partnerships']
    },
    {
      id: 6,
      title: 'Real Estate Agency Growth',
      category: 'Real Estate',
      description: 'Digital marketing campaign to boost property listings and client acquisition.',
      image: project6,
      results: ['400% increase in property inquiries', '300% growth in social media engagement', 'Top 10% performer in local market']
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="work" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">Our Portfolio</h2>
          <p className="text-lg bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent max-w-3xl mx-auto">Discover our transformative projects that drive real results for businesses across industries.</p>
        </motion.div>

        <motion.div className="flex justify-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === category ? 'bg-indigo-600 text-white shadow-md' : category === 'All' ? 'bg-white text-black hover:bg-gray-100 shadow-sm' : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm'}`}
              >
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">{project.category}</span>
                </span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">{project.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">Key Results:</h4>
                  {project.results.slice(0,3).map((result, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <TrendingUp className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-sm bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
