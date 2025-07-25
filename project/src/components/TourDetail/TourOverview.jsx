import React from 'react';
import { Check, X } from 'lucide-react';

const TourOverview = ({ tour }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-8">
        <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tổng quan chuyến đi</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {tour.description}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t">
            <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Giá bao gồm</h4>
                <ul className="space-y-3">
                    {tour.included?.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                        <span className="text-gray-700">{item}</span>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Giá không bao gồm</h4>
                <ul className="space-y-3">
                    {tour.excluded?.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0"/>
                        <span className="text-gray-700">{item}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default TourOverview;