import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDestinations from '@/hooks/useDestinations'; // Tái sử dụng hook
import { deleteDestination } from '@/api/admin';
import { PlusCircle, Edit, Trash2, Search, Globe } from 'lucide-react';

const AdminDestinationsPage = () => {
    const { destinations, loading, error, setDestinations } = useDestinations(); // Lấy thêm setDestinations
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (id, name) => {
        if (window.confirm(`Bạn có chắc muốn xóa điểm đến "${name}"?`)) {
            const result = await deleteDestination(id);
            if (result.success) {
                alert(result.message);
                // Cập nhật lại state sau khi xóa
                setDestinations(current => current.filter(d => d._id !== id));
            } else {
                alert(`Lỗi khi xóa: ${result.message}`);
            }
        }
    };

    const filteredDestinations = destinations.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.continent.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Điểm đến ({filteredDestinations.length})</h1>
                <Link to="/admin/destinations/new" className="btn primary__btn flex items-center gap-2">
                    <PlusCircle size={20} /> Thêm Điểm đến
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="p-4 border-b">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm theo tên, châu lục..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* ... thead ... */}
                         <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Hình ảnh</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tên Điểm đến</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Châu lục</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="4" className="p-4"><div className="h-16 bg-gray-200 rounded-md animate-pulse"></div></td></tr>
                            ) : filteredDestinations.map(dest => (
                                <tr key={dest._id}>
                                    <td className="px-6 py-4"><img src={dest.image} alt={dest.name} className="w-24 h-16 object-cover rounded-md"/></td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">{dest.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{dest.continent}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/admin/destinations/edit/${dest._id}`} className="p-2 text-sky-600 hover:bg-sky-100 rounded-full"><Edit size={18} /></Link>
                                            <button onClick={() => handleDelete(dest._id, dest.name)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
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

export default AdminDestinationsPage;