import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const TourGallery = ({ images, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="rounded-xl shadow-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`${title} view ${index + 1}`} className="w-full h-[500px] object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-24"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden">
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TourGallery;