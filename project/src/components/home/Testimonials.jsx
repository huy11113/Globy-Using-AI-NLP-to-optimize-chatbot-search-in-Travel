import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import CSS cho Swiper, bao gồm cả pagination
import 'swiper/css';
import 'swiper/css/pagination';

// Dữ liệu mẫu cho các phản hồi
const testimonialsData = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Blogger',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"Our trip to Santorini was absolutely magical! Every detail was perfectly planned by Globy. The views, the food, the people... it was an unforgettable experience!"',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Photographer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"The cultural tour in Japan exceeded all my expectations. The local guides were fantastic and showed us so many hidden gems that we would have never found on our own."',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Adventurer',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: '"An incredible African safari adventure. Globy handled everything seamlessly, from the lodges to the game drives, letting us just enjoy the moment. Highly recommended!"',
    rating: 5,
  },
  {
    name: 'David Lee',
    role: 'Family Vacationer',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    text: '"We booked a family package to Italy, and it was perfect. The itinerary was well-balanced for both adults and kids. Thank you, Globy!"',
    rating: 5,
  }
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300'}`} />
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-5">
          
          {/* CỘT BÊN TRÁI: HÌNH ẢNH (chiếm 2/5) */}
          <motion.div 
            className="lg:col-span-2 h-full w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1974&auto=format&fit=crop"
              alt="A collage of happy travel moments"
              className="aspect-[3/4] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-gray-900/10"
            />
          </motion.div>

          {/* CỘT BÊN PHẢI: NỘI DUNG VÀ SLIDER (chiếm 3/5) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
           
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Real Stories from Real Travelers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Their journeys, in their own words. Discover why thousands of travelers trust Globy to create their unforgettable memories.
            </p>

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
              <div className="testimonial-pagination-v2 mt-8 flex justify-start gap-2"></div>
            </div>
          </motion.div>

        </div>
      </div>
      
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

export default Testimonials;