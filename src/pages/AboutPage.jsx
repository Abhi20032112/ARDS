import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Gem, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import vikrantImage from '../assets/Vikrant.jpeg';
import abhiImage from '../assets/Abhijeet.jpeg';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  const values = [
    { icon: Target, title: "Our Mission", description: "To empower businesses of all sizes to thrive in the digital landscape through innovative, data-driven marketing strategies that deliver measurable results and foster sustainable growth." },
    { icon: Eye, title: "Our Vision", description: "To be the most trusted and results-oriented digital marketing partner, renowned for our creativity, strategic excellence, and unwavering commitment to client success." },
    { icon: Gem, title: "Our Values", description: "We operate with integrity, champion innovation, foster collaboration, and are passionately dedicated to our clients' success. Excellence is not an act, but a habit." }
  ];

  const teamMembers = [
    { name: "Vikrant Mishra", role: "Founder", image: vikrantImage },
    { name: "Abhijeet M Mishra", role: "Head-Tech Support", image: abhiImage },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Alpenrose Digital Solutions</title>
        <meta name="description" content="Learn about Alpenrose Digital Solutions. Discover our mission, vision, values, and the expert team dedicated to driving your digital success." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold">About Alpenrose Digital Solutions</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                We are a passionate team of digital experts dedicated to helping your brand shine in the crowded digital world.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-3xl lg:text-4xl font-extrabold gradient-text mb-6">The Story Behind Our Startup Journey</h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  Alpenrose Digital Solutions was born from a simple yet powerful belief: every brand, no matter how small, deserves a digital identity that reflects its ambition. What started as a few passionate minds with laptops and big ideas has grown into a close-knit team of creators, strategists, and problem-solvers — all driven by purpose and innovation.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  As a rising startup, we’ve already had the privilege to work with forward-thinking clients and bring their visions to life. Our journey is shaped by creative collaboration, a deep focus on results, and an unshakable commitment to building digital solutions that matter. We're just getting started — and the best is yet to come.
                </p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="h-96">
                <img className="w-full h-full object-cover rounded-3xl shadow-xl" alt="A team of professionals collaborating in a modern office" src="https://images.unsplash.com/photo-1573165231977-3f0e27806045" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Our Core Philosophy</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-3xl bg-gray-50 shadow-lg card-hover border border-gray-200/50"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-5 shadow-md">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Meet Our Experts</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are a team of strategists, creatives, and technologists united by a single goal: to make your brand unforgettable.
              </p>
            </motion.div>

            {/* ✅ CENTERED TEAM IMAGES */}
            <div className="flex justify-center flex-wrap gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img className="w-full h-full rounded-full object-cover shadow-lg" alt={member.name} src={member.image} />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all duration-300 transform group-hover:scale-110"></div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeIn} className="text-white space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold">Join Us On Our Journey</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Let's collaborate to build something truly remarkable. Your success story starts here.
              </p>
              <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link to="/contact">
                  Let's Talk
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

export default AboutPage;
