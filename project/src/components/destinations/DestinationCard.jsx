import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const DestinationCard = ({ destination, index, hoveredCard, setHoveredCard }) => {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 
        ${index === 0 || index === 1 || index === 5 ? 'lg:col-span-1 h-80' : 'h-64'} 
        ${index === 0 ? 'md:col-span-2 lg:col-span-2 h-96' : ''}`}
      onMouseEnter={() => setHoveredCard(destination.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Hình ảnh */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={destination.image}
          alt={destination.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e';
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500 rounded-2xl" />
      </div>

      {/* Nội dung overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-white z-10">
        {/* Rating & số tour */}
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
          <div className="text-sm opacity-80 bg-white/10 rounded-full px-3 py-1">
            {destination.tours} tours
          </div>
        </div>

        {/* Tên, mô tả và highlights */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-wide mb-1 group-hover:text-blue-300 transition-colors">
            {destination.name}
          </h3>
          <div className={`overflow-hidden transition-all duration-500 ${hoveredCard === destination.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-white/90 leading-relaxed mb-3">
              {destination.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {destination.highlights.map((highlight, idx) => (
                <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  {highlight}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-blue-300">
                {destination.price}
              </span>
              <button className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all">
                <span className="text-sm">Xem thêm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Viền hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-2xl transition-all duration-500" />
    </div>
  );
};

export default DestinationCard;
