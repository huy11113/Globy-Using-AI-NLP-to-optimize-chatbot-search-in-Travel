import React from 'react';
import { ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination, index, hoveredCard, setHoveredCard }) => {
  const isFeatured = index === 0;

  return (
    <div
      className={`
        group relative w-full cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300
        ${isFeatured ? 'md:col-span-2 md:row-span-2 h-96' : 'h-96'} // Uniform height of 384px
      `}
      onMouseEnter={() => setHoveredCard(destination._id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Background Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-20">
        <h3 className="text-white text-xl font-semibold mb-2 drop-shadow-md">
          {destination.name}
        </h3>

        {/* Description & button only visible on hover */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            hoveredCard === destination._id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-white text-sm mb-2 line-clamp-2">{destination.description}</p>
          <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm hover:bg-white/30 transition">
            <span>Explore</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Border Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 group-hover:border-white/40" />
    </div>
  );
};

export default DestinationCard;