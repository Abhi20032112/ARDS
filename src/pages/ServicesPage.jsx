import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, Target, Palette, BarChart3, PenTool, Lightbulb, Megaphone, Code, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const services = [
    {
      icon: Share2,
      title: 'Social Media Management',
      description: 'Comprehensive social media strategy and management across all platforms.',
      details: 'Our social media management service includes content creation, posting schedules, community management, engagement tracking, and performance analytics. We help you build a strong online presence across Facebook, Instagram, LinkedIn, Twitter, and other relevant platforms for your business.',
      features: ['Content Creation', 'Daily Posting', 'Community Management', 'Analytics & Reporting'],
    },
    {
      icon: Target,
      title: 'Ad Campaigns',
      description: 'Targeted advertising campaigns that deliver measurable results.',
      details: 'We create and manage high-converting ad campaigns across Google Ads, Facebook Ads, Instagram Ads, and LinkedIn Ads. Our data-driven approach ensures optimal ROI through precise targeting, compelling ad copy, and continuous optimization.',
      features: ['Google Ads', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'Campaign Optimization'],
    },
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Complete brand identity design and development services.',
      details: 'From logo design to complete brand guidelines, we help you create a memorable brand identity that resonates with your target audience. Our services include logo design, color palette selection, typography, brand voice development, and brand guideline creation.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Deep analytics and actionable insights for your digital presence.',
      details: 'We provide comprehensive analytics and reporting services to track your digital marketing performance. Our detailed reports include website analytics, social media insights, campaign performance, and actionable recommendations for improvement.',
      features: ['Performance Tracking', 'Custom Reports', 'ROI Analysis', 'Strategic Recommendations'],
    },
    {
      icon: PenTool,
      title: 'Content Marketing',
      description: 'Engaging content that tells your brand story effectively.',
      details: 'Our content marketing service includes blog writing, video content creation, infographic design, email marketing campaigns, and content strategy development. We create compelling content that engages your audience and drives conversions.',
      features: ['Blog Writing', 'Video Content', 'Email Marketing', 'Content Strategy'],
    },
    {
      icon: Lightbulb,
      title: 'IT Infrastructure Solutions',
      description: 'Reliable and scalable IT infrastructure services for seamless business operations.',
      details: 'We provide end-to-end IT infrastructure solutions including server management, cloud setup, network security, and system monitoring to ensure your business runs smoothly and securely.',
      features:  ['Server Setup & Management', 'Cloud Infrastructure', 'Network Security', 'System Monitoring'],
    },
    {
      icon: Megaphone,
      title: 'Political Campaign Management',
      description: 'Strategic digital campaign management for political candidates to engage voters and amplify messages.',
      details: 'Our political campaign services leverage digital tools to create compelling narratives, target key demographics, and drive voter engagement through social media, advertising, and content strategies.',
      features: ['Social Media Strategy', 'Targeted Advertising', 'Content Creation', 'Voter Engagement'],
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web development solutions to build modern, responsive, and user-friendly websites.',
      details: 'From concept to deployment, we create scalable websites using the latest technologies, ensuring optimal performance, security, and user experience.',
      features: ['Responsive Design', 'Custom Development', 'E-commerce Solutions', 'SEO Optimization'],
    },
  ];

  const toggleExpanded = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
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
        <title>Our Services - Alpenrose Digital Solutions</title>
        <meta name="description" content="Comprehensive digital marketing services including social media management, ad campaigns, brand identity, analytics, content marketing, and digital strategy." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-extrabold">Our Services</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Comprehensive digital marketing solutions designed to grow your business and enhance your online presence.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover flex flex-col tilt-card"
                >
                  <div className="p-8 flex-grow">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-md">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden space-y-4"
                      >
                        <p className="text-gray-700 leading-relaxed">{service.details}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Key Features:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="text-gray-600 text-sm flex items-center">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="p-8 pt-0">
                    <Button
                      onClick={() => toggleExpanded(index)}
                      variant="outline"
                      className="w-full mt-4 border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {expandedCard === index ? 'Show Less' : 'Read More'}
                      {expandedCard === index ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeIn} className="text-white space-y-8">
              <h2 className="text-4xl lg:text-5xl font-extrabold">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Let's discuss how our services can help transform your digital presence and grow your business.
              </p>
               <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link to="/contact">
                  Contact Us Today
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

export default ServicesPage;