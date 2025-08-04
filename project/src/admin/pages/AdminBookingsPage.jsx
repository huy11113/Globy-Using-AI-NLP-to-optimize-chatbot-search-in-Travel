import React, { useState, useEffect, useMemo } from 'react';
import { getAllBookings, approveBooking, rejectBooking } from '../../api/admin';
import { Check, X, Clock, Calendar, User, MoreHorizontal, ShoppingBag, CheckCircle, XCircle } from 'lucide-react';
import StatCard from '../components/StatCard'; // Tái sử dụng component StatCard

// Component con để hiển thị trạng thái bằng badge màu
const StatusBadge = ({ status }) => {
    const statusInfo = {
        pending_approval: { text: 'Chờ duyệt', className: 'bg-yellow-100 text-yellow-800', Icon: Clock },
        approved: { text: 'Đã duyệt', className: 'bg-blue-100 text-blue-800', Icon: CheckCircle },
        confirmed: { text: 'Hoàn tất', className: 'bg-green-100 text-green-800', Icon: CheckCircle },
        rejected: { text: 'Đã từ chối', className: 'bg-red-100 text-red-800', Icon: XCircle },
    };

    const currentStatus = statusInfo[status] || { text: 'Không rõ', className: 'bg-gray-100 text-gray-800', Icon: MoreHorizontal };

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${currentStatus.className}`}>
            <currentStatus.Icon size={14} className="mr-1.5" />
            {currentStatus.text}
        </span>
    );
};


const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchBookings = async () => {
        setLoading(true);
        const result = await getAllBookings();
        if (result.success) {
            const sortedBookings = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBookings(sortedBookings);
        } else {
            // Hiển thị lỗi nếu có
            alert('Lỗi khi tải danh sách booking: ' + result.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleAction = async (actionFunc, bookingId, confirmMessage) => {
        if (window.confirm(confirmMessage)) {
            const result = await actionFunc(bookingId);
            if (result.success) {
                alert(result.message);
                fetchBookings(); // Tải lại danh sách
            } else {
                alert('Thao tác thất bại: ' + result.message);
            }
        }
    };
    
    // Lọc danh sách booking dựa trên filter state
    const filteredBookings = useMemo(() => 
        bookings.filter(b => filter === 'all' || b.status === filter),
        [bookings, filter]
    );

    // Tính toán số liệu cho StatCards
    const stats = useMemo(() => ({
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending_approval').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
    }), [bookings]);


    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách bookings...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý Bookings</h1>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 <StatCard icon={<ShoppingBag size={28} />} title="Tổng số Bookings" value={stats.total} />
                 <StatCard icon={<Clock size={28} />} title="Đang chờ duyệt" value={stats.pending} />
                 <StatCard icon={<CheckCircle size={28} />} title="Đã hoàn tất" value={stats.confirmed} />
            </div>

            {/* Bảng dữ liệu */}
            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                {/* Header của bảng: Filter */}
                <div className="p-4 border-b border-gray-200">
                     <select onChange={(e) => setFilter(e.target.value)} value={filter} className="p-2 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending_approval">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="confirmed">Hoàn tất</option>
                        <option value="rejected">Đã từ chối</option>
                    </select>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày đi</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <User size={20} className="text-gray-500"/>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                                                <div className="text-sm text-gray-500">{booking.user?.phoneNumber}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.tour?.title}</div>
                                        <div className="text-sm text-gray-500">{booking.people} khách - ${booking.totalPrice}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(booking.startDate).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {booking.status === 'pending_approval' && (
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleAction(approveBooking, booking.id, 'Bạn có chắc muốn DUYỆT yêu cầu này?')} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200" title="Duyệt">
                                                    <Check size={16} />
                                                </button>
                                                <button onClick={() => handleAction(rejectBooking, booking.id, 'Bạn có chắc muốn TỪ CHỐI yêu cầu này?')} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200" title="Từ chối">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && <p className="text-center p-8 text-gray-500">Không có đơn đặt tour nào.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminBookingsPage;