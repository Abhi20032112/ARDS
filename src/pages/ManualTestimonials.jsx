import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function ManualTestimonials({ testimonials }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const next = () => setIndex((i) => (i + 1) % testimonials.length);
    timeoutRef.current = setInterval(next, 4500);
    return () => clearInterval(timeoutRef.current);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(index, index + 3).map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 card-hover relative flex flex-col h-full tilt-card"
          >
            <Quote className="absolute top-6 right-6 h-10 w-10 text-indigo-100" />
            <div className="flex items-center mb-6 z-10">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-indigo-200 p-1">
                <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{t.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                <p className="text-sm text-gray-600">{new Date(t.date).toLocaleDateString()}</p>
              </div>
            </div>

            <motion.div 
              className="flex items-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Star
                    className={`h-5 w-5 ${
                      idx < t.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            <p className="text-gray-700 leading-relaxed italic flex-grow">"{t.message}"</p>
          </motion.div>
        ))}
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
        <motion.button
          aria-label="Prev testimonials"
          onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ‹
        </motion.button>
        <motion.button
          aria-label="Next testimonials"
          onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ›
        </motion.button>
      </div>
    </div>
  );
}
