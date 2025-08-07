import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, MapPin } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

const TourCard = React.memo(({ tour }) => {
    const { user, isTourInWishlist, toggleTourInWishlist } = useContext(AuthContext);
    const navigate = useNavigate();

    const { _id, image, title, destination, description, rating, reviewsCount, duration, price, featured } = tour;
    const isLiked = user ? isTourInWishlist(_id) : false;

    // ✅ THAY ĐỔI: Bỏ logic quy đổi tỷ giá. Giờ đây `price` được coi là VNĐ.
    const priceInVND = price;

    const handleWishlistClick = (e) => {
        // Ngăn sự kiện click lan ra thẻ Link cha, tránh việc chuyển trang không mong muốn
        e.stopPropagation(); 
        e.preventDefault(); 
        if (!user) {
            alert('Vui lòng đăng nhập để sử dụng chức năng này.');
            navigate('/auth');
            return;
        }
        toggleTourInWishlist(_id);
    };

    return (
        <Link to={`/tours/${_id}`} aria-label={`Xem chi tiết tour ${title}`}>
            <motion.div 
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                whileHover={{ y: -5 }} // Hiệu ứng nhấc thẻ lên khi hover
            >
                {/* Phần hình ảnh */}
                <div className="relative">
                    <div className="h-60 overflow-hidden">
                        <img
                            src={image}
                            alt={`Cảnh đẹp từ tour ${title}`}
                            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                    </div>
                    {/* Lớp phủ gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Tag nổi bật và nút Yêu thích */}
                    <div className="absolute top-0 left-0 w-full p-4">
                        <div className="flex justify-between items-center">
                            {featured && (
                                <div className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                                    NỔI BẬT
                                </div>
                            )}
                            {user && (
                                <button
                                    onClick={handleWishlistClick}
                                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-white/30"
                                    aria-label="Thêm vào yêu thích"
                                >
                                    <Heart className={`h-5 w-5 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'fill-none stroke-white'}`} />
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* Tên Tour và địa điểm */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                        <div className="flex items-center gap-2 text-sm text-white/90 mb-1">
                            <MapPin className="h-4 w-4" />
                            <span className="font-semibold tracking-wider uppercase">{destination?.name || 'Toàn cầu'}</span>
                        </div>
                        <h3 className="text-lg font-bold leading-tight text-white line-clamp-2 [text-shadow:1px_1px_4px_rgba(0,0,0,0.8)]">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Phần nội dung text */}
                <div className="flex flex-col flex-grow p-5">
                    {/* Giữ lại phần mô tả ngắn */}
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {description}
                    </p>
                    
                    {/* Thông tin phụ: Đánh giá và thời gian */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
                            <span className="font-semibold text-gray-800">{rating?.toFixed(1)}</span>
                            <span className="text-gray-500">({reviewsCount || 0} đánh giá)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{duration}</span>
                        </div>
                    </div>

                    {/* Phần giá tiền ở cuối cùng */}
                    <div className="border-t pt-4 mt-4">
                        <span className="text-sm text-gray-500">Chỉ từ</span>
                        <p className="text-2xl font-bold text-gray-900">
                            {priceInVND.toLocaleString('vi-VN')} VNĐ
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
});

TourCard.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default TourCard;