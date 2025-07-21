import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce'; // Cần cài đặt: npm install use-debounce

/**
 * Component bộ lọc chuyên nghiệp, cập nhật filter một cách thông minh.
 * @param {function} onFilterChange - Callback để cập nhật state filter ở component cha.
 */
const SearchFilter = ({ onFilterChange }) => {
  const [destination, setDestination] = useState('');
  const [debouncedDestination] = useDebounce(destination, 500); // Debounce 500ms

  // Gọi onFilterChange khi giá trị debounce của destination thay đổi
  useEffect(() => {
    onFilterChange(prev => ({ ...prev, destination: debouncedDestination }));
  }, [debouncedDestination, onFilterChange]);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Bộ Lọc Tìm Kiếm</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-700">
            Điểm đến
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Tìm theo tên thành phố..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Bạn có thể thêm các bộ lọc khác (select, range slider) tại đây */}
        {/* Chúng sẽ gọi onFilterChange trực tiếp trong sự kiện onChange */}
      </div>
    </div>
  );
};

export default SearchFilter;