import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Shield, Trash2, Camera, LogOut, Mail, Phone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProfile, deleteUser } from '../api/user';
import { submitNewPassword } from '../api/auth';

// --- COMPONENT CON CHO CÁC MỤC MENU ---
const NavItem = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
            isActive
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
        {React.cloneElement(icon, { size: 20 })}
        <span className="font-semibold">{label}</span>
    </button>
);

// --- COMPONENT CON CHO CÁC FORM (giữ nguyên cho các trường khác) ---
const InfoField = ({ id, label, type = 'text', value, onChange, disabled = false, icon }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {icon}
            </div>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-md transition-colors ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500'}`}
            />
        </div>
    </div>
);


// --- COMPONENT CHÍNH ---
const MyAccountPage = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [profile, setProfile] = useState({ 
        name: user?.name || '', 
        phoneNumber: user?.phoneNumber || '' 
    });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });

    // ✅ HÀM MỚI: Tự động định dạng số điện thoại
    const formatPhoneNumber = (value) => {
        if (!value) return value;
        // 1. Chỉ giữ lại các chữ số
        const phoneNumber = value.replace(/[^\d]/g, '');
        // 2. Giới hạn 10 chữ số
        const phoneNumberTrimmed = phoneNumber.slice(0, 10);
        const phoneNumberLength = phoneNumberTrimmed.length;

        // 3. Thêm khoảng trắng
        if (phoneNumberLength < 4) return phoneNumberTrimmed;
        if (phoneNumberLength < 7) {
            return `${phoneNumberTrimmed.slice(0, 3)} ${phoneNumberTrimmed.slice(3)}`;
        }
        return `${phoneNumberTrimmed.slice(0, 3)} ${phoneNumberTrimmed.slice(3, 6)} ${phoneNumberTrimmed.slice(6, 10)}`;
    };
    
    // ✅ HÀM MỚI: Xử lý khi người dùng nhập số điện thoại
    const handlePhoneChange = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setProfile(prev => ({ ...prev, phoneNumber: formattedPhoneNumber }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');
        
        // Loại bỏ khoảng trắng trước khi gửi đi
        const phoneNumberToSubmit = profile.phoneNumber.replace(/\s/g, '');
        
        const result = await updateProfile(user._id, { name: profile.name, phoneNumber: phoneNumberToSubmit });
        
        if (result.success) {
            setMessage('Cập nhật thông tin thành công!');
            login(result.data); 
        } else {
            setError(result.message || 'Đã có lỗi xảy ra.');
        }
        setIsLoading(false);
    };

    const handlePasswordUpdate = async (e) => {
        // ... (logic giữ nguyên)
        e.preventDefault();
        setMessage('');
        setError('');

        if (password.new !== password.confirm) {
            setError('Mật khẩu mới không khớp!');
            return;
        }
        if (password.new.length < 6) {
            setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        setIsLoading(true);
        setError("Chức năng này cần backend hỗ trợ API đổi mật khẩu bằng mật khẩu cũ.");
        setIsLoading(false);
    };
    
    const handleDeleteAccount = async () => {
        // ... (logic giữ nguyên)
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
            setIsLoading(true);
            const result = await deleteUser(user._id);
            if (result.success) {
                alert('Tài khoản đã được xóa thành công.');
                logout();
            } else {
                alert(`Lỗi: ${result.message}`);
            }
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        const motionProps = {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: { duration: 0.3 }
        };

        return (
            <motion.div {...motionProps} key={activeTab}>
                {message && <div className="p-3 mb-4 bg-green-100 text-green-700 rounded-md">{message}</div>}
                {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Thông tin cá nhân</h2>
                        <InfoField id="name" label="Họ và tên" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} icon={<User className="text-gray-400" size={18}/>}/>
                        <InfoField id="email" label="Email" value={user.email || 'Chưa cập nhật'} disabled icon={<Mail className="text-gray-400" size={18}/>} />
                        
                        {/* --- Ô SỐ ĐIỆN THOẠI ĐÃ ĐƯỢC CẢI TIẾN --- */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Phone className="text-gray-400" size={18}/>
                                </div>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder="090 123 4567"
                                    maxLength="12"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                />
                            </div>
                        </div>
                        {/* --- KẾT THÚC CẢI TIẾN --- */}

                        <div className="pt-4 text-right">
                            <button type="submit" className="btn primary__btn" disabled={isLoading}>
                                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    </form>
                )}

                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Đổi mật khẩu</h2>
                        <InfoField id="current" label="Mật khẩu hiện tại" type="password" value={password.current} onChange={(e) => setPassword({...password, current: e.target.value})} icon={<Lock className="text-gray-400" size={18}/>} />
                        <InfoField id="new" label="Mật khẩu mới" type="password" value={password.new} onChange={(e) => setPassword({...password, new: e.target.value})} icon={<Lock className="text-gray-400" size={18}/>}/>
                        <InfoField id="confirm" label="Xác nhận mật khẩu mới" type="password" value={password.confirm} onChange={(e) => setPassword({...password, confirm: e.target.value})} icon={<Lock className="text-gray-400" size={18}/>}/>
                        <div className="pt-4 text-right">
                            <button type="submit" className="btn primary__btn" disabled={isLoading}>
                                {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                            </button>
                        </div>
                    </form>
                )}

                {activeTab === 'danger' && (
                    <div>
                        <h2 className="text-2xl font-bold text-red-600 border-b pb-4">Vùng nguy hiểm</h2>
                        <div className="mt-6 p-6 border border-red-300 bg-red-50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-red-800">Xóa tài khoản của bạn</h3>
                                <p className="text-sm text-red-700 mt-1">Hành động này không thể hoàn tác. Mọi dữ liệu của bạn sẽ bị xóa vĩnh viễn.</p>
                            </div>
                            <button onClick={handleDeleteAccount} disabled={isLoading} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 flex-shrink-0 disabled:bg-red-400">
                                <Trash2 size={16} />
                                {isLoading ? 'Đang xóa...' : 'Xóa tài khoản'}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
    }
    
    return (
        <main className="bg-slate-50">
            <section className="relative bg-cover bg-center py-24" style={{ backgroundImage: "url('https://i.ytimg.com/vi/kAupcGjWFmo/maxresdefault.jpg')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl font-bold">Tài khoản của tôi</h1>
                    <p className="mt-2 text-lg text-gray-200">Quản lý thông tin cá nhân và bảo mật của bạn.</p>
                </div>
            </section>
            
            <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 p-4 md:p-6 lg:p-8 grid lg:grid-cols-12 gap-8">
                    
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border">
                             <div className="relative group mb-4">
                                <img
                                    className="h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-md"
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=128`}
                                    alt="User avatar"
                                />
                                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 truncate">{user.name}</h2>
                            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                        </div>
                        <nav className="mt-6 space-y-2">
                            <NavItem icon={<User />} label="Thông tin cá nhân" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                            <NavItem icon={<Shield />} label="Đổi mật khẩu" isActive={activeTab === 'password'} onClick={() => setActiveTab('password')} />
                            <NavItem icon={<Trash2 />} label="Vùng nguy hiểm" isActive={activeTab === 'danger'} onClick={() => setActiveTab('danger')} />
                            <div className="!mt-6 border-t pt-4">
                               <NavItem icon={<LogOut />} label="Đăng xuất" isActive={false} onClick={logout} />
                            </div>
                        </nav>
                    </div>

                    <div className="lg:col-span-8 xl:col-span-9 p-4 md:p-8">
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MyAccountPage;