import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllUsers, deleteUser, updateUserRole } from '@/api/user'; // Giả sử bạn sẽ thêm updateUserRole vào API
import { Edit, Trash2, UserCog, User, Search, Inbox, ShieldCheck } from 'lucide-react';
import Pagination from '@/components/common/Pagination'; // Tái sử dụng Pagination

// --- COMPONENT CON ---

// Badge hiển thị vai trò người dùng
const RoleBadge = ({ role }) => {
    const isAdmin = role === 'admin';
    const Icon = isAdmin ? ShieldCheck : User;
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
            isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
        }`}>
            <Icon size={14} />
            <span className="capitalize">{role}</span>
        </span>
    );
};

// Skeleton UI cho bảng khi đang tải
const UserTableRowSkeleton = () => (
    <tr className="animate-pulse">
        <td className="px-6 py-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
        <td className="px-6 py-4"><div className="h-8 w-20 bg-gray-200 rounded-full mx-auto"></div></td>
        <td className="px-6 py-4"><div className="h-8 w-24 bg-gray-200 rounded-md mx-auto"></div></td>
    </tr>
);


// --- COMPONENT CHÍNH ---
const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ searchTerm: '', role: 'all' });
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10;

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const result = await getAllUsers();
        if (result.success) {
            setAllUsers(result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } else {
            setError(result.message || 'Không thể tải danh sách người dùng.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    // Hàm cập nhật user trong state sau khi sửa
    const handleUpdateUserInState = (updatedUser) => {
        setAllUsers(currentUsers =>
            currentUsers.map(u => u._id === updatedUser._id ? updatedUser : u)
        );
    };

    const handleEditRole = async (user) => {
        const newRole = window.prompt(`Nhập vai trò mới cho ${user.name} (admin hoặc user):`, user.role);
        if (newRole && (newRole === 'admin' || newRole === 'user')) {
            // Giả sử bạn đã có hàm updateUserRole trong api/user.js
            const result = await updateUserRole(user._id, newRole);
            if (result.success) {
                alert(result.message);
                handleUpdateUserInState(result.data);
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        } else if (newRole) {
            alert("Vai trò không hợp lệ. Vui lòng nhập 'admin' hoặc 'user'.");
        }
    };
    
    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) {
            // Giả sử bạn đã có hàm deleteUser trong api/user.js
            const result = await deleteUser(userId);
            if (result.success) {
                alert(result.message);
                setAllUsers(currentUsers => currentUsers.filter(u => u._id !== userId));
            } else {
                alert(`Lỗi khi xóa: ${result.message}`);
            }
        }
    };

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const matchesRole = filters.role === 'all' || user.role === filters.role;
            const searchTermLower = filters.searchTerm.toLowerCase();
            const matchesSearch = !filters.searchTerm ||
                user.name.toLowerCase().includes(searchTermLower) ||
                (user.email && user.email.toLowerCase().includes(searchTermLower)) ||
                (user.phoneNumber && user.phoneNumber.includes(searchTermLower));
            return matchesRole && matchesSearch;
        });
    }, [allUsers, filters]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h1 className="text-3xl font-bold text-gray-800">Quản lý Người dùng ({filteredUsers.length})</h1>
                 <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm người dùng..."
                        value={filters.searchTerm}
                        onChange={(e) => { setFilters(prev => ({...prev, searchTerm: e.target.value})); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="p-4 border-b">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'admin', 'user'].map(role => (
                             <button
                                key={role}
                                onClick={() => { setFilters(prev => ({...prev, role})); setCurrentPage(1); }}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                    filters.role === role
                                        ? 'bg-sky-600 text-white shadow'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                <span className="capitalize">{role === 'all' ? 'Tất cả' : role}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Thông tin liên hệ</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Ngày tham gia</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <UserTableRowSkeleton key={i} />)
                            ) : paginatedUsers.length > 0 ? (
                                paginatedUsers.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <img 
                                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} 
                                                    alt={user.name} 
                                                    className="w-10 h-10 object-cover rounded-full" 
                                                />
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <p>{user.email || 'Chưa có email'}</p>
                                            <p className="text-gray-500">{user.phoneNumber || 'Chưa có SĐT'}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <RoleBadge role={user.role} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleEditRole(user)} className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-full transition-colors" title="Chỉnh sửa vai trò">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(user._id, user.name)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors" title="Xóa người dùng">
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
                                            <Inbox size={48} className="text-gray-300"/>
                                            <span className="font-semibold">Không tìm thấy người dùng</span>
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

export default AdminUsersPage;