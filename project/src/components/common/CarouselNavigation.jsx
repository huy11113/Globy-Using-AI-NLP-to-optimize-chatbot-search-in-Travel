import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselNavigation = () => (
  <>
    <button
      aria-label="Previous Tour"
      className="tour-swiper-button-prev absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-slate-800" />
    </button>
    <button
      aria-label="Next Tour"
      className="tour-swiper-button-next absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-slate-800" />
    </button>
  </>
);

// Đảm bảo bạn có dòng này ở cuối file
export default CarouselNavigation;