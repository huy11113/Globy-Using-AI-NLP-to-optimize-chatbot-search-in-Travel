import React from 'react';
import { Search, Star, DollarSign, X } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, onResetFilters }) => {
  // ... (Toàn bộ logic và các component con bên trong giữ nguyên)
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'range' && value === '0' ? '' : value;
    onFilterChange(name, finalValue);
  };
  const hasActiveFilters = filters.searchTerm || filters.maxPrice || filters.minRating;
  const SearchInput = () => (
    <div>
      <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">
        Từ khóa
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="Tên tour, địa điểm..."
          value={filters.searchTerm}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </div>
  );
  const RatingFilter = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
      <div className="flex flex-row-reverse justify-between bg-gray-50 p-2 rounded-lg">
        {[5, 4, 3, 2, 1].map((rating) => (
          <React.Fragment key={rating}>
            <input
              type="radio"
              id={`rating-${rating}`}
              name="minRating"
              value={rating}
              checked={Number(filters.minRating) === rating}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <label
              htmlFor={`rating-${rating}`}
              className="cursor-pointer text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-300 peer-hover:scale-110 transition-all duration-150"
            >
              <Star className="w-6 h-6 fill-current" />
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
  const PriceRange = () => (
    <div>
      <label htmlFor="maxPrice" className="flex justify-between items-center text-sm font-medium text-gray-700 mb-2">
        <span>Mức giá</span>
        <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
          Dưới ${filters.maxPrice || '5000+'}
        </span>
      </label>
      <div className="relative">
        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
      </div>
    </div>
  );

  return (
    // ✅ DÒNG QUAN TRỌNG: Đảm bảo có class `lg:sticky` và `top-24`
    // `top-24` tạo một khoảng cách 6rem (96px) với cạnh trên của màn hình,
    // tránh bị header che mất. Bạn có thể điều chỉnh con số này.
    <aside className="lg:sticky top-24">
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">Bộ lọc</h3>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <X className="h-4 w-4" />
              Xóa
            </button>
          )}
        </div>

        {/* Filters */}
        <SearchInput />
        <RatingFilter />
        <PriceRange />
      </div>
    </aside>
  );
};

export default FilterSidebar;