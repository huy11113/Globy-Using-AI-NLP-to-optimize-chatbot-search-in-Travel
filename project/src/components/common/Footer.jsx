import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowUp,
  Send
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Điểm đến', path: '/destinations' },
    { name: 'Blog', path: '/blog' },
    { name: 'Liên hệ', path: '/contact' }
  ];

  const destinations = [
    { name: 'Việt Nam', path: '/destinations/687e5203cef42212217380a2' },
    { name: 'Nhật Bản', path: '/destinations/687e5203cef42212217380a4' },
    { name: 'Thái Lan', path: '/destinations/687e5203cef42212217380a3' },
    { name: 'Pháp', path: '/destinations/687e5203cef42212217380a6' },
    { name: 'Úc', path: '/destinations/687e5203cef42212217380a7' },
    { name: 'Hoa Kỳ', path: '/destinations/687e5203cef42212217380a5' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Nền trang trí */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/10 to-blue-600/10"></div>
        <div className="absolute top-20 right-20 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/5 rounded-full"></div>
      </div>

      {/* Nội dung chính của Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Thông tin công ty */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Globy
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Đối tác tin cậy của bạn trong việc tạo ra những trải nghiệm du lịch khó quên.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'Youtube' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:bg-sky-500"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Điểm đến nổi bật */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Điểm đến nổi bật</h3>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination.name}>
                  <Link 
                    to={destination.path} 
                    className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thông tin liên hệ và Bản tin */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Liên hệ</h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-3"><MapPin size={16} className="text-sky-400"/>123 Đường Du Lịch, TP. Phiêu Lưu</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-sky-400"/>(+84) 123 456 789</p>
              <p className="flex items-center gap-3"><Mail size={16} className="text-sky-400"/>lienhe@globy.com</p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-md font-semibold mb-2 text-white">Đăng ký nhận bản tin</h4>
              <p className="text-gray-400 text-sm mb-4">Nhận ưu đãi du lịch và hướng dẫn mới nhất.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-sky-400 focus:bg-gray-700 transition-all duration-300 text-white placeholder-gray-500"
                />
                <button type="submit" aria-label="Đăng ký" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-4 py-3 rounded-r-xl transition-transform transform hover:scale-105">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh cuối trang */}
      <div className="border-t border-gray-800 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Globy. Đã đăng ký bản quyền.
          </div>
        </div>
      </div>

      {/* Nút cuộn lên đầu trang */}
      <button 
        onClick={scrollToTop}
        aria-label="Cuộn lên đầu trang"
        className="absolute right-8 -top-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
};

export default Footer;