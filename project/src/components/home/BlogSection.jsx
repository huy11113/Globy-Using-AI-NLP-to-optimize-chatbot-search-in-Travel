// Nhập các thư viện cần thiết
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Dữ liệu mẫu cho các bài viết blog
const blogPosts = [
  // Bài viết nổi bật
  {
    category: 'Điểm đến',
    date: '26 tháng 10, 2023',
    author: 'CN Traveler',
    title: '15 Địa điểm tuyệt vời nhất để ghé thăm tại Việt Nam',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Từ những dãy núi đá vôi kỳ vĩ của Vịnh Hạ Long đến những thửa ruộng bậc thang ở Sa Pa, Việt Nam là một đất nước đẹp đến ngỡ ngàng.',
    link: 'https://www.cntraveller.com/gallery/best-places-to-visit-in-vietnam',
  },
  // Danh sách các bài viết khác
  {
    date: '26 tháng 9, 2023',
    author: 'Bon Appétit',
    title: '24 Món ăn phải thử ở Tokyo cho chuyến đi tiếp theo',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1974&auto=format&fit=crop',
    link: 'https://www.bonappetit.com/story/must-try-foods-tokyo',
  },
  {
    date: '14 tháng 7, 2023',
    author: 'National Geographic',
    title: 'Hướng dẫn trekking toàn tập tại dãy Alps của Thụy Sĩ',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    link: 'https://www.nationalgeographic.com/travel/article/swiss-alps-hiking-guide',
  },
  {
    date: '10 tháng 5, 2024',
    author: 'Walks of Italy',
    title: 'Tour đi bộ tự túc khám phá La Mã cổ đại',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1976&auto=format&fit=crop',
    link: 'https://www.walksofitaly.com/blog/rome/a-walking-tour-of-ancient-rome',
  },
  {
    date: '05 tháng 6, 2024',
    author: 'The New York Times',
    title: '36 Giờ ở Seoul',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop',
    link: 'https://www.nytimes.com/interactive/2024/06/05/travel/things-to-do-seoul.html',
  },
  {
    date: '22 tháng 4, 2024',
    author: 'Forbes',
    title: 'Cẩm nang du lịch Bali: Xem gì, làm gì và ăn gì',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1964&auto=format&fit=crop',
    link: 'https://www.forbes.com/sites/forbes-personal-shopper/article/bali-travel-guide/',
  }
];

// Cấu hình animation cho container và các item con
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Component Section Blog
const BlogSection = () => {
  // Lấy bài viết đầu tiên làm bài nổi bật
  const featuredPost = blogPosts[0];
  // Lấy các bài viết còn lại
  const otherPosts = blogPosts.slice(1);

  return (
    <section className="bg-gray-50/70 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        {/* Phần tiêu đề của section */}
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Cẩm Nang Du Lịch Mới Nhất
          </h2>
          <div className="mt-4 h-1 w-24 rounded-full bg-blue-600 mx-auto" />
        </motion.div>

        {/* Lưới chứa nội dung các bài blog */}
        <motion.div 
          className="mt-20 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          
          {/* CỘT BÊN TRÁI: BÀI VIẾT NỔI BẬT */}
          <motion.article variants={itemVariants}>
            <a href={featuredPost.link} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-x-4 text-xs text-gray-500">
                  <span className="font-bold uppercase text-red-500">{featuredPost.category}</span>
                  <span>&bull;</span>
                  <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                  <span>&bull;</span>
                  <span>{featuredPost.author}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900 line-clamp-2 transition-colors group-hover:text-blue-600">
                  {featuredPost.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 font-semibold text-blue-600 transition-colors group-hover:text-blue-800">
                  <span>Đọc thêm</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          </motion.article>

          {/* CỘT BÊN PHẢI: DANH SÁCH BÀI VIẾT KHÁC */}
          <motion.div className="space-y-8" variants={containerVariants}>
            {otherPosts.map((post) => (
              <motion.article key={post.title} variants={itemVariants}>
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-x-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-x-3 text-xs text-gray-500">
                      <time dateTime={post.date}>{post.date}</time>
                      <span>&bull;</span>
                      <span>{post.author}</span>
                    </div>
                    <h4 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h4>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

// Xuất component
export default BlogSection;
