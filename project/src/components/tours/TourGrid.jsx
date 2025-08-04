import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Map, WifiOff } from 'lucide-react';
import TourCard from '../home/tours/TourCard';
import TourCardSkeleton from '../home/tours/TourCardSkeleton';

const TourGrid = ({ tours, loading, error }) => {
  // 1. Trạng thái đang tải
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, index) => <TourCardSkeleton key={index} />)}
      </div>
    );
  }

  // 2. Trạng thái lỗi
  if (error) {
    return (
        <div className="text-center py-20 px-6 bg-white border-2 border-dashed border-red-200 rounded-2xl">
            <div className="inline-block p-4 bg-red-100 text-red-500 rounded-full">
                <WifiOff size={40} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-red-800">Không thể tải dữ liệu</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Đã có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền và thử lại.
            </p>
            <p className="text-xs text-gray-400 mt-4">Lỗi: {error}</p>
             <button
                onClick={() => window.location.reload()}
                className="mt-6 inline-block bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-transform hover:scale-105"
            >
                Thử lại
            </button>
      </div>
    );
  }

  // 3. Trạng thái không có kết quả
  if (!tours || tours.length === 0) {
    return (
        <div className="text-center py-20 px-6 bg-white border-2 border-dashed rounded-2xl">
            <div className="inline-block p-4 bg-sky-100 text-sky-500 rounded-full">
                <Map size={40} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">Không tìm thấy tour phù hợp</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Rất tiếc, không có tour nào khớp với tiêu chí tìm kiếm của bạn. Vui lòng thử thay đổi bộ lọc.
            </p>
        </div>
    );
  }

  // 4. Trạng thái hiển thị thành công
  return (
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