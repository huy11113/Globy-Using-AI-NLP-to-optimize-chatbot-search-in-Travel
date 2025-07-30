// src/pages/DestinationDetailPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import useDestinationDetail from '../hooks/useDestinationDetail'; // Sử dụng hook vừa tạo
import TourCard from '../components/home/tours/TourCard';
import TourCardSkeleton from '../components/home/tours/TourCardSkeleton';

// Component con cho trạng thái Loading
const LoadingState = () => (
  <div className="container mx-auto px-4 py-8 pt-24">
    <div className="h-60 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
    <div className="h-8 bg-gray-200 rounded-md w-1/3 animate-pulse mb-4"></div>
    <div className="h-20 bg-gray-200 rounded-md w-full animate-pulse mb-8"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => <TourCardSkeleton key={i} />)}
    </div>
  </div>
);

// Component con cho trạng thái Lỗi
const ErrorState = ({ message }) => (
  <div className="text-center py-40">
    <h2 className="text-2xl font-bold text-red-600 mb-2">Đã xảy ra lỗi</h2>
    <p className="text-gray-500">Lý do: {message}</p>
  </div>
);

const DestinationDetailPage = () => {
  const { id } = useParams();
  const { destination, tours, loading, error } = useDestinationDetail(id);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!destination) {
    return <div className="text-center py-40">Không tìm thấy địa điểm này.</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center text-white">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center px-4">
          <p className="text-lg font-semibold tracking-widest uppercase">{destination.continent}</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">{destination.name}</h1>
        </div>
      </div>
      
      {/* Breadcrumb và Mô tả */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
            <nav className="flex text-sm mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="inline-flex items-center text-gray-700 hover:text-sky-500">
                    <Home className="mr-2 h-4 w-4" />
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-gray-400 mx-2">/</span>
                    <Link to="/destinations" className="text-gray-700 hover:text-sky-500">Địa điểm</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                     <span className="text-gray-400 mx-2">/</span>
                    <span className="font-medium text-gray-500">{destination.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto text-center">{destination.description}</p>
        </div>
      </div>

      {/* Phần hiển thị Tours */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Khám phá các tour tại {destination.name}</h2>
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tours.map(tour => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Hiện chưa có tour nào cho địa điểm này.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DestinationDetailPage;