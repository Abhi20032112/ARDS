import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Target, Palette, BarChart3, PenTool, Lightbulb, Megaphone, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/AnimatedNumber';
import ServiceCharacter from '../ServiceCharacter';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Social Media Management',
      type: 'social',
      worldClass: 'social-world',
      icon: Share2,
      description: 'Comprehensive social media strategy and management to boost your online presence and engagement.',
      details: 'Our social media management service includes content creation, community engagement, analytics tracking, and strategic planning to grow your brand across all major platforms.',
      features: ['Content Creation & Scheduling', 'Community Management', 'Performance Analytics', 'Brand Voice Development', 'Crisis Management', 'Competitor Analysis']
    },
    {
      id: 2,
      title: 'Ad Campaigns',
      type: 'ads',
      worldClass: 'ads-world',
      icon: Target,
      description: 'Targeted advertising campaigns across multiple platforms to maximize your ROI and reach.',
      details: 'We design and execute high-converting ad campaigns on Facebook, Instagram, Google Ads, and other platforms, ensuring optimal targeting and budget efficiency.',
      features: ['Multi-Platform Advertising', 'Audience Targeting', 'A/B Testing', 'Conversion Tracking', 'Budget Optimization', 'Performance Reporting']
    },
    {
      id: 3,
      title: 'Brand Identity',
      type: 'brand',
      worldClass: 'brand-world',
      icon: Palette,
      description: 'Complete brand identity design including logos, color schemes, and brand guidelines.',
      details: 'Our branding services help establish a strong visual identity that resonates with your target audience and sets you apart from competitors.',
      features: ['Logo Design', 'Brand Guidelines', 'Color Palette Selection', 'Typography', 'Brand Voice', 'Visual Assets']
    },
    {
      id: 4,
      title: 'Analytics & Insights',
      type: 'analytics',
      worldClass: 'analytics-world',
      icon: BarChart3,
      description: 'In-depth analytics and reporting to track performance and make data-driven decisions.',
      details: 'We provide comprehensive analytics services to monitor your digital marketing efforts and uncover insights that drive strategic improvements.',
      features: ['Performance Tracking', 'Custom Dashboards', 'ROI Analysis', 'Competitor Insights', 'Trend Analysis', 'Monthly Reports']
    },
    {
      id: 5,
      title: 'Content Marketing',
      type: 'content',
      worldClass: 'content-world',
      icon: PenTool,
      description: 'Engaging content creation and distribution strategies to attract and retain customers.',
      details: 'Our content marketing services focus on creating valuable, shareable content that positions your brand as an industry leader.',
      features: ['Blog Writing', 'Video Production', 'Infographic Design', 'Email Marketing', 'SEO Content', 'Content Strategy']
    },
    {
      id: 6,
      title: 'IT Infrastructure Solutions',
      type: 'it',
      worldClass: 'it-world',
      icon: Lightbulb,
      description: 'Robust IT infrastructure setup and maintenance to support your digital operations.',
      details: 'We provide end-to-end IT solutions including website development, hosting, security, and technical support to ensure your digital presence is reliable and secure.',
      features: ['Website Development', 'Cloud Hosting', 'Security Solutions', 'Technical Support', 'System Integration', 'Performance Optimization']
    },
    {
      id: 7,
      title: 'Political Campaign Management',
      type: 'political',
      worldClass: 'political-world',
      icon: Megaphone,
      description: 'Strategic digital campaign management for political candidates to engage voters and amplify messages.',
      details: 'Our political campaign services leverage digital tools to create compelling narratives, target key demographics, and drive voter engagement through social media, advertising, and content strategies.',
      features: ['Social Media Strategy', 'Targeted Advertising', 'Content Creation', 'Voter Engagement', 'Analytics & Reporting', 'Crisis Management']
    },
    {
      id: 8,
      title: 'Web Development',
      type: 'web',
      worldClass: 'web-world',
      icon: Code,
      description: 'Custom web development solutions to build modern, responsive, and user-friendly websites.',
      details: 'From concept to deployment, we create scalable websites using the latest technologies, ensuring optimal performance, security, and user experience.',
      features: ['Responsive Design', 'Custom Development', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization', 'Maintenance & Support']
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-6">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive digital marketing solutions tailored to your business needs. From social media management to advanced analytics, we've got you covered.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotateX: 8, rotateY: 5 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden group cursor-pointer glow-hover ${service.worldClass}`}
            >
              {/* World Background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
              
              <div className="relative z-10 h-48 lg:h-56 flex flex-col items-center justify-center space-y-6">
                {/* Service Character */}
                <ServiceCharacter type={service.type} size={160} hoverEffect={true} />
                
                {/* Icon Backup */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg glow-hover">
                  <service.icon className="h-9 w-9 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <div className="relative z-10 mt-8 text-center">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-black text-white mb-4 drop-shadow-lg"
                  whileHover={{ y: -4 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-white/90 text-lg leading-relaxed mb-8">{service.description}</p>
                
                {/* Features Preview */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-bold text-white text-lg">Key Powers:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-cyan-200 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3 animate-pulse" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Expand CTA */}
                {service.features.length > 2 && (
                  <Button
                    variant="ghost"
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                    className="w-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all glow-hover"
                  >
                    {expandedService === service.id ? 'Close Portal' : 'Enter World'}
                    <ArrowRight className={`ml-auto h-4 w-4 transition-transform ${expandedService === service.id ? 'rotate-90' : ''}`} />
                  </Button>
                )}
              </div>

              {/* Expanded Content Overlay */}
              {expandedService === service.id && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent backdrop-blur-md flex flex-col p-8 lg:p-12 z-20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="text-center space-y-6 flex-1 flex flex-col justify-center">
                    <ServiceCharacter type={service.type} size={200} />
                    <h3 className="text-4xl font-black text-white mb-4">{service.title} World</h3>
                    <p className="text-xl text-cyan-200 max-w-md mx-auto leading-relaxed">{service.details}</p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-white/10 rounded-xl glow-hover">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3" />
                          <span className="text-white font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeIn} className="text-center mt-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-md">
            <a href="#contact">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
