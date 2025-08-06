import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/api/user'; // Import API vừa tạo
import { Edit, Trash2, UserCheck, UserX } from 'lucide-react';

// Component con cho vai trò (role)
const RoleBadge = ({ role }) => {
    const is_admin = role === 'admin';
    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            is_admin ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
        }`}>
            {role}
        </span>
    );
};


const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const result = await getAllUsers();
            if (result.success) {
                setUsers(result.data);
            } else {
                setError(result.message || 'Không thể tải danh sách người dùng.');
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách người dùng...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    const handleDelete = (userId, userName) => {
        if (window.confirm(`Bạn có chắc muốn xóa người dùng "${userName}"?`)) {
            // TODO: Kết nối API xóa người dùng
            alert(`Chức năng xóa người dùng "${userName}" sẽ sớm được triển khai.`);
            console.log("Deleting user:", userId);
        }
    };
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý Người dùng</h1>

            <div className="bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Số điện thoại</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} 
                                                alt={user.name} 
                                                className="w-10 h-10 object-cover rounded-full" 
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phoneNumber || 'Chưa cập nhật'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex justify-center gap-4">
                                            <button className="text-sky-600 hover:text-sky-800" title="Chỉnh sửa vai trò">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(user._id, user.name)} className="text-red-600 hover:text-red-800" title="Xóa người dùng">
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

export default AdminUsersPage;