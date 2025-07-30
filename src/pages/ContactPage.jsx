import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      const newContact = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      localStorage.setItem('contacts', JSON.stringify([newContact, ...existingContacts]));
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast({ title: "Success!", description: "Thank you for contacting us! We'll get back to you within 24 hours." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'Our Location', details: 'Patna, Bihar, India', description: 'Visit our office for consultations' },
    { icon: Phone, title: 'Phone Number', details: '+91 9308579699', description: 'Call us for immediate assistance' },
    { icon: Mail, title: 'Email Address', details: 'business@ards.in', description: 'Send us an email anytime' },
    { icon: Clock, title: 'Business Hours', details: 'Mon - Fri: 9 AM - 6 PM', description: 'We respond within 24 hours' },
  ];
  
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Alpenrose Digital Solutions</title>
        <meta name="description" content="Get in touch with Alpenrose Digital Solutions. Contact us for digital marketing services, consultations, and business inquiries. We're here to help grow your business." />
      </Helmet>

      <div className="page-container">
        <section className="hero-gradient py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold">Contact Us</h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
                Ready to transform your digital presence? Let's start a conversation about how we can help your business grow.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }} viewport={{ once: true }} className="bg-white rounded-3xl p-6 shadow-lg text-center card-hover">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-md">
                    <info.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-indigo-600 font-semibold mb-2">{info.details}</p>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div {...fadeIn} className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold gradient-text mb-4">Send Us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="e.g. John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="e.g. john.doe@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" placeholder="e.g. +91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Tell us about your project or how we can help you..."></textarea>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-md">
                    {isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Sending...</> : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </motion.div>
              <motion.div {...fadeIn} transition={{...fadeIn.transition, delay: 0.2}} className="space-y-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <img  class="w-full h-64 object-cover" alt="Alpenrose Digital Solutions office team in a meeting" src="https://images.unsplash.com/photo-1690191886622-fd8d6cda73bd" />
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Alpenrose?</h3>
                    <ul className="space-y-2 text-gray-600">
                      {[
                        "Expert team with 5+ years experience",
                        "Proven track record of success",
                        "24/7 dedicated customer support",
                        "Customized solutions for every business"
                      ].map(item => (
                        <li key={item} className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-3 shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;