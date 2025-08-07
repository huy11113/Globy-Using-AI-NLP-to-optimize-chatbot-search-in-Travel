import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMyTrips } from '../api/booking';
import { Calendar, Users, DollarSign, MapPin, CheckCircle, Clock, AlertCircle, CreditCard, ListChecks, History } from 'lucide-react';

// --- COMPONENT PHỤ CHO HERO SECTION (giữ nguyên) ---
const CommonHeroSection = ({ title }) => (
    <section className="relative bg-cover bg-center bg-no-repeat h-60" style={{ backgroundImage: "url('https://images.spiderum.com/sp-images/8bbb4170ad1b11ecb24f5b60ba61a646.png')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                {title}
            </h1>
        </div>
    </section>
);


// --- COMPONENT CHÍNH ---
const MyTripsPage = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    
    // <<< THAY ĐỔI: Thêm state để quản lý tab và các danh sách booking
    const [activeTab, setActiveTab] = useState('inProgress'); // 'inProgress' hoặc 'completed'
    const [inProgressBookings, setInProgressBookings] = useState([]);
    const [completedBookings, setCompletedBookings] = useState([]);


    useEffect(() => {
        if (user && user._id) {
            const fetchTrips = async () => {
                setLoading(true);
                const result = await getMyTrips(user._id);
                if (result.success) {
                    const sortedBookings = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    
                    // <<< THAY ĐỔI: Lọc booking ra 2 danh sách
                    const inProgress = sortedBookings.filter(b => b.status === 'pending_approval' || b.status === 'approved');
                    const completed = sortedBookings.filter(b => b.status === 'confirmed' || b.status === 'rejected');
                    
                    setInProgressBookings(inProgress);
                    setCompletedBookings(completed);
                }
                setLoading(false);
            };
            fetchTrips();
        } else {
            setLoading(false);
        }
    }, [user]);

    // ... (Hàm getStatusInfo, loading, not user giữ nguyên)
    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending_approval':
                return { text: 'Chờ xác nhận', className: 'bg-yellow-100 text-yellow-800', Icon: Clock };
            case 'approved':
                return { text: 'Đã duyệt - Chờ thanh toán', className: 'bg-green-100 text-green-800', Icon: CheckCircle };
            case 'confirmed':
                return { text: 'Đã hoàn tất', className: 'bg-sky-100 text-sky-800', Icon: CheckCircle };
            case 'rejected':
                return { text: 'Đã từ chối', className: 'bg-red-100 text-red-800', Icon: AlertCircle };
            default:
                return { text: 'Không rõ', className: 'bg-gray-100 text-gray-800', Icon: AlertCircle };
        }
    };

    // --- COMPONENT PHỤ ĐỂ RENDER MỘT BOOKING CARD ---
    const BookingCard = ({ booking }) => {
        const statusInfo = getStatusInfo(booking.status);
        return (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
                <div className="md:w-1/3">
                    <img src={booking.tour?.image} alt={booking.tour?.title} className="w-full h-48 md:h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow md:w-2/3">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-semibold text-sky-600 bg-sky-100 py-1 px-3 rounded-full">{booking.tour?.destination?.name}</span>
                        <div className={`flex items-center gap-2 text-xs font-bold py-1 px-3 rounded-full ${statusInfo.className}`}>
                            <statusInfo.Icon size={14} />
                            {statusInfo.text}
                        </div>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 leading-tight">{booking.tour?.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                        <p className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> <strong>Điểm đi:</strong> {booking.tour?.startLocation}</p>
                        <p className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> <strong>Ngày đi:</strong> {new Date(booking.startDate).toLocaleDateString('vi-VN')}</p>
                        <p className="flex items-center gap-2"><Users size={16} className="text-gray-400"/> <strong>Số khách:</strong> {booking.people}</p>
                        <p className="flex items-center gap-2"><DollarSign size={16} className="text-gray-400"/> <strong>Chi phí:</strong> <span className="font-bold text-gray-800">${booking.totalPrice?.toFixed(2)}</span></p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                         {booking.status === 'approved' && (
                            <div className="flex flex-col sm:flex-row justify-between items-center">
                                <p className="text-green-700 font-medium text-sm mb-2 sm:mb-0">Yêu cầu của bạn đã được duyệt!</p>
                                <Link to={`/checkout/${booking.id}`} className="w-full sm:w-auto">
                                    <button className="flex items-center justify-center gap-2 w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-all duration-300">
                                        <CreditCard size={16} />
                                        Thanh toán ngay
                                    </button>
                                </Link>
                            </div>
                        )}
                        {booking.status === 'pending_approval' && <p className="text-yellow-700 font-medium text-sm text-center">Chúng tôi đang xem xét yêu cầu của bạn và sẽ sớm liên hệ.</p>}
                        {booking.status === 'confirmed' && <p className="text-sky-700 font-medium text-sm text-center">Chuyến đi đã được xác nhận. Chúc bạn có một hành trình tuyệt vời!</p>}
                        {booking.status === 'rejected' && <p className="text-red-700 font-medium text-sm text-center">Rất tiếc, yêu cầu của bạn đã bị từ chối. Vui lòng liên hệ để biết thêm chi tiết.</p>}
                    </div>
                </div>
            </div>
        );
    };

    const hasBookings = inProgressBookings.length > 0 || completedBookings.length > 0;

    return (
        <>
            <CommonHeroSection title="Chuyến Đi Của Tôi" />
            <section className="bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    {!hasBookings && !loading ? (
                        <div className="text-center bg-white p-10 rounded-lg shadow-md">
                             <h2 className="text-2xl font-bold mb-4">Chưa có chuyến đi nào được đặt!</h2>
                            <p className="text-gray-600 mb-6">Hãy bắt đầu khám phá và chọn cho mình một chuyến đi tuyệt vời nhé.</p>
                            <Link to="/tours" className="btn primary__btn">Xem tất cả Tour</Link>
                        </div>
                    ) : (
                        <div>
                            {/* --- THANH TABS --- */}
                            <div className="mb-8 flex justify-center border-b">
                                <button onClick={() => setActiveTab('inProgress')} className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === 'inProgress' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>
                                    <ListChecks size={20} /> Đang tiến hành ({inProgressBookings.length})
                                </button>
                                <button onClick={() => setActiveTab('completed')} className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === 'completed' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>
                                    <History size={20} /> Lịch sử ({completedBookings.length})
                                </button>
                            </div>

                            {/* --- NỘI DUNG TABS --- */}
                            <div className="grid gap-8">
                                {activeTab === 'inProgress' && (
                                    inProgressBookings.length > 0
                                        ? inProgressBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
                                        : <p className="text-center text-gray-500 py-8">Không có chuyến đi nào đang tiến hành.</p>
                                )}
                                {activeTab === 'completed' && (
                                    completedBookings.length > 0
                                        ? completedBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
                                        : <p className="text-center text-gray-500 py-8">Chưa có chuyến đi nào hoàn tất.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default MyTripsPage;