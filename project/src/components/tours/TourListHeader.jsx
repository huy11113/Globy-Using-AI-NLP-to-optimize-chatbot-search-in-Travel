import React from 'react';
import SortTours from './SortTours';

/**
 * Component Header cho danh sách tour, hiển thị số lượng và bộ lọc sắp xếp.
 * @param {object} props
 * @param {boolean} props.loading - Trạng thái đang tải.
 * @param {number} props.tourCount - Tổng số tour sẽ được hiển thị.
 * @param {function} props.onSortChange - Hàm callback khi thay đổi cách sắp xếp.
 */
const TourListHeader = ({ loading, tourCount, onSortChange }) => {
  return (
    <div className="flex flex-col items-start gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-gray-600">
        {loading ? 'Đang tìm kiếm tours...' : `Hiển thị ${tourCount} tours`}
      </p>
      <SortTours onSortChange={onSortChange} />
    </div>
  );
};

export default TourListHeader;