// src/components/home/Hero.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from '../../../data/heroData.js'; // Đảm bảo đường dẫn này chính xác
import SlideIndicators from './SlideIndicators.jsx'; // Đảm bảo đường dẫn này chính xác

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (currentSlide + 1) % slides.length;
      setCurrentSlide(next);
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Animation variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    // THAY ĐỔI: Gỡ bỏ flexbox, chỉ giữ lại position relative
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Lớp ảnh nền */}
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          initial={{ opacity: 0.8, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.8, scale: 1.1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Lớp phủ tối màu */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* THAY ĐỔI: Khối nội dung chính được định vị tuyệt đối */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end h-full px-4 pb-20 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-4xl"
          >
            <motion.p variants={textItemVariants} className="text-sm font-bold tracking-widest text-sky-300 uppercase mb-3">
              {slides[currentSlide].category}
            </motion.p>
            <motion.h1 variants={textItemVariants} className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p variants={textItemVariants} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </motion.p>
            <motion.div variants={textItemVariants}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-8 rounded-lg shadow-lg text-lg font-semibold flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Explore Tours</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nút điều khiển và chỉ báo được đặt ở z-index cao hơn */}
      <div className="absolute inset-0 z-30">
        <button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
          <ChevronRight size={32} />
        </button>
        <SlideIndicators slidesCount={slides.length} currentSlide={currentSlide} goToSlide={goToSlide} />
      </div>
    </section>
  );
};

export default Hero;