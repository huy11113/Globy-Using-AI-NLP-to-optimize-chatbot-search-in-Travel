import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTours from '@/hooks/useTours';
import { deleteTour } from '@/api/admin';
import { PlusCircle, Edit, Trash2, Search, Star, DollarSign, MapPin, Inbox } from 'lucide-react';
import Pagination from '@/components/common/Pagination'; // Tái sử dụng Pagination component

// --- COMPONENT CON ---

// Skeleton UI cho bảng khi đang tải dữ liệu
const TableRowSkeleton = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4"><div className="w-16 h-16 bg-gray-200 rounded-md"></div></td>
        <td className="px-6 py-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
        <td className="px-6 py-4"><div className="h-8 w-12 bg-gray-200 rounded-full mx-auto"></div></td>
        <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-md w-20 mx-auto"></div></td>
    </tr>
);

// Component cho một hàng trong bảng
const TourTableRow = ({ tour, onDelete }) => (
    <tr key={tour._id} className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4">
            <img src={tour.image} alt={tour.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
        </td>
        <td className="px-6 py-4 align-top">
            <p className="text-sm font-semibold text-gray-900 w-80 truncate" title={tour.title}>{tour.title}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <MapPin size={14} />
                <span>{tour.city}, {tour.destination?.name}</span>
            </div>
        </td>
        <td className="px-6 py-4 align-top text-sm text-gray-600">
            {tour.duration}
        </td>
        <td className="px-6 py-4 align-top text-sm font-semibold text-sky-700">
            {/* ✅ THAY ĐỔI TẠI ĐÂY: Định dạng giá sang VNĐ */}
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price)}
        </td>
        <td className="px-6 py-4 align-top text-center">
            {tour.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    <Star size={14} /> Nổi bật
                </span>
            )}
        </td>
        <td className="px-6 py-4 align-top text-center">
            <div className="flex justify-center items-center gap-4 h-full">
                <Link to={`/admin/tours/edit/${tour._id}`} className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-full transition-colors" title="Chỉnh sửa">
                    <Edit size={18} />
                </Link>
                <button onClick={() => onDelete(tour._id, tour.title)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors" title="Xóa">
                    <Trash2 size={18} />
                </button>
            </div>
        </td>
    </tr>
);


// --- COMPONENT CHÍNH ---
const AdminToursPage = () => {
    const { tours, loading, error, setTours } = useTours({ limit: 1000, sortBy: '-createdAt' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const TOURS_PER_PAGE = 8;

    const handleDelete = async (tourId, tourTitle) => {
        if (window.confirm(`Bạn có chắc muốn xóa tour "${tourTitle}"? Hành động này không thể hoàn tác.`)) {
            const result = await deleteTour(tourId);
            if (result.success) {
                // Thay thế alert bằng một hệ thống thông báo tốt hơn (ví dụ: react-toastify)
                console.log(result.message); 
                setTours(currentTours => currentTours.filter(t => t._id !== tourId));
            } else {
                console.error(`Lỗi khi xóa: ${result.message}`);
                alert(`Lỗi khi xóa: ${result.message}`);
            }
        }
    };

    const filteredTours = useMemo(() => {
        if (!searchTerm) return tours;
        return tours.filter(tour =>
            tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tours, searchTerm]);
    
    const paginatedTours = useMemo(() => {
        const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
        return filteredTours.slice(startIndex, startIndex + TOURS_PER_PAGE);
    }, [filteredTours, currentPage]);

    const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);

    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Tours ({filteredTours.length})</h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tour..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <Link to="/admin/tours/new" className="flex-shrink-0 flex items-center gap-2 bg-sky-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-sky-600 transition-colors shadow-sm">
                        <PlusCircle size={20} />
                        <span>Thêm Tour</span>
                    </Link>
                </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Hình ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tên Tour & Địa điểm</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Thời lượng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Giá</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
                            ) : paginatedTours.length > 0 ? (
                                paginatedTours.map(tour => <TourTableRow key={tour._id} tour={tour} onDelete={handleDelete} />)
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-12 text-gray-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <Inbox size={48} className="text-gray-300"/>
                                            <span className="font-semibold">Không tìm thấy tour nào</span>
                                            <p className="text-sm">Hãy thử một từ khóa tìm kiếm khác hoặc thêm tour mới.</p>
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

export default AdminToursPage;