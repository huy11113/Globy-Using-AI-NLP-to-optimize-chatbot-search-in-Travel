import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, MapPinned, LifeBuoy, ShieldCheck, Ticket } from 'lucide-react';

// Dữ liệu và icon (không thay đổi)
const servicesData = [
  {
    icon: <MapPinned className="h-8 w-8 text-blue-600" />,
    title: 'Tailor-Made Tours',
    description: 'We craft personalized itineraries that cater to your unique interests, ensuring every trip is a perfect fit for you.',
  },
  {
    icon: <Hotel className="h-8 w-8 text-blue-600" />,
    title: 'Curated Accommodations',
    description: 'Handpicked hotels and resorts, from luxury stays to charming boutiques, all vetted for quality and comfort.',
  },
  {
    icon: <Ticket className="h-8 w-8 text-blue-600" />,
    title: 'Seamless Bookings',
    description: 'Easy and competitive flight and transport booking to destinations worldwide, making your travel hassle-free.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: '24/7 Expert Support',
    description: 'Our dedicated support team is available around the clock to assist you with any request, anytime, anywhere.',
  },
];

// Cấu hình animation (không thay đổi)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Services = () => {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32 overflow-hidden"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')` }}
    >
      {/* Lớp phủ tối màu để tăng độ tương phản */}
      <div className="absolute inset-0 bg-gray-900/50"></div>

      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        
        {/* Phần tiêu đề */}
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
        
          {/* ✨ YÊU CẦU: Thay đổi màu chữ để tương phản với ảnh */}
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            Everything You Need For a Perfect Trip
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-200">
            We provide a complete range of services to ensure your travel experience is seamless and unforgettable from start to finish.
          </p>
        </motion.div>

        {/* Lưới chứa các thẻ dịch vụ */}
        <motion.div 
          className="mx-auto mt-20 grid max-w-none grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index}
              className="group relative flex gap-x-6 rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 ease-in-out hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-900/5">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {service.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;