import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg p-8 card-hover text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img className="w-full h-full rounded-full object-cover shadow-lg" alt={member.name} src={member.image} />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-lg text-indigo-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
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
