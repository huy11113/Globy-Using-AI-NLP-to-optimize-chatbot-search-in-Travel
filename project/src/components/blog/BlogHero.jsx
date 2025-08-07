// Nhập các thư viện cần thiết
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Component Hero cho trang Blog
const BlogHero = () => {
  return (
    <div 
      className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=compress&cs=tinysrgb&w=1920')`
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          Blog & Những Câu Chuyện
        </h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
          Khám phá những câu chuyện du lịch, mẹo và điểm đến đầy cảm hứng trên khắp thế giới.
        </p>

        {/* Breadcrumbs (Thanh điều hướng phân cấp) */}
        <nav className="mt-8 flex justify-center items-center gap-2 text-sm">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Trang chủ
          </Link>
          <span className="opacity-50">&gt;</span>
          <span className="font-semibold">Blog</span>
        </nav>
      </div>
    </div>
  );
};

// Xuất component
export default BlogHero;
