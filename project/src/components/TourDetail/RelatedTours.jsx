import React from 'react';
import useTours from '@/hooks/useTours';
import TourCard from '@/components/home/tours/TourCard';
import TourCardSkeleton from '@/components/home/tours/TourCardSkeleton';

const RelatedTours = ({ category, currentTourId }) => {
  // Tìm nạp 5 tour thay vì 4
  const { tours, loading } = useTours({ category, limit: 5 });

  // Lọc tour hiện tại khỏi danh sách và chỉ lấy 4 tour
  const relatedTours = tours.filter(tour => tour._id !== currentTourId).slice(0, 4);

  // Không hiển thị gì nếu không có tour liên quan
  if (!loading && relatedTours.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 border-t">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Các tour tương tự có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <TourCardSkeleton key={i} />)
          ) : (
            relatedTours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedTours;