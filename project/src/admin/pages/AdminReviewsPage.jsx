import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllReviewsForAdmin, updateReviewVisibility, deleteReview } from '@/api/admin';
import { Star, Eye, EyeOff, Trash2, Search, Inbox, MessageSquare } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

// --- COMPONENT CON ---

const VisibilityBadge = ({ isVisible }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
        isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
    }`}>
        {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
        <span>{isVisible ? 'Hiển thị' : 'Đã ẩn'}</span>
    </span>
);

// --- COMPONENT CHÍNH ---
const AdminReviewsPage = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const REVIEWS_PER_PAGE = 10;

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        const result = await getAllReviewsForAdmin();
        if (result.success) {
            setAllReviews(result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
            setError(result.message || 'Không thể tải danh sách đánh giá.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleToggleVisibility = async (review) => {
        const newVisibility = !review.isVisible;
        const action = newVisibility ? 'HIỂN THỊ' : 'ẨN';
        if (window.confirm(`Bạn có chắc muốn ${action} đánh giá này?`)) {
            const result = await updateReviewVisibility(review.id, newVisibility);
            if (result.success) {
                setAllReviews(current => current.map(r => r.id === review.id ? result.data : r));
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Bạn có chắc muốn XÓA VĨNH VIỄN đánh giá này?')) {
            const result = await deleteReview(reviewId);
            if (result.success) {
                setAllReviews(current => current.filter(r => r.id !== reviewId));
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        }
    };

    const filteredReviews = useMemo(() => {
        return allReviews.filter(r => 
            r.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tour?.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allReviews, searchTerm]);

    const paginatedReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
        return filteredReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
    }, [filteredReviews, currentPage]);

    const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);

    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Đánh giá ({filteredReviews.length})</h1>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tour, người dùng..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Khách hàng & Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nội dung</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Đánh giá</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-12 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-12 bg-gray-200 rounded-md"></div></td>
                                        <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-md mx-auto"></div></td>
                                        <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-full mx-auto w-24"></div></td>
                                        <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-md mx-auto w-20"></div></td>
                                    </tr>
                                ))
                            ) : paginatedReviews.length > 0 ? (
                                paginatedReviews.map(review => (
                                    <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-semibold text-gray-900">{review.user?.name}</p>
                                            <p className="text-xs text-gray-500 w-48 truncate" title={review.tour?.title}>Tour: {review.tour?.title}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 w-96 whitespace-pre-wrap">{review.comment}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <span className="font-bold text-yellow-500">{review.rating}</span>
                                                <Star size={16} className="text-yellow-400 fill-current ml-1" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <VisibilityBadge isVisible={review.isVisible} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleToggleVisibility(review)} className="p-2 text-gray-500 hover:text-sky-700 hover:bg-sky-100 rounded-full transition-colors" title={review.isVisible ? 'Ẩn' : 'Hiển thị'}>
                                                    {review.isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                <button onClick={() => handleDelete(review.id)} className="p-2 text-gray-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors" title="Xóa">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-12 text-gray-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <MessageSquare size={48} className="text-gray-300"/>
                                            <span className="font-semibold">Chưa có đánh giá nào</span>
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

export default AdminReviewsPage;