import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, loginWithGoogle } from '../api/auth'; // Import thêm hàm loginWithGoogle
import { AuthContext } from '../context/AuthContext';
import { Plane, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google'; // Import component chính thức từ thư viện

const Login = () => {
    // --- STATE MANAGEMENT ---
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // --- HOOKS ---
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // --- HANDLERS ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await loginUser({ phoneNumber, password });
            if (result.success) {
                login(result.data, result.token); // Giả sử context của bạn có thể nhận token
                navigate('/'); 
            } else {
                setError(result.message || 'Số điện thoại hoặc mật khẩu không hợp lệ.');
            }
        } catch (err) {
            setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- GOOGLE LOGIN HANDLERS ---
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        setIsLoading(true);
        setError('');
        try {
            // Gửi Google Token về backend để xác thực và lấy token của ứng dụng
            const result = await loginWithGoogle(credentialResponse.credential);
            if (result.success) {
                // Đăng nhập thành công, cập nhật context và chuyển hướng
                login(result.data, result.token);
                navigate('/');
            } else {
                setError(result.message || 'Đăng nhập bằng Google thất bại.');
            }
        } catch (err) {
            setError('Không thể kết nối đến máy chủ để xác thực Google.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGoogleLoginError = () => {
        setError('Quá trình đăng nhập Google đã bị lỗi. Vui lòng thử lại.');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 pt-20">
            <div className="relative w-full max-w-4xl flex bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="p-2 bg-sky-500 text-white rounded-full">
                                <Plane className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Globy</h1>
                        </Link>
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Chào mừng trở lại!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Đăng nhập để tiếp tục hành trình của bạn.
                        </p>
                    </div>

                    {error && (
                        <div className="text-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Phone Number Input */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input 
                                id="phone-number" 
                                type="tel" 
                                required 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
                                placeholder="Số điện thoại" 
                                value={phoneNumber} 
                                onChange={e => setPhoneNumber(e.target.value)} 
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input 
                                id="password-login" 
                                type={showPassword ? 'text' : 'password'} 
                                required 
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
                                placeholder="Mật khẩu" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="text-sm text-right">
                            <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400 transition-all duration-300"
                            >
                                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-sm text-gray-500">Hoặc tiếp tục với</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
                    {/* Google Login Button */}
                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                            useOneTap // Tùy chọn: Tự động hiện popup nếu người dùng đã đăng nhập Google trước đó
                        />
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="font-medium text-sky-600 hover:text-sky-500">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>

                {/* Image Section */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
                        alt="Travel background" 
                        className="absolute h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                        <h3 className="text-4xl font-bold leading-tight">Khám phá thế giới.</h3>
                        <p className="mt-4 text-lg opacity-90">Những hành trình tuyệt vời đang chờ bạn.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;