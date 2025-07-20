import React, { useState } from 'react'; // BƯỚC 1: Import thêm useState
import PropTypes from 'prop-types';
import { Star, Clock, Heart } from 'lucide-react';

const TourCard = ({ tour }) => {
  // BƯỚC 2: Tạo state để lưu trạng thái "yêu thích"
  // Lấy trạng thái yêu thích ban đầu từ dữ liệu tour (nếu có)
  const [isLiked, setIsLiked] = useState(tour.isFavorite || false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col group">
      
      <div className="relative h-56 overflow-hidden">
        <img 
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tour.featured && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Featured
          </span>
        )}
        
        {/* BƯỚC 3: Thêm sự kiện onClick vào nút */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white/90 transition-colors duration-200 shadow-md"
        >
          {/* BƯỚC 4: Thêm class động để đổi màu */}
          <Heart 
            className={`w-5 h-5 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} 
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">{tour.rating}</span>
            <span className="text-xs text-gray-500">({tour.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 flex-grow group-hover:text-blue-600 transition-colors">
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800">${tour.price}</span>
                <span className="text-xs text-gray-500">/person</span>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
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