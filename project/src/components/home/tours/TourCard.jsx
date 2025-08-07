// Nhập các thư viện và component cần thiết
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, ArrowRight, MapPin } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

// Component hiển thị thẻ thông tin của một tour
const TourCard = React.memo(({ tour }) => {
  // Lấy thông tin người dùng và các hàm xử lý wishlist từ Context
  const { user, isTourInWishlist, toggleTourInWishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  // Bóc tách các thuộc tính của tour để dễ sử dụng
  const { _id, image, title, destination, description, rating, reviewsCount, duration, price, featured } = tour;

  // Kiểm tra xem tour này đã có trong danh sách yêu thích của người dùng chưa
  const isLiked = user ? isTourInWishlist(_id) : false;

  // Hàm xử lý khi nhấn nút yêu thích
  const handleWishlistClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định (chuyển trang)
    // Nếu chưa đăng nhập, yêu cầu đăng nhập
    if (!user) {
      alert('Vui lòng đăng nhập để sử dụng chức năng này.');
      navigate('/auth');
      return;
    }
    // Thêm hoặc xóa tour khỏi danh sách yêu thích
    toggleTourInWishlist(_id);
  };

  return (
    // Thẻ tour chính
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      {/* Phần hình ảnh */}
      <div className="relative">
        <Link 
          to={`/tours/${_id}`} 
          className="block h-80 overflow-hidden rounded-t-xl"
          aria-label={`Xem chi tiết tour ${title}`}
        >
          <img
            src={image}
            alt={`Cảnh đẹp từ tour ${title}`}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {/* Lớp phủ gradient tối ở dưới ảnh */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </Link>

        {/* Các phần tử nằm trên ảnh (Tag nổi bật, nút yêu thích) */}
        <div className="absolute top-0 left-0 w-full p-6">
          <div className="flex justify-between items-start">
            {/* Hiển thị tag "NỔI BẬT" nếu có */}
            {featured && (
              <div className="pointer-events-auto w-fit rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                NỔI BẬT
              </div>
            )}
            {/* Nút yêu thích, chỉ hiển thị khi đã đăng nhập */}
            {user && (
              <button
                onClick={handleWishlistClick}
                className="pointer-events-auto ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-200 hover:bg-white/30 hover:scale-110"
                aria-label="Thêm vào yêu thích"
              >
                <Heart className={`h-5 w-5 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'fill-transparent stroke-white'}`} />
              </button>
            )}
          </div>
        </div>
        
        {/* Thông tin tên tour và địa điểm */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white pointer-events-none">
          <div className="transform transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span className="font-semibold tracking-wider uppercase text-white shadow-sm">{destination?.name || 'Toàn cầu'}</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight line-clamp-2 pointer-events-auto">
                <Link to={`/tours/${_id}`}>{title}</Link>
              </h3>
          </div>
        </div>
      </div>

      {/* Phần nội dung text của thẻ */}
      <div className="flex flex-col flex-grow p-6">
        <p className="mb-5 text-base text-gray-600 line-clamp-3">
          {description}
        </p>
        {/* Phần dưới cùng của thẻ (đánh giá, thời gian, giá) */}
        <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                  <span className="font-semibold text-gray-800">{rating?.toFixed(1)}</span>
                  <span className="text-gray-500">({reviewsCount || 0} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{duration}</span>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Chỉ từ</span>
                {/* Định dạng giá tiền sang kiểu Việt Nam */}
                <p className="text-3xl font-bold text-gray-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                </p>
              </div>
              <Link
                to={`/tours/${_id}`}
                className="group/link relative inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                <span>Xem Chi Tiết</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
});

// Định nghĩa kiểu dữ liệu cho props để đảm bảo tính đúng đắn
TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

// Xuất component
export default TourCard;
