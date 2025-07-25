import React from 'react';
import useTours from '@/hooks/useTours';
import TourCard from '@/components/home/tours/TourCard';
import TourCardSkeleton from '@/components/home/tours/TourCardSkeleton';

const RelatedTours = ({ category, currentTourId }) => {
  // Lấy 4 tour khác có cùng danh mục (category)
  const { tours, loading } = useTours({ category, limit: 4 });

  // Lọc ra tour hiện tại khỏi danh sách liên quan và chỉ lấy 3 tour
  const relatedTours = tours.filter(tour => tour._id !== currentTourId).slice(0, 3);

  // Không hiển thị gì nếu không có tour liên quan
  if (!loading && relatedTours.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 border-t">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Các tour tương tự có thể bạn sẽ thích</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <TourCardSkeleton key={i} />)
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