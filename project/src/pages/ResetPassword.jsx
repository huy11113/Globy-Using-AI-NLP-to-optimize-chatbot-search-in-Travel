import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { submitNewPassword } from '../api/auth';
import { Plane, Lock, Hash, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  // --- HOOKS ---
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const phoneNumber = query.get('phone');

  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({ 
    resetCode: '', 
    newPassword: '',
    confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (!phoneNumber) {
        setError("Không tìm thấy số điện thoại. Vui lòng thử lại từ đầu.");
        return;
    }

    setIsLoading(true);
    try {
      const result = await submitNewPassword({ 
        phoneNumber, 
        resetCode: formData.resetCode,
        newPassword: formData.newPassword 
      });
      if (result.success) {
        setMessage('Mật khẩu đã được đặt lại thành công! Đang chuyển đến trang đăng nhập...');
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setError(result.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.');
    } finally {
      setIsLoading(false);
    }
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
              Tạo mật khẩu mới
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Nhập mã xác nhận và mật khẩu mới của bạn.
            </p>
          </div>

          {message && <div className="text-center p-3 mb-6 bg-green-100 text-green-700 rounded-lg text-sm">{message}</div>}
          {error && <div className="text-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Reset Code Input */}
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="resetCode" type="text" required placeholder="Mã xác nhận" value={formData.resetCode} onChange={handleChange} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>

            {/* New Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="newPassword" type={showPassword ? 'text' : 'password'} required placeholder="Mật khẩu mới" value={formData.newPassword} onChange={handleChange} className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm New Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required placeholder="Xác nhận mật khẩu mới" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div>
              <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 transition-all duration-300">
                {isLoading ? 'Đang lưu...' : 'Đặt lại mật khẩu'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-600">
              <ArrowLeft size={16} />
              Quay lại Đăng nhập
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop" 
            alt="Travel background" 
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <h3 className="text-4xl font-bold leading-tight">An toàn và bảo mật.</h3>
            <p className="mt-4 text-lg opacity-90">Tài khoản của bạn sẽ sớm sẵn sàng để tiếp tục hành trình.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
