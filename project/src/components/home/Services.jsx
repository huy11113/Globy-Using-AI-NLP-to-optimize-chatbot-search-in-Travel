// Nhập các thư viện cần thiết
import React from 'react';
import { motion } from 'framer-motion';
import { MapPinned, Hotel, ShieldCheck, Ticket } from 'lucide-react';

// Dữ liệu cho các thẻ dịch vụ
const servicesData = [
  {
    icon: <MapPinned className="h-8 w-8 text-blue-600" />,
    title: 'Tour Thiết Kế Riêng',
    description: 'Chúng tôi tạo ra các lịch trình cá nhân hóa, đáp ứng sở thích riêng của bạn, đảm bảo mỗi chuyến đi đều hoàn hảo.',
  },
  {
    icon: <Hotel className="h-8 w-8 text-blue-600" />,
    title: 'Lưu Trú Tuyển Chọn',
    description: 'Các khách sạn và khu nghỉ dưỡng được lựa chọn cẩn thận, từ sang trọng đến boutique duyên dáng, tất cả đều được kiểm định về chất lượng và sự thoải mái.',
  },
  {
    icon: <Ticket className="h-8 w-8 text-blue-600" />,
    title: 'Đặt Dịch Vụ Liền Mạch',
    description: 'Đặt vé máy bay và phương tiện di chuyển dễ dàng với giá cạnh tranh đến các điểm đến toàn cầu, giúp chuyến đi của bạn không còn rắc rối.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: 'Hỗ Trợ Chuyên Gia 24/7',
    description: 'Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng 24/7 để giúp đỡ bạn với mọi yêu cầu, mọi lúc, mọi nơi.',
  },
];

// Cấu hình animation cho container và các item con
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

// Component Section Dịch vụ
const Services = () => {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-24 sm:py-32 overflow-hidden"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')` }}
    >
      {/* Lớp phủ tối màu để tăng độ tương phản cho chữ */}
      <div className="absolute inset-0 bg-gray-900/50"></div>

      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-8">
        
        {/* Phần tiêu đề của section */}
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            Mọi Thứ Bạn Cần Cho Một Chuyến Đi Hoàn Hảo
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-200">
            Chúng tôi cung cấp đầy đủ các dịch vụ để đảm bảo trải nghiệm du lịch của bạn liền mạch và khó quên từ đầu đến cuối.
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
              {/* Icon của dịch vụ */}
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-900/5">
                {service.icon}
              </div>
              {/* Nội dung text của dịch vụ */}
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

// Xuất component
export default Services;
