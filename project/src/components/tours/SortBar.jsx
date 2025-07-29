import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

const SortBar = ({ total, sortBy, onSortChange, loading }) => {
  // Translated sort options
  const sortOptions = [
    { label: 'Newest', value: '-createdAt' },
    { label: 'Top Rated', value: '-rating' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Price: High to Low', value: '-price' },
  ];

  if (loading) {
    return (
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-md w-24 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <p className="text-md text-gray-800 font-semibold mb-4 sm:mb-0">
        {/* Translated text */}
        Found: {total} tours
      </p>

      <div className="flex items-center gap-2">
        {sortOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              sortBy === option.value
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;