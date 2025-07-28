import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, registerUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { Plane, User, Phone, Lock, Mail, Eye, EyeOff } from 'lucide-react';

// --- COMPONENT FORM ĐĂNG NHẬP ---
const SignInForm = ({ setIsLoading, setError, login }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await loginUser({ phoneNumber, password });
      if (result.success) {
        login(result.data);
        navigate('/');
      } else {
        setError(result.message || 'Số điện thoại hoặc mật khẩu không hợp lệ.');
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 text-center">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Đăng Nhập</h1>
      <div className="flex space-x-4 my-4">
        {/* Social login buttons can be added here */}
      </div>
      <span className="text-sm text-gray-500 mb-4">sử dụng tài khoản của bạn</span>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="tel" placeholder="Số điện thoại" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Link to="/forgot-password" className="text-xs text-gray-600 hover:underline block text-right">Quên mật khẩu?</Link>
        <button type="submit" className="w-full py-3 font-bold text-white bg-sky-500 rounded-full hover:bg-sky-600 transition-colors uppercase tracking-wider">Đăng Nhập</button>
      </form>
    </div>
  );
};

// --- COMPONENT FORM ĐĂNG KÝ ---
const SignUpForm = ({ setIsLoading, setError, setSuccess }) => {
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const result = await registerUser(formData);
      if (result.success) {
        setSuccess('Đăng ký thành công! Vui lòng chuyển sang đăng nhập.');
      } else {
        setError(result.message || 'Lỗi đăng ký.');
      }
    } catch (err) {
      setError('Không thể kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tạo Tài Khoản</h1>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="name" type="text" placeholder="Họ và tên" required value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
        <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input name="phoneNumber" type="tel" placeholder="Số điện thoại" required value={formData.phoneNumber} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" /></div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu" required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" />
           <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit" className="w-full py-3 font-bold text-white bg-sky-500 rounded-full hover:bg-sky-600 transition-colors uppercase tracking-wider">Đăng Ký</button>
      </form>
    </div>
  );
};

// --- COMPONENT CHÍNH CỦA TRANG ---
const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const togglePanel = () => {
    setError('');
    setSuccess('');
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
      <div className="relative w-full max-w-4xl min-h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Form Đăng ký */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-full opacity-100 z-20' : 'opacity-0 z-10'}`}>
          <SignUpForm setIsLoading={setIsLoading} setError={setError} setSuccess={setSuccess} />
        </div>
        
        {/* Form Đăng nhập */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isSignUp ? 'opacity-0 z-10' : 'opacity-100 z-20'}`}>
          <SignInForm setIsLoading={setIsLoading} setError={setError} login={login} />
        </div>

        {/* Lớp Overlay chuyển động */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${isSignUp ? '-translate-x-full' : ''}`}>
          <div 
            className="relative bg-gradient-to-r from-sky-500 to-blue-600 h-full w-[200%] text-white transition-transform duration-700 ease-in-out" 
            style={{ 
              transform: isSignUp ? 'translateX(50%)' : 'translateX(0)',
              backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Panel cho Đăng nhập */}
            <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-10">
              <AnimatePresence>
                {!isSignUp && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-3xl font-bold">Xin chào!</h1>
                    <p className="my-4 text-sm">Chưa có tài khoản? Hãy đăng ký để bắt đầu hành trình.</p>
                    <button onClick={togglePanel} className="bg-transparent border-2 border-white rounded-full py-2 px-10 uppercase font-bold tracking-wider hover:bg-white hover:text-sky-500 transition-colors">
                      Đăng Ký
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel cho Đăng ký */}
            <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center text-center px-10">
              <AnimatePresence>
                {isSignUp && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-3xl font-bold">Chào mừng trở lại!</h1>
                    <p className="my-4 text-sm">Đã có tài khoản? Đăng nhập để tiếp tục khám phá.</p>
                    <button onClick={togglePanel} className="bg-transparent border-2 border-white rounded-full py-2 px-10 uppercase font-bold tracking-wider hover:bg-white hover:text-sky-500 transition-colors">
                      Đăng Nhập
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Hiển thị thông báo lỗi/thành công chung */}
        {(error || success) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-lg text-white text-sm shadow-lg ${error ? 'bg-red-500' : 'bg-green-500'}`}
            >
                {error || success}
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;