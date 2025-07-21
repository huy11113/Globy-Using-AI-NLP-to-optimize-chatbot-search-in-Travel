import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

import useTours from '@/hooks/useTours';
import TourCard from './TourCard';
import TourCardSkeleton from './TourCardSkeleton';

import 'swiper/css';
import 'swiper/css/navigation';

const HotTours = () => {
  const { tours, loading, error } = useTours('/api/tours');
  const featuredTours = Array.isArray(tours) ? tours.filter(tour => tour.featured) : [];
  const enableLoop = featuredTours.length > 3;

  const renderContent = () => {
    // ... (phần code xử lý loading, error, no tours không thay đổi)
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => <TourCardSkeleton key={index} />)}
        </div>
      );
    }
    //...

    return (
      <div className="group relative">
        <Swiper
          style={{ overflow: 'visible' }} 
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
        >
          {featuredTours.map((tour) => (
            <SwiperSlide key={tour._id} className="h-full py-4">
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[-24px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="hot-tours-prev flex items-center justify-center h-14 w-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/5 hover:bg-white">
                <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button className="hot-tours-next flex items-center justify-center h-14 w-14 rounded-full bg-white/80 backdrop-blur-sm shadow-xl ring-1 ring-gray-900/5 hover:bg-white">
                <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
        </div>
      </div>
    );
  };

  return (
    // ✨ YÊU CẦU 1: Thay ảnh nền mới và lớp phủ tối màu
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=2070&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-gray-900/60"></div>

      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
                {/* ✨ YÊU CẦU 2: Chữ màu trắng nổi bật trên nền tối */}
                <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                    Our Featured Journeys
                </h2>
            </div>
            <div className="flex flex-col items-start gap-y-6 lg:items-end">
                <p className="text-lg leading-8 text-gray-300 lg:text-right">
                    A collection of carefully selected trips that offer unique experiences and unforgettable memories.
                </p>
                {/* ✨ YÊU CẦU 3: Chuyển "View all" về dạng chữ */}
                <Link 
                  to="/tours" 
                  className="group/link relative mt-4 inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-gray-200"
                >
                  <span>View all tours</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 ease-in-out group-hover/link:w-full"></span>
                </Link>
            </div>
        </div>

        <div className="mt-20">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default HotTours;