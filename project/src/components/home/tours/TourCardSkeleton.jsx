// Nhập thư viện React
import React from 'react';

// Component "khung xương" cho TourCard, hiển thị trong lúc chờ tải dữ liệu
const TourCardSkeleton = () => {
  return (
    // Thẻ chính với hiệu ứng "pulse" để tạo cảm giác đang tải
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden h-full animate-pulse">
      {/* Phần giữ chỗ cho hình ảnh */}
      <div className="w-full h-52 bg-gray-300"></div>
      
      {/* Phần giữ chỗ cho nội dung text */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Dòng cho tiêu đề tour */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
        {/* Dòng cho địa điểm */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-5"></div>
        {/* Các dòng cho mô tả */}
        <div className="space-y-2 flex-grow">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
        {/* Phần dưới cùng của thẻ (giá, đánh giá) */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

// Xuất component
export default TourCardSkeleton;
