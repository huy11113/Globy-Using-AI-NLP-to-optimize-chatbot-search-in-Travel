import React from 'react';
import { Star, Clock, MapPin, Flag } from 'lucide-react';

const TourHeader = ({ tour }) => {
  return (
    <div className="pb-6 border-b border-gray-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
        {tour.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
        <div className="flex items-center gap-1.5">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-800">{tour.rating?.toFixed(1)}</span>
          <span>({tour.reviewsCount} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-5 w-5" />
          <span>{tour.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-5 w-5" />
          <span>Bắt đầu từ: {tour.startLocation}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flag className="h-5 w-5" />
          <span>Kết thúc tại: {tour.endLocation}</span>
        </div>
      </div>
    </div>
  );
};

export default TourHeader;