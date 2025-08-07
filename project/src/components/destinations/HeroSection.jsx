// Nhập các thư viện cần thiết
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Component Header cho trang danh sách địa điểm
const DestinationHeader = () => {
  return (
    <section className="relative h-80 sm:h-96 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Ảnh nền */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Ảnh nền các địa điểm du lịch"
          className="w-full h-full object-cover"
        />
        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Nội dung */}
      <div className="relative z-10 p-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          Những Điểm Đến Nổi Bật
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Khám phá các điểm đến hàng đầu để truyền cảm hứng cho chuyến đi tiếp theo của bạn.
        </p>
        
        {/* Breadcrumbs (Thanh điều hướng phân cấp) */}
        <nav className="mt-8 flex justify-center items-center gap-2 text-sm">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Trang chủ
          </Link>
          <span className="opacity-50">&gt;</span>
          <span className="font-semibold">Điểm đến</span>
        </nav>
      </div>
    </section>
  );
};

// Xuất component
export default DestinationHeader;
