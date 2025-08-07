// Nhập các thư viện cần thiết
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Cho hiệu ứng animation
import { X, Search } from 'lucide-react'; // Icons
import { useNavigate } from 'react-router-dom'; // Để điều hướng trang

// Component Lớp phủ tìm kiếm (Search Overlay)
const SearchOverlay = ({ isOpen, onClose }) => {
  // State để lưu nội dung người dùng nhập vào ô tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // Hook để thực hiện điều hướng
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng gửi form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn trang tải lại
    // Nếu có nội dung tìm kiếm (đã xóa khoảng trắng thừa)
    if (searchTerm.trim()) {
      // Chuyển hướng đến trang kết quả tìm kiếm
      navigate(`/tours?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose(); // Đóng lớp phủ
      setSearchTerm(''); // Xóa trắng ô tìm kiếm
    }
  };

  return (
    // Component của Framer Motion để quản lý hiệu ứng khi component xuất hiện/biến mất
    <AnimatePresence>
      {/* Chỉ hiển thị lớp phủ khi `isOpen` là true */}
      {isOpen && (
        // Lớp nền mờ bao phủ toàn màn hình
        <motion.div
          initial={{ opacity: 0 }} // Trạng thái ban đầu
          animate={{ opacity: 1 }} // Trạng thái khi xuất hiện
          exit={{ opacity: 0 }}    // Trạng thái khi biến mất
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[15vh] sm:pt-[20vh]"
          onClick={onClose} // Đóng lớp phủ khi click vào nền
        >
          {/* Khung chứa ô tìm kiếm */}
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Hiệu ứng lò xo
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()} // Ngăn việc đóng lớp phủ khi click vào chính nó
          >
            {/* Form tìm kiếm */}
            <form onSubmit={handleSearch} className="relative">
              {/* Icon kính lúp */}
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              {/* Ô nhập liệu */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tour, địa điểm bạn muốn đến..."
                className="w-full pl-16 pr-32 py-4 text-lg bg-white border border-gray-300 rounded-full shadow-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                autoFocus // Tự động focus vào ô input khi hiện ra
              />
              {/* Nút "Tìm" */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-sky-600 transition-colors text-base"
              >
                Tìm
              </button>
            </form>
            {/* Nút đóng (dấu X) */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-transform hover:rotate-90"
              aria-label="Đóng tìm kiếm"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
