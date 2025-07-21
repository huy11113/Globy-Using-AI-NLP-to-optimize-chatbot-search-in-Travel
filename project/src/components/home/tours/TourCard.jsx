import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, ArrowRight, MapPin } from 'lucide-react';

const TourCard = ({ tour }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { _id, image, title, destination, description, rating, reviewsCount, duration, price, featured } = tour;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      
      <div className="relative">
        <Link 
          to={`/tours/${_id}`} 
          className="block h-80 overflow-hidden rounded-t-xl"
          aria-label={`View details for ${title}`} // Thêm aria-label cho accessibility
        >
          <img
            src={image}
            alt={`A beautiful scene from the ${title} tour`}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {/* Lớp phủ gradient mạnh hơn một chút để chữ dễ đọc hơn */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </Link>

        {/* --- Thông tin overlay trên ảnh --- */}
        <div className="absolute inset-0 flex flex-col p-6 text-white pointer-events-none">
          {featured && (
            <div className="pointer-events-auto w-fit rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                FEATURED
            </div>
          )}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="pointer-events-auto ml-auto -mt-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-200 hover:bg-white/30 hover:scale-110"
            aria-label="Add to favorites"
          >
            <Heart className={`h-5 w-5 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent stroke-white'}`} />
          </button>
          
          {/* ✨ CẢI TIẾN: Hiệu ứng trượt lên cho khối chữ ✨ */}
          <div className="mt-auto w-full transform transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold tracking-wider uppercase text-white shadow-sm">{destination?.name || 'Global'}</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight line-clamp-2 pointer-events-auto">
                <Link to={`/tours/${_id}`}>{title}</Link>
              </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6">
        {/* Phần mô tả được đưa xuống dưới, tách biệt với các thông tin khác */}
        <p className="mb-5 text-base text-gray-600 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
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
            <div className="mt-5 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">From</span>
                <p className="text-3xl font-bold text-gray-900">${price}</p>
              </div>
              <Link
                to={`/tours/${_id}`}
                className="group/link relative inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                <span>View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-700 transition-all duration-300 ease-in-out group-hover/link:w-full"></span>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes không thay đổi
TourCard.propTypes = {
  tour: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    destination: PropTypes.shape({ name: PropTypes.string }),
    description: PropTypes.string,
    rating: PropTypes.number,
    duration: PropTypes.string,
    price: PropTypes.number,
    reviewsCount: PropTypes.number,
    featured: PropTypes.bool,
  }).isRequired,
};

export default TourCard;