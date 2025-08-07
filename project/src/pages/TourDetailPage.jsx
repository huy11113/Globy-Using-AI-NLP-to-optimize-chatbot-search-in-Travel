import React from 'react';
import { useParams } from 'react-router-dom';
import useTourDetail from '@/hooks/useTourDetail';

// Import các component con
import TourDetailHero from '@/components/TourDetail/TourDetailHero';
import TourNavigation from '@/components/TourDetail/TourNavigation';
import TourHighlights from '@/components/TourDetail/TourHighlights';
import TourGallery from '@/components/TourDetail/TourGallery';
import TourBookingInfo from '@/components/TourDetail/TourBookingInfo';
import ItinerarySection from '@/components/TourDetail/ItinerarySection';
import TourServices from '@/components/TourDetail/TourServices';
import TourNotes from '@/components/TourDetail/TourNotes';
import ConsultationForm from '@/components/TourDetail/ConsultationForm';
import RelatedTours from '@/components/TourDetail/RelatedTours';
import ReviewSection from '@/components/TourDetail/ReviewSection';

const TourDetailPage = () => {
  const { id: tourId } = useParams();
  const { tour, loading, error } = useTourDetail(tourId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="text-center py-40">
        <h2 className="text-3xl font-bold text-red-600">Đã xảy ra lỗi</h2>
        <p className="mt-4 text-gray-600">{error || "Không tìm thấy thông tin chi tiết cho tour này."}</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50">
      <TourDetailHero tour={tour} />
      
      <div className="py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* CỘT TRÁI (8/12): NỘI DUNG CHÍNH */}
            <div className="lg:col-span-8 space-y-12">
              {/* --- ĐÃ THAY ĐỔI THỨ TỰ Ở ĐÂY --- */}
              <section id="gallery"><TourGallery images={tour.images} title={tour.title} /></section>
              <section id="highlights"><TourHighlights tour={tour} /></section>
              <section id="itinerary"><ItinerarySection tour={tour} /></section>
              <section id="services"><TourServices tour={tour} /></section>
              <section id="notes"><TourNotes /></section>
              <section id="reviews"><ReviewSection tourId={tour._id} /></section>
            </div>

            {/* CỘT PHẢI (4/12): SIDEBAR */}
            <div className="lg:col-span-4">
                <div className="lg:sticky top-24 space-y-8">
                    <TourBookingInfo tour={tour} />
                    <TourNavigation />
                    <ConsultationForm />
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {tour?.category && (
        <div className="border-t border-gray-200 bg-white">
          <RelatedTours category={tour.category} currentTourId={tour._id} />
        </div>
      )}
    </main>
  );
};

export default TourDetailPage;