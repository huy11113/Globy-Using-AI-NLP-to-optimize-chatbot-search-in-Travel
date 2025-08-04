import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../api/booking';
import { Calendar, Users, DollarSign, Edit3, Phone, User, Mail, Info, Baby, PersonStanding } from 'lucide-react';

const BookingRequestPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    // Lấy thông tin chi tiết được truyền từ trang trước
    const { tour, adults, children, guestCount, selectedDate, totalCost } = location.state || {};

    // State quản lý các thông tin người dùng có thể thay đổi
    const [bookingDetails, setBookingDetails] = useState({
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '', // Thêm email vào state
        notes: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Các thông tin đã được chọn từ trang trước là cố định
    const finalAdults = adults || 1;
    const finalChildren = children || 0;
    const finalGuestCount = guestCount || finalAdults + finalChildren;
    const finalSelectedDate = selectedDate || tour?.departures?.[0]?.date;
    const finalTotalCost = totalCost || tour?.price * finalGuestCount;

    const handleChange = e => {
        setBookingDetails(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        setError('');
        if (!bookingDetails.phoneNumber.trim() || !bookingDetails.email.trim()) {
            setError('Vui lòng điền đầy đủ email và số điện thoại liên hệ.');
            return;
        }
        setLoading(true);

        const bookingData = {
            userId: user?._id,
            tourId: tour?.id || tour?._id,
            startDate: finalSelectedDate,
            people: finalGuestCount,
            totalPrice: finalTotalCost,
            // ✅ THÊM DÒNG NÀY ĐỂ GỬI GHI CHÚ
        notes: bookingDetails.notes 
            // Ghi chú: Nếu sau này bạn muốn lưu các thông tin này,
            // bạn cần cập nhật DTO và Entity ở backend.
            // contactInfo: {
            //     name: user?.name,
            //     email: bookingDetails.email,
            //     phone: bookingDetails.phoneNumber
            // },
            // notes: bookingDetails.notes
        };

        const result = await createBooking(bookingData);
        setLoading(false);

        if (result.success) {
            alert("Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ sớm liên hệ với bạn để xác nhận.");
            navigate('/my-trips');
        } else {
            setError(result.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    if (!tour) {
        return (
            <div className="container text-center py-24">
                <h2 className="text-2xl font-bold mb-4">Không tìm thấy thông tin tour.</h2>
                <Link to="/tours" className="btn primary__btn">Quay lại danh sách tour</Link>
            </div>
        );
    }

    return (
        <section className="bg-slate-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">Hoàn tất yêu cầu đặt tour</h1>
                        <p className="mt-4 text-lg text-gray-500">Vui lòng xác nhận lại thông tin dưới đây trước khi gửi.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            {/* Thông tin Tour */}
                            <div className="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b">
                                <img src={tour.image} alt={tour.title} className="w-full sm:w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0" />
                                <div className="flex-grow">
                                    <span className="text-sm font-semibold text-sky-600 bg-sky-100 py-1 px-3 rounded-full">{tour.destination?.name}</span>
                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">{tour.title}</h2>
                                    <p className="text-gray-500 mt-1">{tour.duration}</p>
                                </div>
                            </div>
                            
                            {/* Tóm tắt thông tin đã chọn */}
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 py-6 border-b">
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-full"><Calendar className="text-green-600" size={24}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Ngày khởi hành</p>
                                        <p className="font-bold text-lg text-gray-800">{new Date(finalSelectedDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-100 p-3 rounded-full"><Users className="text-orange-600" size={24}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Số lượng khách</p>
                                        {/* ✅ BỔ SUNG THÔNG TIN CHI TIẾT */}
                                        <p className="font-bold text-lg text-gray-800">{finalGuestCount} ({finalAdults} người lớn, {finalChildren} trẻ em)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 col-span-full">
                                    <div className="bg-indigo-100 p-3 rounded-full"><DollarSign className="text-indigo-600" size={24}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Tổng chi phí dự kiến</p>
                                        <p className="font-bold text-lg text-gray-800">${finalTotalCost}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Form điền thông tin bổ sung */}
                            <form onSubmit={handleClick} className="pt-6 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="text" value={user?.name || ''} readOnly className="w-full pl-12 pr-4 py-3 bg-gray-100 border-gray-200 rounded-lg cursor-not-allowed" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="tel" id="phoneNumber" required value={bookingDetails.phoneNumber} onChange={handleChange} placeholder="09xxxxxxxx" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* ✅ BỔ SUNG Ô NHẬP EMAIL */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email xác nhận <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="email" id="email" required value={bookingDetails.email} onChange={handleChange} placeholder="example@email.com" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú thêm</label>
                                    <textarea id="notes" rows="4" value={bookingDetails.notes} onChange={handleChange} placeholder="Yêu cầu đặc biệt về ăn uống, dị ứng thực phẩm, hoặc các câu hỏi khác..." className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
                                </div>
                                
                                <div className="bg-sky-50 p-4 rounded-lg flex items-start gap-3">
                                    <Info size={20} className="text-sky-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-sky-800">Đây là một yêu cầu đặt tour. Sau khi gửi, đội ngũ của chúng tôi sẽ kiểm tra và liên hệ với bạn qua số điện thoại trên để xác nhận trước khi tiến hành thanh toán.</p>
                                </div>
                                
                                {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center">{error}</p>}
                                
                                <button type="submit" disabled={loading} className="w-full btn primary__btn flex items-center justify-center gap-3 text-lg py-4 rounded-lg">
                                    <Edit3 size={20} />
                                    {loading ? 'Đang xử lý...' : 'Xác nhận và Gửi Yêu Cầu'}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Link to={`/tours/${tour.id || tour._id}`} className="text-sm text-gray-500 hover:text-sky-600 hover:underline">
                            Quay lại trang chi tiết tour
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingRequestPage;