import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselNavigation = () => (
  <>
    <button
      aria-label="Previous Slide"
      className="tour-swiper-button-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                 absolute top-1/2 left-0 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 
                 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white 
                 flex items-center justify-center"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>

    <button
      aria-label="Next Slide"
      className="tour-swiper-button-next opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                 absolute top-1/2 right-0 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 
                 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white 
                 flex items-center justify-center"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  </>
);

export default CarouselNavigation;
