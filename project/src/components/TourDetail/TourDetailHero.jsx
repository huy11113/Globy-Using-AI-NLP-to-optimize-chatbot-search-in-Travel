import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TourDetailHero = ({ tour }) => {
  return (
    // Section chính, chiếm toàn bộ chiều rộng
    <section className="relative h-80 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format=fit=crop"
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
        />
        {/* Lớp phủ màu tối */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Breadcrumbs */}
        <nav className="flex justify-center items-center gap-2 text-sm mb-4">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <Link to="/tours" className="opacity-80 hover:opacity-100 transition-opacity">
            Tours
          </Link>
           <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-none">{tour.title}</span>
        </nav>
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          Tour Details
        </h1>
      </div>
    </section>
  );
};

export default TourDetailHero;