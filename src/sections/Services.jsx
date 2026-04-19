import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Target, Palette, BarChart3, PenTool, Lightbulb, Megaphone, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/AnimatedNumber';

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Social Media Management',
      icon: Share2,
      description: 'Comprehensive social media strategy and management to boost your online presence and engagement.',
      details: 'Our social media management service includes content creation, community engagement, analytics tracking, and strategic planning to grow your brand across all major platforms.',
      features: ['Content Creation & Scheduling', 'Community Management', 'Performance Analytics', 'Brand Voice Development', 'Crisis Management', 'Competitor Analysis']
    },
    {
      id: 2,
      title: 'Ad Campaigns',
      icon: Target,
      description: 'Targeted advertising campaigns across multiple platforms to maximize your ROI and reach.',
      details: 'We design and execute high-converting ad campaigns on Facebook, Instagram, Google Ads, and other platforms, ensuring optimal targeting and budget efficiency.',
      features: ['Multi-Platform Advertising', 'Audience Targeting', 'A/B Testing', 'Conversion Tracking', 'Budget Optimization', 'Performance Reporting']
    },
    {
      id: 3,
      title: 'Brand Identity',
      icon: Palette,
      description: 'Complete brand identity design including logos, color schemes, and brand guidelines.',
      details: 'Our branding services help establish a strong visual identity that resonates with your target audience and sets you apart from competitors.',
      features: ['Logo Design', 'Brand Guidelines', 'Color Palette Selection', 'Typography', 'Brand Voice', 'Visual Assets']
    },
    {
      id: 4,
      title: 'Analytics & Insights',
      icon: BarChart3,
      description: 'In-depth analytics and reporting to track performance and make data-driven decisions.',
      details: 'We provide comprehensive analytics services to monitor your digital marketing efforts and uncover insights that drive strategic improvements.',
      features: ['Performance Tracking', 'Custom Dashboards', 'ROI Analysis', 'Competitor Insights', 'Trend Analysis', 'Monthly Reports']
    },
    {
      id: 5,
      title: 'Content Marketing',
      icon: PenTool,
      description: 'Engaging content creation and distribution strategies to attract and retain customers.',
      details: 'Our content marketing services focus on creating valuable, shareable content that positions your brand as an industry leader.',
      features: ['Blog Writing', 'Video Production', 'Infographic Design', 'Email Marketing', 'SEO Content', 'Content Strategy']
    },
    {
      id: 6,
      title: 'IT Infrastructure Solutions',
      icon: Lightbulb,
      description: 'Robust IT infrastructure setup and maintenance to support your digital operations.',
      details: 'We provide end-to-end IT solutions including website development, hosting, security, and technical support to ensure your digital presence is reliable and secure.',
      features: ['Website Development', 'Cloud Hosting', 'Security Solutions', 'Technical Support', 'System Integration', 'Performance Optimization']
    },
    {
      id: 7,
      title: 'Political Campaign Management',
      icon: Megaphone,
      description: 'Strategic digital campaign management for political candidates to engage voters and amplify messages.',
      details: 'Our political campaign services leverage digital tools to create compelling narratives, target key demographics, and drive voter engagement through social media, advertising, and content strategies.',
      features: ['Social Media Strategy', 'Targeted Advertising', 'Content Creation', 'Voter Engagement', 'Analytics & Reporting', 'Crisis Management']
    },
    {
      id: 8,
      title: 'Web Development',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, rotateY: 5, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover group tilt-card reveal-fade stagger-1"
            >
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-md icon-spin">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, expandedService === service.id ? service.features.length : 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.features.length > 3 && (
                    <Button
                      variant="outline"
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full mt-4 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      {expandedService === service.id ? 'Show Less' : 'Read More'}
                    </Button>
                  )}
                </div>
              </div>
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
