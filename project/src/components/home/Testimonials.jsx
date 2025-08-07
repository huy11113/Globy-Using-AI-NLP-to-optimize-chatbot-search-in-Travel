// Nhập các thư viện cần thiết
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Nhập CSS cho Swiper, bao gồm cả pagination
import 'swiper/css';
import 'swiper/css/pagination';

// Dữ liệu mẫu cho các phản hồi của khách hàng
const testimonialsData = [
  {
    name: 'Sarah Johnson',
    role: 'Blogger Du Lịch',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"Chuyến đi đến Santorini của chúng tôi thật sự kỳ diệu! Mọi chi tiết đều được Globy lên kế hoạch hoàn hảo. Khung cảnh, đồ ăn, con người... đó là một trải nghiệm không thể nào quên!"',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Nhiếp ảnh gia',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"Chuyến đi văn hóa ở Nhật Bản đã vượt xa mọi mong đợi của tôi. Các hướng dẫn viên địa phương thật tuyệt vời và đã chỉ cho chúng tôi rất nhiều viên ngọc ẩn mà chúng tôi sẽ không bao giờ tự tìm thấy."',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Nhà Thám Hiểm',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"Một chuyến phiêu lưu safari ở Châu Phi không thể tin được. Globy đã xử lý mọi thứ một cách liền mạch, từ nhà nghỉ đến các chuyến đi xem thú, giúp chúng tôi chỉ cần tận hưởng khoảnh khắc. Rất khuyến khích!"',
    rating: 5,
  },
  {
    name: 'David Lee',
    role: 'Du Lịch Gia Đình',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    text: '"Chúng tôi đã đặt một gói gia đình đến Ý và nó thật hoàn hảo. Lịch trình được cân bằng tốt cho cả người lớn và trẻ em. Cảm ơn Globy!"',
    rating: 5,
  }
];

// Component hiển thị đánh giá bằng sao
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300'}`} />
    ))}
  </div>
);

// Component Section Phản hồi của khách hàng
const Testimonials = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        {/* Lưới chia bố cục thành 2 cột */}
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-5">
          
          {/* CỘT BÊN TRÁI: HÌNH ẢNH */}
          <motion.div 
            className="lg:col-span-2 h-full w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1974&auto=format&fit=crop"
              alt="Ảnh ghép những khoảnh khắc du lịch vui vẻ"
              className="aspect-[3/4] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-900/10"
            />
          </motion.div>

          {/* CỘT BÊN PHẢI: NỘI DUNG VÀ SLIDER */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Những Câu Chuyện Thật từ Du Khách Thật
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hành trình của họ, qua lời kể của chính họ. Khám phá lý do tại sao hàng ngàn du khách tin tưởng Globy để tạo nên những kỷ niệm khó quên.
            </p>

            {/* Carousel chứa các phản hồi */}
            <div className="mt-12">
              <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ 
                    clickable: true, 
                    el: '.testimonial-pagination-v2',
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                className="testimonial-swiper-single"
              >
                {testimonialsData.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <figure className="rounded-2xl bg-gray-50/80 p-8">
                      <Quote className="h-10 w-10 text-blue-200" />
                      <blockquote className="mt-4 text-xl font-medium leading-8 text-gray-800">
                        <p>{testimonial.text}</p>
                      </blockquote>
                      <figcaption className="mt-8 flex items-center gap-x-4">
                        <img className="h-14 w-14 rounded-full bg-gray-50 object-cover" src={testimonial.avatar} alt={testimonial.name} />
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-gray-600">{testimonial.role}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Container cho các dấu chấm pagination */}
              <div className="testimonial-pagination-v2 mt-8 flex justify-start gap-2"></div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* CSS tùy chỉnh cho các dấu chấm pagination của Swiper */}
      <style jsx global>{`
        .testimonial-pagination-v2 .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #d1d5db;
          opacity: 1;
          transition: width 0.3s, background-color 0.3s;
        }
        .testimonial-pagination-v2 .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 99px;
          background-color: #2563eb;
        }
      `}</style>

    </section>
  );
};

// Xuất component
export default Testimonials;
