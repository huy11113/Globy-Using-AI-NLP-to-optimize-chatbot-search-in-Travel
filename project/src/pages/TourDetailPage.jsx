import React from 'react';
import { useParams } from 'react-router-dom';
import useTourDetail from '@/hooks/useTourDetail';

// Import các component con
import HeroSection from '@/components/TourDetailPage/HeroSection';
import BookingWidget from '@/components/TourDetailPage/BookingWidget';
import OverviewSection from '@/components/TourDetailPage/OverviewSection';
import ItinerarySection from '@/components/TourDetailPage/ItinerarySection';

const TourDetailPage = () => {
  const { id: tourId } = useParams();
  const { tour, loading, error } = useTourDetail(tourId);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
  }
  if (error) {
    return <div className="text-center py-20"><h2 className="text-2xl font-bold text-red-600">Error loading tour.</h2><p>{error}</p></div>;
  }
  if (!tour) {
    return <div className="text-center py-20"><h2 className="text-2xl font-bold">Tour not found.</h2></div>;
  }

  return (
    <>
      <HeroSection tour={tour} />
      <main className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OverviewSection tour={tour} />
              <ItinerarySection />
              {/* Thêm Gallery, Reviews... ở đây */}
            </div>
            <div className="lg:col-span-1">
              <BookingWidget tour={tour} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TourDetailPage;