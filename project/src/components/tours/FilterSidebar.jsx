import React from 'react';
import { Search, Star, DollarSign, X, RotateCcw, Clock, Grid3X3 } from 'lucide-react';

// --- Reusable Filter Section Component ---
const FilterSection = ({ title, children }) => (
  <div className="py-6 border-b border-gray-200">
    <h4 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wider">{title}</h4>
    {children}
  </div>
);

// --- Main FilterSidebar Component ---
const FilterSidebar = ({ filters, onFilterChange, onResetFilters, loading }) => {
  
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // For the price range, if the user slides it back to 0, treat it as no filter
    const finalValue = type === 'range' && value === '0' ? '' : value;
    onFilterChange(name, finalValue);
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const currentValues = filters[name] ? filters[name].split(',') : [];
    
    let newValues;
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(item => item !== value);
    }
    
    onFilterChange(name, newValues.join(','));
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value.length > 0);

  // --- Dummy data for new filters (you can fetch this from your backend later) ---
  const durationOptions = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
  const categoryOptions = ["Adventure", "Cultural", "Beach", "Family", "Relaxation"];

  // --- Loading Skeleton ---
  if (loading) {
    return (
      <aside className="lg:sticky top-24">
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
          <div className="h-20 bg-gray-200 rounded-md w-full"></div>
          <div className="h-16 bg-gray-200 rounded-md w-full"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky top-24">
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
              aria-label="Reset all filters"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>

        <div className="space-y-6 divide-y divide-gray-200">
          {/* Search Input */}
          <FilterSection title="Keyword">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="searchTerm"
                placeholder="Tour name, destination..."
                value={filters.searchTerm || ''}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
          </FilterSection>

          {/* Price Range Slider */}
          <FilterSection title="Price Range">
            <label htmlFor="maxPrice" className="flex justify-between items-center text-sm font-semibold text-gray-800 mb-2">
              <span className="px-2 py-1 text-xs font-bold text-sky-800 bg-sky-100 rounded-full">
                Up to ${filters.maxPrice || '5000+'}
              </span>
            </label>
            <input
              type="range"
              id="maxPrice"
              name="maxPrice"
              min="0"
              max="5000"
              step="100"
              value={filters.maxPrice || 0}
              onChange={handleInputChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb"
            />
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection title="Rating">
            <div className="flex justify-around bg-gray-50 p-2 rounded-lg">
              {[5, 4, 3, 2, 1].map((rating) => (
                <React.Fragment key={rating}>
                  <input type="radio" id={`rating-${rating}`} name="minRating" value={rating} checked={Number(filters.minRating) === rating} onChange={handleInputChange} className="sr-only peer"/>
                  <label htmlFor={`rating-${rating}`} className="cursor-pointer text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-300 transition-transform duration-200 peer-hover:scale-125" title={`At least ${rating} stars`}>
                    <Star className="w-7 h-7 fill-current" />
                  </label>
                </React.Fragment>
              ))}
            </div>
          </FilterSection>

          {/* Tour Duration Filter */}
          <FilterSection title="Tour Duration">
             <div className="space-y-2">
                {durationOptions.map(duration => (
                    <div key={duration} className="flex items-center">
                        <input id={`duration-${duration}`} name="duration" value={duration} type="checkbox" onChange={handleCheckboxChange} checked={(filters.duration || '').includes(duration)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                        <label htmlFor={`duration-${duration}`} className="ml-3 text-sm text-gray-600">{duration}</label>
                    </div>
                ))}
            </div>
          </FilterSection>

          {/* Tour Category Filter */}
          <FilterSection title="Tour Category">
            <div className="space-y-2">
              {categoryOptions.map(category => (
                <div key={category} className="flex items-center">
                  <input id={`category-${category}`} name="category" value={category} type="radio" onChange={handleInputChange} checked={filters.category === category} className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"/>
                  <label htmlFor={`category-${category}`} className="ml-3 block text-sm font-medium text-gray-700">{category}</label>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;