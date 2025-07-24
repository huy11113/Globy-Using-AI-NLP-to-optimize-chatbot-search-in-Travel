import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

import SectionHeader from './SectionHeader';
import DestinationCard from './DestinationCard';
import CarouselNavigation from '@/components/common/CarouselNavigation';
import useDestinations from '@/hooks/useDestinations';

import 'swiper/css';
import 'swiper/css/navigation';

const DestinationCardSkeleton = () => (
  <div className="bg-gray-200 rounded-xl h-[450px] animate-pulse"></div>
);

const TopDestinations = () => {
  const { destinations, loading, error } = useDestinations(6);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <DestinationCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">Could not load destinations. Please try again later.</p>;
    }

    if (destinations.length === 0) {
      return <p className="text-center text-gray-500">No popular destinations to display at the moment.</p>;
    }

    return (
      <div className="relative group"> {/* chỉ để group ở đây để điều khiển mũi tên */}
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

  <CarouselNavigation />
</div>

    );
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Journeys to Inspire"
          subtitle="From iconic cityscapes to serene natural wonders, explore the places that travelers dream of."
        />
        {renderContent()}
        <div className="text-center mt-20">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
