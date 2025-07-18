import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselNavigation = () => (
  <>
    <button 
      aria-label="Previous Slide"
      className="destination-swiper-button-prev absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronLeft className="w-7 h-7 text-slate-800"/>
    </button>
    <button 
      aria-label="Next Slide"
      className="destination-swiper-button-next absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronRight className="w-7 h-7 text-slate-800"/>
    </button>
  </>
);

export default CarouselNavigation;