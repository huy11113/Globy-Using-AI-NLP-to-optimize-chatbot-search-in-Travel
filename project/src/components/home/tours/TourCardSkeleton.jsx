import React from 'react';

const TourCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-52 bg-gray-300"></div>
      
      {/* Content Placeholder */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-5"></div>
        <div className="space-y-2 flex-grow">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;