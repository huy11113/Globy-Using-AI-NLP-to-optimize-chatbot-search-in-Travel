import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight, AlertTriangle } from 'lucide-react';

// Import các thành phần cần thiết
import { useTours } from '@/hooks/useTours'; // Hook để lấy dữ liệu
import TourCard from './TourCard';
import TourCardSkeleton from './TourCardSkeleton';
import CarouselNavigation from '@/components/common/CarouselNavigation'; // Component nút điều hướng

import 'swiper/css';
import 'swiper/css/navigation';

const HotTours = () => {
  // Logic gọi dữ liệu giờ đây cực kỳ gọn gàng
  const { tours, isLoading, error } = useTours();

  // Lọc ra các tour nổi bật từ dữ liệu API trả về
  const featuredTours = tours.filter(tour => tour.featured);

  // Hàm render nội dung slider để xử lý các trạng thái
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg">
          <AlertTriangle className="w-10 h-10 mb-3" />
          <p className="font-semibold">{error}</p>
        </div>
      );
    }

    if (featuredTours.length === 0) {
        return (
          <div className="flex items-center justify-center h-64 text-gray-500 bg-gray-100 rounded-lg">
            <p>Hiện không có tour nổi bật nào.</p>
          </div>
        );
    }

    return (
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={featuredTours.length > 4}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ nextEl: '.tour-swiper-button-next', prevEl: '.tour-swiper-button-prev' }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1500: { slidesPerView: 4 },
          }}
        >
          {featuredTours.map((tour) => (
            <SwiperSlide key={tour._id} className="pb-8 h-full">
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
        <CarouselNavigation prevClass="tour-swiper-button-prev" nextClass="tour-swiper-button-next" />
      </div>
    );
  };

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Featured Tours
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover handpicked journeys that promise unforgettable memories and unique experiences.
          </p>
        </div>

        {renderContent()}

        <div className="text-center mt-16">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-7 py-3 rounded-full font-semibold text-base hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>View All Tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotTours;