import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// Lottie URLs from Lottiefiles (free/public)
const characterAnimations = {
  strategist: 'https://assets4.lottiefiles.com/packages/lf20_1mnkwoqw.json', // waving character
  social: 'https://assets1.lottiefiles.com/packages/lf20_tskh5p4r.json', // social media
  ads: 'https://assets4.lottiefiles.com/packages/lf20_y7dhe6ws.json', // rocket/target
  brand: 'https://assets3.lottiefiles.com/packages/lf20_uymrxnpa.json', // paint/creative
  analytics: 'https://assets2.lottiefiles.com/packages/lf20_qxumaqdm.json', // charts/graph
  content: 'https://assets1.lottiefiles.com/packages/lf20_oehnnrur.json', // writing/content
  it: 'https://assets4.lottiefiles.com/packages/lf20_jwngvawh.json', // servers/tech
  political: 'https://assets9.lottiefiles.com/packages/lf20_zmohqtcv.json', // megaphone/crowd
  web: 'https://assets3.lottiefiles.com/packages/lf20_oehnnrur.json', // code/building
  contact: 'https://assets4.lottiefiles.com/packages/lf20_1mnkwoqw.json' // friendly guide
};

const ServiceCharacter = ({ type, className = '', size = 200, hoverEffect = true, ...props }) => {
  const animationData = characterAnimations[type] || characterAnimations.strategist;

  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={hoverEffect ? { scale: 1.1, rotate: 5 } : {}}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="glow-hover">
        <Lottie 
          animationData={null}
          path={animationData}
          className={`w-[${size}px] h-[${size}px] mx-auto ${type === 'it' ? 'filter grayscale brightness-150' : ''}`}
          loop
          autoplay
          renderer="svg"
        />
      </div>
      
      {/* Orbiting icons for strategist */}
      {type === 'strategist' && (
        <motion.div 
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {['social', 'ads', 'analytics'].map((icon, i) => (
            <motion.div
              key={icon}
              className="absolute text-cyan-300 text-xl"
              style={{ 
                left: '50%', 
                top: '50%',
                width: '40px',
                height: '40px'
              }}
              animate={{ 
                rotate: -360,
                x: [80, 100, 80],
                y: [0, 20, 40]
              }}
              transition={{ 
                duration: 8 + i * 2, 
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              💫
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceCharacter;

