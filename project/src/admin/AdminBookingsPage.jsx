import React, { useState, useEffect } from 'react';
import { getAllBookings, approveBooking, rejectBooking } from '../api/admin';
import { Check, X } from 'lucide-react';

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // State để lọc: all, pending_approval, etc.

    const fetchBookings = async () => {
        setLoading(true);
        const result = await getAllBookings();
        if (result.success) {
            // Sắp xếp các booking mới nhất lên đầu
            const sortedBookings = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBookings(sortedBookings);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleApprove = async (bookingId) => {
        if (window.confirm('Bạn có chắc muốn duyệt yêu cầu này?')) {
            await approveBooking(bookingId);
            fetchBookings(); // Tải lại danh sách sau khi duyệt
        }
    };

    const handleReject = async (bookingId) => {
        if (window.confirm('Bạn có chắc muốn từ chối yêu cầu này?')) {
            await rejectBooking(bookingId);
            fetchBookings(); // Tải lại danh sách sau khi từ chối
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-blue-100 text-blue-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

    if (loading) return <div className="p-8 text-center">Đang tải danh sách...</div>;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Quản lý Đặt tour</h1>
            
            {/* Bộ lọc */}
            <div className="mb-4">
                <select onChange={(e) => setFilter(e.target.value)} value={filter} className="p-2 border rounded-md">
                    <option value="all">Tất cả</option>
                    <option value="pending_approval">Chờ duyệt</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="rejected">Đã từ chối</option>
                </select>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người đặt</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBookings.map(booking => (
                            <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{booking.tour?.title}</div>
                                    <div className="text-sm text-gray-500">{booking.people} khách</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.user?.name}</div>
                                    <div className="text-sm text-gray-500">{booking.user?.phoneNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {new Date(booking.startDate).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                                        {booking.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    {booking.status === 'pending_approval' && (
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleApprove(booking.id)} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200" title="Duyệt">
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => handleReject(booking.id)} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200" title="Từ chối">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredBookings.length === 0 && <p className="text-center p-4 text-gray-500">Không có đơn đặt tour nào khớp với bộ lọc.</p>}
            </div>
        </div>
    );
};

export default AdminBookingsPage;