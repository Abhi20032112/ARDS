import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Share2, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedTypewriter from '@/components/AnimatedTypewriter';
import DigitalUniverseCanvas from '../components/DigitalUniverseCanvas.jsx';
import ServiceCharacter from '../components/ServiceCharacter.jsx';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section id="hero" className="relative universe-gradient text-white overflow-hidden pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Hero Content */}
          <motion.div variants={itemVariants} className="space-y-8 text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                <AnimatedTypewriter 
                  texts={["Welcome to the", "Digital Growth Universe"]}
                  speed={80}
                />
              </h1>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-cyan-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-md"
            >
              We help brands grow through creativity, technology, and data-driven strategy. 
              Explore our universe of digital services.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="glow-hover bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg px-10 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-cyan-500/50 backdrop-blur-sm border border-cyan-300/30"
                >
                  <a href="#services" className="flex items-center gap-2">
                    Explore Universe
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative z-20">
              <DigitalUniverseCanvas />
            </div>
            
            {/* Hero Character */}
            <motion.div 
              className="absolute -bottom-32 lg:-bottom-24 right-8 lg:right-16 w-64 lg:w-80 h-64 lg:h-80 z-30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 1, type: 'spring' }}
            >
              <ServiceCharacter type="strategist" size={300} />
            </motion.div>

            {/* Floating Service Icons */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 lg:w-48 h-32 lg:h-48 z-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                {[Share2, Target, BarChart3].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl text-white/60 glow-hover"
                    style={{ 
                      left: '50%', 
                      top: '50%',
                      width: '60px',
                      height: '60px'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ 
                      rotate: -360,
                      x: [60, 80, 60][i % 3],
                      y: [-20, 10, 30][i % 3]
                    }}
                    transition={{ 
                      duration: 10 + i * 3, 
                      repeat: Infinity,
                      delay: i * 1
                    }}
                  >
                    <Icon />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-32 lg:h-48 transform rotate-180 fill-current text-universe-gradient opacity-90" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

