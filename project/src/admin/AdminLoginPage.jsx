import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../api/auth'; // Đảm bảo bạn đã có hàm này trong api/auth.js
import { Plane, Phone, Lock } from 'lucide-react';

const AdminLoginPage = () => {
    const [credentials, setCredentials] = useState({ phoneNumber: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await loginAdmin(credentials);
            if (result.success) {
                // Đăng nhập thành công!
                // 1. Lưu token và thông tin admin vào localStorage
                localStorage.setItem('adminToken', result.token);
                localStorage.setItem('adminUser', JSON.stringify(result.data));
                
                // 2. Chuyển hướng đến trang dashboard
                navigate('/admin/dashboard'); 
            } else {
                // Hiển thị lỗi từ server
                setError(result.message || 'Thông tin đăng nhập không chính xác.');
            }
        } catch (err) {
            setError('Không thể kết nối đến máy chủ, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="p-3 bg-sky-500 text-white rounded-full">
                            <Plane className="h-8 w-8" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-800">Admin Login</h1>
                    <p className="mt-2 text-gray-500">Chào mừng đến trang quản trị.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phoneNumber">
                            Số điện thoại
                        </label>
                        <input 
                            id="phoneNumber"
                            type="tel" 
                            placeholder="Nhập số điện thoại"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={credentials.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input 
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

                    <button 
                        type="submit"
                        className="w-full px-6 py-3 text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 transition-all duration-300 font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AdminLoginPage;