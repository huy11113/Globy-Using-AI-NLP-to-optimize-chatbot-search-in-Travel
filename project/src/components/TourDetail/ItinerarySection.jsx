import React from 'react';
import { Calendar } from 'lucide-react';

const ItinerarySection = ({ tour }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 pb-4 mb-8 border-b">Lịch trình chi tiết</h3>
      <div className="space-y-8 relative pl-8 border-l-2 border-dashed border-gray-300">
        {tour.itinerary?.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[45px] top-1 flex items-center justify-center h-10 w-10 bg-blue-500 rounded-full text-white shadow">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="pl-4">
              <p className="text-sm text-gray-500 font-medium">Ngày {item.day}</p>
              <h4 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h4>
              <p className="mt-2 text-gray-600 leading-relaxed">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItinerarySection;