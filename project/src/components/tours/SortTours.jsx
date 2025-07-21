import React from 'react';

const SortTours = ({ onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sắp xếp theo:
      </label>
      <select
        id="sort"
        // Cập nhật state ở component cha ngay khi thay đổi
        onChange={(e) => onSortChange(prev => ({ ...prev, sort: e.target.value }))}
        className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="-createdAt">Mới nhất</option>
        <option value="name-asc">Tên (A-Z)</option>
        <option value="name-desc">Tên (Z-A)</option>
        <option value="price">Giá (Tăng dần)</option>
        <option value="-price">Giá (Giảm dần)</option>
      </select>
    </div>
  );
};

export default SortTours;