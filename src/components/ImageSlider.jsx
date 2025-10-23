import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageSlider = ({ projects }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage([page + 1, 1]);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  const nextSlide = () => {
    setPage([page + 1, 1]);
  };

  const prevSlide = () => {
    setPage([page - 1, -1]);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="w-full h-96 relative"
        >
          <img
            src={projects[Math.abs(page) % projects.length].image}
            alt={projects[Math.abs(page) % projects.length].title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              {projects[Math.abs(page) % projects.length].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg"
            >
              {projects[Math.abs(page) % projects.length].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition"
        aria-label="Next slide"
      >
        ›
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {projects.map((_, index) => {
          const currentIndex = Math.abs(page) % projects.length;
          const direction = index > currentIndex ? 1 : index < currentIndex ? -1 : 0;
          return (
            <button
              key={index}
              onClick={() => setPage([index, direction])}
              className={`w-3 h-3 rounded-full transition ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
