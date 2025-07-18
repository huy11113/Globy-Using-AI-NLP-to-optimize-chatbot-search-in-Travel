import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Import các thành phần cần thiết
import { fetchTours } from '@/data/tourData';
import TourCard from './TourCard';
import TourCardSkeleton from './TourCardSkeleton'; // Giả sử bạn đã tạo file này

import 'swiper/css';
import 'swiper/css/navigation';

const CarouselNavigation = () => (
  <>
    <button
      aria-label="Previous Tour"
      className="tour-swiper-button-prev absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-slate-800" />
    </button>
    <button
      aria-label="Next Tour"
      className="tour-swiper-button-next absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl hover:bg-white transition-all flex items-center justify-center"
    >
      <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-slate-800" />
    </button>
  </>
);

const HotTours = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      setIsLoading(true);
      try {
        const allTours = await fetchTours();
        setFeaturedTours(allTours.filter(tour => tour.isHot));
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTours();
  }, []);

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

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            loop={!isLoading && featuredTours.length > 4}
            navigation={{
              nextEl: '.tour-swiper-button-next',
              prevEl: '.tour-swiper-button-prev'
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1500: { slidesPerView: 4 },
            }}
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index} className="h-full pb-4">
                  <TourCardSkeleton />
                </SwiperSlide>
              ))
            ) : (
              featuredTours.map((tour) => (
                <SwiperSlide key={tour.id} className="h-full pb-4">
                  <TourCard tour={tour} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          
          {!isLoading && featuredTours.length > 0 && <CarouselNavigation />}
        </div>

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