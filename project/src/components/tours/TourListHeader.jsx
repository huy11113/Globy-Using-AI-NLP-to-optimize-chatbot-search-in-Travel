import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TourListHeader = () => {
  return (
    <section className="relative h-80 sm:h-96 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful travel destination"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          Explore Our Journeys
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Find your next adventure from our collection of handpicked tours, crafted for unforgettable memories.
        </p>
        
        {/* Breadcrumbs */}
        <nav className="mt-8 flex justify-center items-center gap-2 text-sm">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="font-semibold">Tours</span>
        </nav>
      </div>
    </section>
  );
};

export default TourListHeader;