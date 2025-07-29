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
      navigate(`/tours?searchTerm=${searchTerm}`);
      onClose(); // Đóng overlay sau khi tìm kiếm
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[20vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()} // Ngăn không cho đóng khi click vào ô tìm kiếm
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tour, địa điểm..."
                className="w-full pl-16 pr-16 py-4 text-lg bg-white border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-sky-600 transition-colors"
              >
                Tìm
              </button>
            </form>
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;