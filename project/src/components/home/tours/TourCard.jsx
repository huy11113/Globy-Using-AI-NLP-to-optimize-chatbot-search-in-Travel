import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, ArrowRight, MapPin } from 'lucide-react';

const TourCard = ({ tour }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { _id, image, title, destination, description, rating, reviewsCount, duration, price } = tour;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      
      {/* --- IMAGE & OVERLAYS --- */}
      <div className="relative">
        <Link to={`/tours/${_id}`} className="block h-80">
          <img
            src={image}
            alt={`A beautiful scene from the ${title} tour`}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </Link>

        {/* --- Thông tin overlay trên ảnh --- */}
        <div className="absolute inset-0 flex flex-col p-6 text-white">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors duration-200 hover:bg-white/30"
            aria-label="Add to favorites"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-white' : 'stroke-current'}`} />
          </button>
          
          <div className="mt-auto">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {/* Địa điểm sẽ hiển thị chính xác sau khi sửa server */}
              <span className="font-semibold tracking-wider uppercase">{destination?.name || 'Loading...'}</span>
            </div>
            
            {/* ✨ HIỆU ỨNG MÔ TẢ MỚI ✨ */}
            <div className="transition-all duration-500 ease-in-out group-hover:-translate-y-4">
              <h3 className="text-2xl font-bold leading-tight line-clamp-2">
                {title}
              </h3>
              {/* Mô tả ban đầu ẩn, hiện ra khi hover */}
              <p className="max-h-0 text-sm opacity-0 transition-all duration-500 ease-in-out group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-80 line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA - Khu vực thông tin phụ --- */}
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
              <span className="font-semibold text-gray-800">{rating?.toFixed(1)}</span>
              <span className="text-gray-500">({reviewsCount || 0} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="font-medium">{duration}</span>
            </div>
        </div>

        <hr className="my-5" />

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-3xl font-bold text-gray-900">${price}</p>
          </div>
          <Link
            to={`/tours/${_id}`}
            className="group/button inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:pl-8"
          >
            <span>Book Now</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// PropTypes không thay đổi
// ...

export default TourCard;