// src/components/SlideIndicators.jsx
import React from 'react';

const SlideIndicators = ({ slidesCount, currentSlide, goToSlide }) => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
    {Array.from({ length: slidesCount }).map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ease-in-out ${
          currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

export default SlideIndicators;