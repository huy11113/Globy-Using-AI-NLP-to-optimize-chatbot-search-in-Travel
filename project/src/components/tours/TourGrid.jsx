import React from 'react';
import TourCard from '../home/tours/TourCard';
import TourCardSkeleton from '../home/tours/TourCardSkeleton';

/**
 * Component lưới hiển thị danh sách các tour.
 * Xử lý các trạng thái: loading, error, empty, và success.
 * @param {object} props
 * @param {boolean} props.loading - Trạng thái đang tải.
 * @param {object|null} props.error - Đối tượng lỗi nếu có.
 * @param {Array<object>} props.tours - Mảng các tour để hiển thị.
 */
const TourGrid = ({ loading, error, tours }) => {
  // 1. Trạng thái đang tải
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <TourCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 2. Trạng thái lỗi
  if (error) {
    return <p className="py-10 text-center text-red-500">Tải tour thất bại. Vui lòng thử lại sau.</p>;
  }

  // 3. Không tìm thấy tour
  if (tours.length === 0) {
    return <p className="py-10 text-center text-gray-500">Không tìm thấy tour nào phù hợp với tiêu chí của bạn.</p>;
  }

  // 4. Hiển thị thành công
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
};

export default TourGrid;