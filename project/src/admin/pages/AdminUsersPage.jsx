import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllUsers, deleteUser, updateUserRole, updateUserSuspension } from '@/api/user';
import { Edit, Trash2, Search, User, ShieldCheck, UserX, UserCheck, Inbox, MoreVertical, X } from 'lucide-react';
import Pagination from '@/components/common/Pagination';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT CON: Modal chỉnh sửa vai trò ---
const RoleEditModal = ({ user, onClose, onSave }) => {
    const [selectedRole, setSelectedRole] = useState(user.role);

    const handleSave = () => {
        if (selectedRole !== user.role) {
            onSave(user, selectedRole);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Đổi vai trò cho {user.name}</h3>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={20} /></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-gray-600">Chọn vai trò mới cho người dùng này.</p>
                        <div className="flex gap-4">
                            {['user', 'admin'].map(role => (
                                <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    className={`flex-1 p-4 rounded-lg border-2 text-center transition-all ${
                                        selectedRole === role
                                            ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                                            : 'border-gray-300 bg-white hover:border-gray-400'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2 font-semibold text-lg">
                                        {role === 'admin' ? <ShieldCheck /> : <User />}
                                        <span className="capitalize">{role}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">Hủy</button>
                        <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 font-semibold">Lưu thay đổi</button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- COMPONENT CON: Dropdown cho các hành động trên mỗi hàng ---
const ActionsDropdown = ({ user, onEditRole, onToggleSuspension, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="relative" onMouseLeave={() => setIsOpen(false)}>
            <button onMouseEnter={() => setIsOpen(true)} className="p-2 rounded-full hover:bg-gray-200">
                <MoreVertical size={18} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-10">
                    <button onClick={() => { onEditRole(user); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Edit size={14} /> Sửa vai trò
                    </button>
                    <button onClick={() => { onToggleSuspension(user); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {user.suspended ? <UserCheck size={14} className="text-green-600" /> : <UserX size={14} className="text-orange-600" />}
                        {user.suspended ? 'Mở khóa' : 'Khóa'}
                    </button>
                    <button onClick={() => { onDelete(user._id, user.name); setIsOpen(false); }} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <Trash2 size={14} /> Xóa
                    </button>
                </div>
            )}
        </div>
    );
};

// --- COMPONENT CON: RoleBadge ---
const RoleBadge = ({ role }) => {
    const isAdmin = role === 'admin';
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
            isAdmin ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
        }`}>
            {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
            <span className="capitalize">{role}</span>
        </span>
    );
};

// --- COMPONENT CHÍNH ---
const AdminUsersPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ searchTerm: '', role: 'all' });
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
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

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleUpdateUserInState = (updatedUser) => {
        setAllUsers(current => current.map(u => u._id === updatedUser._id ? updatedUser : u));
    };
    
    const handleEditRole = async (user, newRole) => {
        const result = await updateUserRole(user._id, newRole);
        if (result.success) {
            alert(result.message);
            handleUpdateUserInState(result.data);
        } else {
            alert(`Lỗi: ${result.message}`);
        }
    };

    const handleToggleSuspension = async (user) => {
        const action = user.suspended ? 'MỞ KHÓA' : 'KHÓA';
        if (window.confirm(`Bạn có chắc muốn ${action} tài khoản của ${user.name}?`)) {
            const result = await updateUserSuspension(user._id, !user.suspended);
            if (result.success) {
                alert(result.message);
                handleUpdateUserInState(result.data);
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        }
    };

    const handleDelete = async (userId, userName) => {
        if (window.confirm(`Bạn có chắc muốn XÓA VĨNH VIỄN người dùng "${userName}"?`)) {
            const result = await deleteUser(userId);
            if (result.success) {
                alert(result.message);
                setAllUsers(current => current.filter(u => u._id !== userId));
            } else {
                alert(`Lỗi khi xóa: ${result.message}`);
            }
        }
    };

    const filteredUsers = useMemo(() => {
        return allUsers.filter(user => {
            const matchesRole = filters.role === 'all' || user.role === filters.role;
            const searchTermLower = filters.searchTerm.toLowerCase();
            const matchesSearch = !filters.searchTerm || user.name.toLowerCase().includes(searchTermLower) || (user.email && user.email.toLowerCase().includes(searchTermLower)) || (user.phoneNumber && user.phoneNumber.includes(searchTermLower));
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
            {editingUser && (
                <RoleEditModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleEditRole}
                />
            )}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h1 className="text-3xl font-bold text-gray-800">Quản lý Người dùng ({filteredUsers.length})</h1>
                 <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Tìm người dùng..." value={filters.searchTerm} onChange={(e) => { setFilters(prev => ({...prev, searchTerm: e.target.value})); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" />
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="p-4 border-b">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'admin', 'user'].map(role => (
                             <button key={role} onClick={() => { setFilters(prev => ({...prev, role})); setCurrentPage(1); }} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${ filters.role === role ? 'bg-sky-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' }`}>
                                <span className="capitalize">{role === 'all' ? 'Tất cả' : role}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Liên hệ</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Ngày tham gia</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Vai trò</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan="6" className="p-4"><div className="h-12 bg-gray-200 rounded-md animate-pulse"></div></td></tr>)
                            ) : paginatedUsers.length > 0 ? (
                                paginatedUsers.map(user => (
                                    <tr key={user._id} className={`transition-colors ${user.suspended ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} alt={user.name} className="w-10 h-10 object-cover rounded-full" />
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email || 'Chưa có email'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{user.phoneNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.suspended ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.suspended ? 'Đã khóa' : 'Hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center"><RoleBadge role={user.role} /></td>
                                        <td className="px-6 py-4 text-center">
                                            <ActionsDropdown user={user} onEditRole={() => setEditingUser(user)} onToggleSuspension={handleToggleSuspension} onDelete={handleDelete} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="text-center p-12 text-gray-500"><Inbox size={48} className="mx-auto text-gray-300"/><span className="mt-2 block font-semibold">Không tìm thấy người dùng</span></td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="p-4 border-t"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;