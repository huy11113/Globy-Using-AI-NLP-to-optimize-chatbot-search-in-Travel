import React from 'react';
import { Link } from 'react-router-dom';
import useTours from '@/hooks/useTours';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { deleteTour } from '@/api/admin'; // Import hàm API

const AdminToursPage = () => {
    const { tours, loading, error, setTours } = useTours({ limit: 1000, sortBy: '-createdAt' });

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách tours...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    const handleDelete = async (tourId, tourTitle) => {
        if (window.confirm(`Bạn có chắc muốn xóa tour "${tourTitle}"?`)) {
            const result = await deleteTour(tourId);
            if (result.success) {
                alert(result.message);
                // Cập nhật lại danh sách tour trên UI mà không cần gọi lại API
                setTours(currentTours => currentTours.filter(t => t._id !== tourId));
            } else {
                alert(`Lỗi khi xóa: ${result.message}`);
            }
        }
    };

    // ... (phần JSX giữ nguyên như trước)
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Tours</h1>
                <Link
                    to="/admin/tours/new"
                    className="flex items-center gap-2 bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                    <PlusCircle size={20} />
                    Thêm Tour mới
                </Link>
            </div>
            
            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Hình ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tên Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Địa điểm</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Giá</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Nổi bật</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tours.map(tour => (
                                <tr key={tour._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img src={tour.image} alt={tour.title} className="w-16 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="text-sm font-medium text-gray-900 w-64 truncate">{tour.title}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tour.destination?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${tour.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {tour.featured && (
                                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                Yes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center gap-4">
                                            <Link to={`/admin/tours/edit/${tour._id}`} className="text-sky-600 hover:text-sky-800" title="Chỉnh sửa">
                                                <Edit size={18} />
                                            </Link>
                                            <button onClick={() => handleDelete(tour._id, tour.title)} className="text-red-600 hover:text-red-800" title="Xóa">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminToursPage;