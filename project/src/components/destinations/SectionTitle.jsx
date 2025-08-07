// Nhập các thư viện cần thiết
import React from 'react';
import { Star } from 'lucide-react';

// Component để hiển thị tiêu đề cho một section
const SectionTitle = ({ subtitle, title, description }) => {
  return (
    // Khối chứa toàn bộ tiêu đề, căn giữa
    <div className="text-center mb-16 space-y-4">
      {/* Tiêu đề phụ với icon ngôi sao */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
        <Star className="w-4 h-4" />
        <span className="uppercase tracking-wider">{subtitle}</span>
      </div>
      {/* Tiêu đề chính */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
        {/* Xử lý để tách tiêu đề thành 2 dòng và tô màu cho dòng thứ hai */}
        {title.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {index === 1 ? (
              // Áp dụng màu gradient cho dòng thứ hai
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {line}
              </span>
            ) : (
              // Hiển thị dòng đầu tiên bình thường
              line
            )}
            {/* Thêm thẻ <br> để xuống dòng sau dòng đầu tiên */}
            {index === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      {/* Đoạn mô tả cho section */}
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

// Xuất component để sử dụng ở nơi khác
export default SectionTitle;
