import React from 'react';
import { Clock, Users, Wifi, Utensils } from 'lucide-react';

const OverviewSection = ({ tour }) => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Tour Overview</h2>
      <p className="text-gray-600 leading-relaxed">{tour.description}</p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div className="p-4 bg-gray-50 rounded-lg border"><Clock className="mx-auto h-8 w-8 text-blue-500" /><p className="mt-2 font-semibold">{tour.duration}</p></div>
        <div className="p-4 bg-gray-50 rounded-lg border"><Users className="mx-auto h-8 w-8 text-blue-500" /><p className="mt-2 font-semibold">Max 12 People</p></div>
        <div className="p-4 bg-gray-50 rounded-lg border"><Wifi className="mx-auto h-8 w-8 text-blue-500" /><p className="mt-2 font-semibold">Wifi Included</p></div>
        <div className="p-4 bg-gray-50 rounded-lg border"><Utensils className="mx-auto h-8 w-8 text-blue-500" /><p className="mt-2 font-semibold">Breakfast</p></div>
      </div>
    </div>
  );
};

export default OverviewSection;