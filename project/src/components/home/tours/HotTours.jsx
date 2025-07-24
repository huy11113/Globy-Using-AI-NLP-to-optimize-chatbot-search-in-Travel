import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight, AlertTriangle, ChevronLeft, ChevronRight, Loader, PackageOpen } from 'lucide-react';
import { motion } from 'framer-motion';

import useTours from '@/hooks/useTours';
import TourCard from './TourCard';
import TourCardSkeleton from './TourCardSkeleton';

import 'swiper/css';
import 'swiper/css/navigation';

const HotTours = () => {
  const { tours: featuredTours, loading, error } = useTours({ 
    featured: true, 
    limit: 6
  });
  
  const enableLoop = Array.isArray(featuredTours) && featuredTours.length > 3;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => <TourCardSkeleton key={index} />)}
        </div>
      );
    }

    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-10 text-center border border-red-200"
        >
          <AlertTriangle className="h-12 w-12 text-red-400" />
          <h3 className="mt-4 text-xl font-semibold text-red-800">Something Went Wrong</h3>
          <p className="mt-2 text-red-600">We couldn't load the featured tours. Please try again later.</p>
        </motion.div>
      );
    }

    if (!featuredTours || featuredTours.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-10 text-center border"
        >
          <PackageOpen className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">No Featured Tours Available</h3>
          <p className="mt-2 text-gray-600">Please check back soon for our handpicked travel experiences!</p>
        </motion.div>
      );
    }

    return (
      // ✅ SỬA LỖI 1: Đặt tên cho nhóm là "slider"
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
          // Thêm padding cho container để có không gian cho mũi tên
          className="!px-8 sm:!px-0"
        >
          {featuredTours.map((tour) => (
            <SwiperSlide key={tour._id} className="h-full py-4">
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* ✅ SỬA LỖI 2: Căn chỉnh lại vị trí mũi tên */}
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
      <div className="absolute inset-0 bg-gray-900/60"></div>
      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
                <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                    Our Featured Journeys
                </h2>
            </div>
            <div className="flex flex-col items-start gap-y-6 lg:items-end">
                <p className="text-lg leading-8 text-gray-300 lg:text-right">
                    A collection of carefully selected trips that offer unique experiences and unforgettable memories.
                </p>
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