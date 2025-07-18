import React from 'react';
import PropTypes from 'prop-types';
import { Star, Clock, Heart, ArrowRight } from 'lucide-react';

const TourCard = ({ tour }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full group">
      {/* --- Image Section --- */}
      <div className="relative overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name} 
          className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {tour.isHot && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            HOT
          </div>
        )}

        <button className="absolute top-4 right-4 p-2 bg-white/70 rounded-full backdrop-blur-sm hover:bg-white/90 transition-colors">
          <Heart 
            className={`w-5 h-5 transition-colors ${tour.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} 
          />
        </button>
      </div>
      
      {/* --- Content Section --- */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {tour.name}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{tour.rating}</span>
            <span className="text-gray-400">({tour.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5 line-clamp-3 flex-grow">
          {tour.description}
        </p>

        {/* --- Footer --- */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-2xl font-bold text-gray-900">${tour.price}</p>
          </div>
          <button className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default TourCard;