import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Map, WifiOff } from 'lucide-react';
import TourCard from '../home/tours/TourCard'; // Giữ nguyên thẻ tour to, đẹp
import TourCardSkeleton from '../home/tours/TourCardSkeleton';

const TourGrid = ({ tours, loading, error, onRetry }) => {
  if (loading) {
    return (
      // Cập nhật skeleton để khớp với layout 3 cột
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, index) => <TourCardSkeleton key={index} />)}
      </div>
    );
  }

  // ... (logic xử lý error và empty giữ nguyên)

  return (
    // ✅ THAY ĐỔI QUAN TRỌNG:
    // Quay lại sử dụng lg:grid-cols-3 để hiển thị 3 thẻ mỗi hàng
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour, index) => (
        <motion.div
          key={tour._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <TourCard tour={tour} />
        </motion.div>
      ))}
    </div>
  );
};

export default TourGrid;