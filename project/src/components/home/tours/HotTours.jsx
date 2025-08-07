// Nhập các thư viện và component cần thiết
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight, AlertTriangle, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import { motion } from 'framer-motion';

import useTours from '@/hooks/useTours';
import TourCard from './TourCard';
import TourCardSkeleton from './TourCardSkeleton';

// Nhập CSS cho Swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Component hiển thị các tour nổi bật
const HotTours = () => {
  // Lấy danh sách các tour nổi bật bằng custom hook
  const { tours: featuredTours, loading, error } = useTours({ 
    featured: true, 
    limit: 6
  });
  
  // Chỉ bật chế độ lặp (loop) cho carousel khi có nhiều hơn 3 tour
  const enableLoop = Array.isArray(featuredTours) && featuredTours.length > 3;

  // Hàm render nội dung chính dựa trên trạng thái dữ liệu
  const renderContent = () => {
    // Khi đang tải dữ liệu
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => <TourCardSkeleton key={index} />)}
        </div>
      );
    }

    // Khi có lỗi xảy ra
    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-10 text-center border border-red-200"
        >
          <AlertTriangle className="h-12 w-12 text-red-400" />
          <h3 className="mt-4 text-xl font-semibold text-red-800">Đã có lỗi xảy ra</h3>
          <p className="mt-2 text-red-600">Chúng tôi không thể tải các tour nổi bật. Vui lòng thử lại sau.</p>
        </motion.div>
      );
    }

    // Khi không có tour nào
    if (!featuredTours || featuredTours.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-10 text-center border"
        >
          <PackageOpen className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">Không có tour nổi bật</h3>
          <p className="mt-2 text-gray-600">Vui lòng quay lại sau để xem các trải nghiệm du lịch được chọn lọc của chúng tôi!</p>
        </motion.div>
      );
    }

    // Khi tải dữ liệu thành công
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="group/slider relative"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={enableLoop}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{ nextEl: '.hot-tours-next', prevEl: '.hot-tours-prev' }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="!px-8 sm:!px-0"
        >
          {featuredTours.map((tour) => (
            <SwiperSlide key={tour._id} className="h-full py-4">
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Các nút điều hướng cho carousel */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button className="hot-tours-prev -ml-6 flex items-center justify-center h-14 w-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/5 hover:bg-white">
                <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button className="hot-tours-next -mr-6 flex items-center justify-center h-14 w-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/5 hover:bg-white">
                <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=2070&auto=format=fit=crop')` }}
    >
      {/* Lớp phủ tối */}
      <div className="absolute inset-0 bg-gray-900/60"></div>
      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        {/* Tiêu đề và mô tả của section */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
                <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                    Những Hành Trình Nổi Bật
                </h2>
            </div>
            <div className="flex flex-col items-start gap-y-6 lg:items-end">
                <p className="text-lg leading-8 text-gray-300 lg:text-right">
                    Bộ sưu tập các chuyến đi được lựa chọn cẩn thận, mang đến những trải nghiệm độc đáo và kỷ niệm khó quên.
                </p>
                <Link 
                  to="/tours" 
                  className="group/link relative mt-4 inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-gray-200"
                >
                  <span>Xem tất cả tour</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full"></span>
                </Link>
            </div>
        </div>
        {/* Phần hiển thị carousel tour */}
        <div className="mt-20">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

// Xuất component
export default HotTours;
