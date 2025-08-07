// Nhập các thư viện và component cần thiết
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

import SectionHeader from './SectionHeader';
import DestinationCard from './DestinationCard';
import CarouselNavigation from '@/components/common/CarouselNavigation';
import useDestinations from '@/hooks/useDestinations';

// Nhập CSS cho Swiper
import 'swiper/css';
import 'swiper/css/navigation';

// Component "khung xương" để hiển thị trong lúc tải dữ liệu
const DestinationCardSkeleton = () => (
  <div className="bg-gray-200 rounded-xl h-[450px] animate-pulse"></div>
);

// Component chính hiển thị các điểm đến hàng đầu
const TopDestinations = () => {
  // Sử dụng custom hook để lấy dữ liệu các điểm đến
  const { destinations, loading, error } = useDestinations(6);

  // Hàm để render nội dung dựa trên trạng thái (tải, lỗi, thành công)
  const renderContent = () => {
    // Trường hợp đang tải dữ liệu
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <DestinationCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    // Trường hợp có lỗi xảy ra
    if (error) {
      return <p className="text-center text-red-500">Không thể tải các điểm đến. Vui lòng thử lại sau.</p>;
    }

    // Trường hợp không có dữ liệu
    if (destinations.length === 0) {
      return <p className="text-center text-gray-500">Hiện không có điểm đến nổi bật nào.</p>;
    }

    // Trường hợp tải thành công, hiển thị carousel
    return (
      <div className="relative group"> {/* Bọc Swiper để điều khiển các nút điều hướng */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={{
            nextEl: '.tour-swiper-button-next',
            prevEl: '.tour-swiper-button-prev',
          }}
          spaceBetween={30}
          slidesPerView={1}
          // Thay đổi số lượng slide hiển thị trên các màn hình khác nhau
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {destinations.map((destination) => (
            <SwiperSlide key={destination._id}>
              <DestinationCard destination={destination} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Component chứa các nút điều hướng cho carousel */}
        <CarouselNavigation />
      </div>
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề của section */}
        <SectionHeader
          title="Những Hành Trình Truyền Cảm Hứng"
          subtitle="Từ những thành phố biểu tượng đến kỳ quan thiên nhiên thanh bình, hãy khám phá những nơi mà du khách hằng mơ ước."
        />
        {/* Hiển thị nội dung đã được xử lý */}
        {renderContent()}
        {/* Nút xem tất cả */}
        <div className="text-center mt-20">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Xem Tất Cả</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Xuất component
export default TopDestinations;
