import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Star,
  Zap,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedNumber from "@/components/AnimatedNumber";
import Hero from "@/sections/Hero";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const HomePage = () => {

  const metrics = [
    { icon: Users, value: 50, label: "Happy Clients" },
    { icon: TrendingUp, value: 100, label: "Success Rate" },
    { icon: Star, value: 5, label: "Years Experience" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description:
        "Our streamlined processes get your campaigns running quickly.",
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description:
        "We use data-driven strategies to reach your ideal audience.",
    },
    {
      icon: Star,
      title: "Premium Quality Content",
      description:
        "Our creative team produces compelling content for your brand.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  /* ---------- Slider ---------- */

  const slides = [slide1, slide2, slide3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Best Digital Marketing Agency | Alpenrose Digital Solutions</title>
        <meta
          name="description"
          content="Alpenrose Digital Solutions provides digital marketing, branding, web development, and IT solutions."
        />
      </Helmet>

      {/* HERO */}
      <Hero />

      {/* ---------- METRICS ---------- */}

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

          {metrics.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <Icon className="mx-auto mb-4 text-primary" size={36} />

                <h3 className="text-3xl font-bold">
                  <AnimatedNumber value={item.value} />+
                </h3>

                <p className="text-gray-500">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <motion.h2
            className="text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Why Choose Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">

            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-8 rounded-xl border hover:shadow-xl transition"
                >
                  <Icon className="mb-4 text-primary" size={32} />

                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- IMAGE SLIDER ---------- */}

      <section className="py-24 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6">

          <div className="relative rounded-3xl overflow-hidden shadow-lg">

            <motion.img
              key={index}
              src={slides[index]}
              alt="slider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[420px] object-cover"
            />

            <button
              onClick={() =>
                setIndex((index - 1 + slides.length) % slides.length)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setIndex((index + 1) % slides.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              ›
            </button>

          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}

      <section className="py-28 bg-black text-white text-center">

        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Ready to Grow Your Business?
        </motion.h2>

        <p className="max-w-xl mx-auto text-gray-300 mb-10">
          Let Alpenrose Digital Solutions help you scale your brand with
          digital marketing, branding, and web development.
        </p>

        <Link to="/contact">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started
            <ArrowRight className="ml-2" />
          </Button>
        </Link>

      </section>
    </>
  );
};

export default HomePage;