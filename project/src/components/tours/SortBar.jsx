// Nhập các thư viện cần thiết
import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

// Component thanh sắp xếp
const SortBar = ({ total, sortBy, onSortChange, loading }) => {
  // Các tùy chọn sắp xếp đã được dịch
  const sortOptions = [
    { label: 'Mới nhất', value: '-createdAt' },
    { label: 'Đánh giá cao', value: '-rating' },
    { label: 'Giá: Thấp đến cao', value: 'price' },
    { label: 'Giá: Cao đến thấp', value: '-price' },
  ];

  // Giao diện "khung xương" khi đang tải
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
    // Container chính của thanh sắp xếp
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Hiển thị tổng số kết quả tìm được */}
      <p className="text-md text-gray-800 font-semibold mb-4 sm:mb-0">
        Tìm thấy: {total} tours
      </p>

      {/* Các nút bấm để sắp xếp */}
      <div className="flex items-center gap-2">
        {sortOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            // Áp dụng style khác nhau cho nút đang được chọn
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              sortBy === option.value
                ? 'bg-blue-600 text-white shadow' // Style cho nút active
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200' // Style cho nút không active
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Xuất component
export default SortBar;
