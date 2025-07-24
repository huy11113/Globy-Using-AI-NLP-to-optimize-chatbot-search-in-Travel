import React from 'react';
import { Star, MapPin } from 'lucide-react';

const HeroSection = ({ tour }) => {
  return (
    <section className="relative h-[60vh] min-h-[400px] text-white">
      <div className="absolute inset-0">
        <img src={tour.image} alt={`View of ${tour.title}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-12">
        <div className="max-w-screen-xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {tour.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-lg">{tour.rating?.toFixed(1)}</span>
              <span className="text-gray-300">({tour.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-200">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">{tour.destination?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;