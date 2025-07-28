import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TourCard from '../components/home/tours/TourCard';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const { user, wishlist } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h2>
        <p className="mb-6 text-gray-600">Bạn cần đăng nhập để xem danh sách yêu thích của mình.</p>
        <Link to="/auth" className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600">
          Đi đến trang Đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="text-red-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Danh sách Yêu thích của tôi</h1>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map(tour => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Danh sách của bạn đang trống!</h2>
          <p className="text-gray-500 mt-2">Hãy bắt đầu khám phá và thêm những chuyến đi bạn yêu thích vào đây.</p>
          <Link to="/tours" className="mt-6 inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors">
            Khám phá các Tour
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;