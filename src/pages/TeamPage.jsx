import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/AnimatedNumber';
import vikrantImage from '../assets/Vikrant.jpeg';
import abhiImage from '../assets/Abhijeet.jpeg';

const TeamPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  const teamMembers = [
    { name: "Vikrant Mishra", role: "Founder", image: vikrantImage, bio: "Visionary leader with expertise in digital strategy and brand development." },
    { name: "Abhijeet M Mishra", role: "Head-Tech Support", image: abhiImage, bio: "Technical expert ensuring seamless digital operations and support." },
  ];

  return (
    <>
      <Helmet>
        <title>Our Team - Alpenrose Digital Solutions</title>
        <meta name="description" content="Meet the expert team at Alpenrose Digital Solutions. Learn about our founders and specialists dedicated to your digital success." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold">Meet Our Team</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                The passionate experts behind your digital transformation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Our Experts</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are a team of strategists, creatives, and technologists united by a single goal: to make your brand unforgettable.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg p-8 card-hover text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <motion.img
                      className="w-full h-full rounded-full object-cover shadow-lg"
                      alt={member.name}
                      src={member.image}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-lg text-indigo-600 font-medium mb-4">{member.role}</p>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {member.bio}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeIn} className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-12">Team Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white rounded-3xl p-8 shadow-lg card-hover tilt-card"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-md">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedNumber value={2} suffix="" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Core Team Members</h4>
                  <p className="text-gray-600">
                    Dedicated professionals driving innovation and excellence.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white rounded-3xl p-8 shadow-lg card-hover tilt-card"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-6 shadow-md">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedNumber value={5} suffix="+" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Years Experience</h4>
                  <p className="text-gray-600">
                    Combined expertise in digital marketing and technology.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white rounded-3xl p-8 shadow-lg card-hover tilt-card"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-md">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedNumber value={100} suffix="%" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Client Satisfaction</h4>
                  <p className="text-gray-600">
                    Committed to delivering exceptional results for every client.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeIn} className="text-white space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold">Ready to Work with Us?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Let's collaborate to build something truly remarkable.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link to="/contact">
                  Get In Touch
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

export default TeamPage;
