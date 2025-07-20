import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import các thành phần đã được chia nhỏ
import { cityDestinations } from '../../../data/topDestinations'; // Chú ý đường dẫn có thể cần thay đổi
import SectionHeader from './SectionHeader';
import DestinationCard from './DestinationCard';
// Sử dụng alias @ để trỏ từ thư mục src
import CarouselNavigation from "@/components/common/CarouselNavigation";

// Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const TopDestinations = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Journeys to Inspire"
          subtitle="From iconic cityscapes to serene natural wonders, explore the places that travelers dream of."
        />

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{ nextEl: '.destination-swiper-button-next', prevEl: '.destination-swiper-button-prev' }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {cityDestinations.map((destination) => (
              <SwiperSlide key={destination.id}>
                <DestinationCard destination={destination} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <CarouselNavigation />
        </div>

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