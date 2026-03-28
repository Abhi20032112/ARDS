import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, Target, Palette, BarChart3, PenTool, Lightbulb, Megaphone, Code, Database, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
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
    {
      icon: Database,
      title: 'ERP & Payroll Solutions',
      description: 'Comprehensive ERP and payroll management systems to streamline business operations and employee management.',
      details: 'We provide end-to-end ERP and payroll solutions including system implementation, customization, integration, and ongoing support to optimize your business processes and ensure accurate payroll management.',
      features: ['ERP Implementation', 'Payroll Management', 'System Integration', 'Custom Reporting'],
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
        <meta name="description" content="Comprehensive digital marketing services including social media management, ad campaigns, brand identity, analytics, content marketing, ERP & payroll solutions, and digital strategy." />
      </Helmet>

      <div className="page-container">
        <section className="relative universe-gradient py-24 lg:py-32 text-white overflow-hidden">
          <div className="absolute inset-0">
            <canvas className="w-full h-full"></canvas>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div 
                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 glow-hover"
                whileHover={{ scale: 1.05 }}
              >
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Service Universe
                </h1>
              </motion.div>
              <p className="text-2xl lg:text-3xl text-cyan-100/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                Explore every digital service as its own vibrant world, complete with unique characters and environments.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
              {services.map((service, index) => {
                const serviceData = {
                  social: { type: 'social', worldClass: 'social-world' },
                  ads: { type: 'ads', worldClass: 'ads-world' },
                  brand: { type: 'brand', worldClass: 'brand-world' },
                  analytics: { type: 'analytics', worldClass: 'analytics-world' },
                  content: { type: 'content', worldClass: 'content-world' },
                  infrastructure: { type: 'it', worldClass: 'it-world' },
                  political: { type: 'political', worldClass: 'political-world' },
                  web: { type: 'web', worldClass: 'web-world' },
                  erp: { type: 'it', worldClass: 'it-world' }
                }[service.title.toLowerCase().replace(/ & | solutions/gi, '').replace(/ /g, '').toLowerCase()] || { type: 'social', worldClass: 'social-world' };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotateX: 10 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className={`relative rounded-3xl p-10 shadow-2xl overflow-hidden group cursor-pointer glow-hover ${serviceData.worldClass}`}
                  >
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                    
                    {/* World Canvas BG */}
                    <div className="absolute inset-0 opacity-10">
                      <canvas className="w-full h-full"></canvas>
                    </div>
                    
                    <div className="relative z-20">
                      <div className="flex flex-col items-center space-y-8 mb-12">
                        <ServiceCharacter type={serviceData.type} size={200} />
                        <service.icon className="h-16 w-16 text-white/80 backdrop-blur-sm p-4 rounded-3xl bg-white/10 shadow-xl glow-hover" />
                      </div>
                      
                      <div className="text-center space-y-6">
                        <motion.h3 
                          className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl"
                          whileHover={{ y: -6 }}
                        >
                          {service.title}
                        </motion.h3>
                        <p className="text-xl text-white/90 leading-relaxed max-w-lg mx-auto">{service.description}</p>
                        
                        {/* Power Preview */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-2xl text-white">Core Powers:</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {service.features.slice(0, 4).map((power, pidx) => (
                              <div key={pidx} className="flex items-center p-3 bg-white/10 rounded-2xl glow-hover hover:bg-white/20">
                                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-4 animate-pulse" />
                                <span className="text-white font-semibold">{power}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => toggleExpanded(index)}
                          className="w-full mt-8 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 hover:border-white text-white font-bold glow-hover"
                          variant="outline"
                        >
                          {expandedCard === index ? 'Close Portal' : 'Enter World'}
                          <ArrowRight className={`ml-auto h-5 w-5 transition-transform ${expandedCard === index ? 'rotate-90' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    {/* Expanded World Portal */}
                    {expandedCard === index && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent/0 backdrop-blur-2xl p-12 flex flex-col z-30"
                      >
                        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                          <ServiceCharacter type={serviceData.type} size={280} />
                          <div>
                            <h3 className="text-5xl font-black text-white mb-6 drop-shadow-2xl">{service.title} Realm</h3>
                            <p className="text-2xl text-cyan-300 max-w-2xl mx-auto leading-relaxed">{service.details}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                            {service.features.map((feat, fidx) => (
                              <motion.div 
                                key={fidx}
                                className="group flex items-center p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl backdrop-blur-lg border border-white/20 glow-hover hover:from-white/20 hover:scale-[1.02]"
                                whileHover={{ x: 8 }}
                              >
                                <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mr-6 shrink-0" />
                                <span className="text-xl text-white font-semibold">{feat}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
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