import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chuyển hướng đến trang danh sách tour với từ khóa tìm kiếm
      navigate(`/tours?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose(); // Đóng overlay sau khi tìm kiếm
      setSearchTerm(''); // Xóa nội dung tìm kiếm
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[15vh] sm:pt-[20vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()} // Ngăn không cho đóng khi click vào ô tìm kiếm
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tour, địa điểm bạn muốn đến..."
                className="w-full pl-16 pr-32 py-4 text-lg bg-white border border-gray-300 rounded-full shadow-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-sky-600 transition-colors text-base"
              >
                Tìm
              </button>
            </form>
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-transform hover:rotate-90"
              aria-label="Close search"
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