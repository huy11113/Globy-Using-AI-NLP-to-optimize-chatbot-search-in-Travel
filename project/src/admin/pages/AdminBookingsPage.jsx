import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllBookings, approveBooking, rejectBooking } from '../../api/admin';
import { Check, X, Clock, User, ShoppingBag, CheckCircle, XCircle, Search, Inbox } from 'lucide-react';
import StatCard from '../components/StatCard';
import Pagination from '../../components/common/Pagination'; // Tái sử dụng component Pagination

// --- COMPONENT CON ---

// Badge trạng thái (giữ nguyên)
const StatusBadge = ({ status }) => {
    const statusInfo = {
        pending_approval: { text: 'Chờ duyệt', className: 'bg-yellow-100 text-yellow-800', Icon: Clock },
        approved: { text: 'Đã duyệt', className: 'bg-sky-100 text-sky-800', Icon: CheckCircle },
        confirmed: { text: 'Hoàn tất', className: 'bg-green-100 text-green-800', Icon: CheckCircle },
        rejected: { text: 'Đã từ chối', className: 'bg-red-100 text-red-800', Icon: XCircle },
    };
    const currentStatus = statusInfo[status] || { text: 'Không rõ', className: 'bg-gray-100 text-gray-800', Icon: XCircle };
    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${currentStatus.className}`}>
            <currentStatus.Icon size={14} className="mr-1.5" />
            {currentStatus.text}
        </span>
    );
};

// Thanh Filter và Tìm kiếm
const BookingFilterBar = ({ filters, onFilterChange, onSearchChange }) => {
    const filterOptions = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Chờ duyệt', value: 'pending_approval' },
        { label: 'Đã duyệt', value: 'approved' },
        { label: 'Hoàn tất', value: 'confirmed' },
        { label: 'Đã từ chối', value: 'rejected' },
    ];

    return (
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Tìm theo tên khách hàng, tour..."
                    value={filters.searchTerm}
                    onChange={onSearchChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {filterOptions.map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => onFilterChange(opt.value)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                            filters.status === opt.value
                                ? 'bg-sky-600 text-white shadow'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- COMPONENT CHÍNH ---
const AdminBookingsPage = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ searchTerm: '', status: 'all' });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        const result = await getAllBookings();
        if (result.success) {
            setAllBookings(result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
            alert('Lỗi khi tải danh sách booking: ' + result.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleAction = async (actionFunc, bookingId, confirmMessage) => {
        if (window.confirm(confirmMessage)) {
            const result = await actionFunc(bookingId);
            if (result.success) {
                alert(result.message);
                fetchBookings();
            } else {
                alert('Thao tác thất bại: ' + result.message);
            }
        }
    };

    const handleFilterChange = (status) => {
        setFilters(prev => ({ ...prev, status }));
        setCurrentPage(1);
    };
    
    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
        setCurrentPage(1);
    };

    const filteredBookings = useMemo(() => {
        return allBookings.filter(b => {
            const matchesStatus = filters.status === 'all' || b.status === filters.status;
            const searchTermLower = filters.searchTerm.toLowerCase();
            const matchesSearch = !filters.searchTerm ||
                b.user?.name.toLowerCase().includes(searchTermLower) ||
                b.tour?.title.toLowerCase().includes(searchTermLower);
            return matchesStatus && matchesSearch;
        });
    }, [allBookings, filters]);
    
    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredBookings, currentPage]);

    const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

    const stats = useMemo(() => ({
        total: allBookings.length,
        pending: allBookings.filter(b => b.status === 'pending_approval').length,
        confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    }), [allBookings]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý Bookings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <StatCard icon={<ShoppingBag size={28} />} title="Tổng số Bookings" value={stats.total} />
                <StatCard icon={<Clock size={28} />} title="Đang chờ duyệt" value={stats.pending} />
                <StatCard icon={<CheckCircle size={28} />} title="Đã hoàn tất" value={stats.confirmed} />
            </div>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <BookingFilterBar filters={filters} onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Chi tiết Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày đặt</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-10 bg-gray-200 rounded-md"></div></td>
                                    </tr>
                                ))
                            ) : paginatedBookings.length > 0 ? (
                                paginatedBookings.map(booking => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <img src={booking.user?.avatar || `https://ui-avatars.com/api/?name=${booking.user?.name}&background=random`} alt="" className="w-10 h-10 rounded-full object-cover"/>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                                                    <div className="text-sm text-gray-500">{booking.user?.phoneNumber}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 w-52 truncate" title={booking.tour?.title}>{booking.tour?.title}</div>
                                            <div className="text-sm text-gray-500">{booking.people} khách - ${booking.totalPrice} - {new Date(booking.startDate).toLocaleDateString('vi-VN')}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={booking.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            {booking.status === 'pending_approval' && (
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => handleAction(approveBooking, booking.id, 'Bạn có chắc muốn DUYỆT yêu cầu này?')} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200" title="Duyệt"><Check size={16} /></button>
                                                    <button onClick={() => handleAction(rejectBooking, booking.id, 'Bạn có chắc muốn TỪ CHỐI yêu cầu này?')} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200" title="Từ chối"><X size={16} /></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-8 text-gray-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <Inbox size={48} className="text-gray-300"/>
                                            <span className="font-semibold">Không tìm thấy đơn đặt tour nào</span>
                                            <p className="text-sm">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-200">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookingsPage;