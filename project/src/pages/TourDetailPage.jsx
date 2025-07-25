import React from 'react';
import { useParams } from 'react-router-dom';
import useTourDetail from '@/hooks/useTourDetail';

// Import tất cả các component con cần thiết
import TourBreadcrumb from '@/components/TourDetail/TourBreadcrumb';
import TourHeader from '@/components/TourDetail/TourHeader';
import TourGallery from '@/components/TourDetail/TourGallery';
import TourOverview from '@/components/TourDetail/TourOverview';
import TourBookingInfo from '@/components/TourDetail/TourBookingInfo';
import RelatedTours from '@/components/TourDetail/RelatedTours';
import FAQSection from '@/components/TourDetail/FAQSection';
import ItinerarySection from '@/components/TourDetail/ItinerarySection';
import TourDetailHero from '@/components/TourDetail/TourDetailHero'; // Import Hero mới

const TourDetailPage = () => {
  const { id: tourId } = useParams();
  const { tour, loading, error } = useTourDetail(tourId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Lỗi khi tải thông tin tour.</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }
  
  if (!tour) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy tour.</h2>
      </div>
    );
  }

  return (
    <main className="bg-gray-50">
      {/* PHẦN 1: HERO SECTION - Nằm riêng biệt ở trên cùng, không có padding */}
      <TourDetailHero tour={tour} />
      
      {/* PHẦN 2: NỘI DUNG CHÍNH - Bắt đầu với container có khoảng cách */}
      <div className="py-12">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cột trái chứa tất cả thông tin chi tiết */}
            <div className="lg:col-span-2 space-y-12">
              <TourBreadcrumb tour={tour} />
              <TourHeader tour={tour} />
              <TourGallery images={tour.images} title={tour.title} />
              <TourOverview tour={tour} />
              <ItinerarySection tour={tour} />
              <FAQSection />
            </div>

            {/* Cột phải chứa sidebar đặt tour */}
            <div className="lg:col-span-1">
              <TourBookingInfo tour={tour} />
            </div>
          </div>
        </div>
      </div>
      
      {/* PHẦN 3: TOUR LIÊN QUAN */}
      {tour?.category && (
        <div className="border-t border-gray-200">
          <RelatedTours category={tour.category} currentTourId={tour._id} />
        </div>
      )}
    </main>
  );
};

export default TourDetailPage;