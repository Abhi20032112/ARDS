import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Gem, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import vikrantImage from "../assets/Vikrant.jpeg";
import abhiImage from "../assets/Abhijeet.jpeg";

const AboutPage = () => {

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true },
  };

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower businesses with innovative digital marketing strategies that deliver measurable results and sustainable growth.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the most trusted digital marketing partner known for creativity, strategy, and measurable success.",
    },
    {
      icon: Gem,
      title: "Our Values",
      description:
        "Integrity, innovation, collaboration, and an unwavering commitment to excellence define our work culture.",
    },
  ];

  const teamMembers = [
    {
      name: "Vikrant Mishra",
      role: "Founder",
      image: vikrantImage,
    },
    {
      name: "Abhijeet M Mishra",
      role: "Head-Tech Support",
      image: abhiImage,
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          About Alpenrose Digital Solutions | Best Digital Marketing Agency Patna
        </title>

        <meta
          name="description"
          content="Learn about Alpenrose Digital Solutions, a leading digital marketing agency in Patna offering branding, social media management, and web development."
        />

        <meta
          name="keywords"
          content="digital marketing agency Patna, SEO company Patna, web development Patna, social media management Patna"
        />
      </Helmet>

      {/* HERO SECTION */}

      <section className="hero-gradient py-24 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto px-6 space-y-6"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold">
            About Alpenrose Digital Solutions
          </h1>

          <p className="text-xl text-white/90">
            A passionate team of digital experts helping brands grow through
            strategy, creativity, and technology.
          </p>
        </motion.div>
      </section>

      {/* STORY SECTION */}

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Our Journey
            </h2>

            <p className="text-lg text-gray-600 mb-4">
              Alpenrose Digital Solutions is a fast-growing digital marketing
              agency helping businesses establish a strong digital presence.
            </p>

            <p className="text-lg text-gray-600">
              From branding and content marketing to web development and
              political campaign management, we combine creativity with
              data-driven strategy to deliver results.
            </p>
          </motion.div>

          <motion.img
            {...fadeIn}
            className="rounded-3xl shadow-xl"
            src="https://images.unsplash.com/photo-1573165231977-3f0e27806045"
            alt="team meeting"
          />

        </div>
      </section>

      {/* VALUES SECTION */}

      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-5xl font-extrabold gradient-text">
              Our Core Philosophy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition"
                >

                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {value.title}
                  </h3>

                  <p className="text-gray-600">
                    {value.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* TEAM SECTION */}

      <section className="py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <motion.div {...fadeIn} className="mb-16">

            <h2 className="text-5xl font-extrabold gradient-text mb-6">
              Meet Our Experts
            </h2>

            <p className="text-lg text-gray-600">
              A team of strategists, developers, and creators committed to
              your digital success.
            </p>

          </motion.div>

          <div className="flex justify-center flex-wrap gap-10">

            {teamMembers.map((member, index) => (

              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >

                <div className="relative w-36 h-36 mx-auto mb-4">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full shadow-lg"
                  />

                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition"></div>

                </div>

                <h3 className="font-bold text-lg">
                  {member.name}
                </h3>

                <p className="text-indigo-600 text-sm">
                  {member.role}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

      {/* CTA SECTION */}

      <section className="py-24 hero-gradient text-center text-white">

        <motion.div {...fadeIn} className="max-w-3xl mx-auto px-6">

          <h2 className="text-5xl font-extrabold mb-6">
            Let's Build Something Great
          </h2>

          <p className="text-lg text-white/90 mb-10">
            Partner with Alpenrose Digital Solutions and take your brand
            to the next level.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 rounded-full font-bold"
          >

            <Link to="/contact">
              Let's Talk
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

          </Button>

        </motion.div>

      </section>
    </>
  );
};

export default AboutPage;