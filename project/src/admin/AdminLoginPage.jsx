import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/auth'; // Import hàm API vừa tạo

const AdminLoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginAdmin({ phoneNumber, password });
            if (response.success) {
                // Đăng nhập thành công, lưu token và thông tin admin
                localStorage.setItem('adminToken', response.token);
                localStorage.setItem('adminUser', JSON.stringify(response.data));
                
                // Chuyển hướng đến trang dashboard
                navigate('/admin/dashboard'); 
            } else {
                // Hiển thị lỗi từ server
                setError(response.message || 'Đã xảy ra lỗi không xác định.');
            }
        } catch (err) {
            setError('Không thể kết nối đến máy chủ, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-center text-gray-800">Admin Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
                                Số điện thoại
                            </label>
                            <input 
                                id="phoneNumber"
                                type="text" 
                                placeholder="Nhập số điện thoại"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <input 
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}

                    <button 
                        type="submit"
                        className="w-full px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
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