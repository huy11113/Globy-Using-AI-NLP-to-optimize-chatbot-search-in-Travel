import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourGallery = ({ images, title }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative group">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
                delay: 3000, // 3 giây
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            }}
            className="rounded-2xl shadow-lg h-[500px]"
        >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`${title} view ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="h-6 w-6 text-gray-800" />
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 bg-white/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="h-6 w-6 text-gray-800" />
        </div>
    </div>
  );
};

export default TourGallery;