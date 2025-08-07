import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TourDetailHero = ({ tour }) => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] text-white bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src={tour.image}
          alt={`View of ${tour.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
        <div className="max-w-screen-xl mx-auto w-full">
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Trang chủ</Link>
              <ChevronRight size={16} />
              <Link to="/tours" className="opacity-80 hover:opacity-100 transition-opacity">Tours</Link>
            </nav>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]">
              {tour.title}
            </h1>
        </div>
      </div>
    </section>
  );
};

export default TourDetailHero;