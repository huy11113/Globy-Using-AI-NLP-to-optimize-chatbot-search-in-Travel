// Nhập các thư viện và component cần thiết
import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Menu, X, User, Search, Plane, LogIn, UserPlus, LogOut, Heart, UserCog, Briefcase, Bell } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import SearchOverlay from '../common/SearchOverlay';
import { getUnreadUserNotifications, markUserNotificationAsRead } from '@/api/notification';

// Component Header chính của trang web
const Header = () => {
    // State quản lý trạng thái của menu (mở/đóng trên mobile), header (cuộn/chưa cuộn), và ô tìm kiếm
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Lấy thông tin người dùng và các hàm xử lý từ AuthContext
    const { user, logout, isDropdownOpen, toggleDropdown, closeDropdown } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref để xử lý click bên ngoài dropdown người dùng

    // --- LOGIC THÔNG BÁO NGƯỜI DÙNG ---
    const [notifications, setNotifications] = useState([]);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null); // Ref để xử lý click bên ngoài dropdown thông báo

    // Effect để lấy thông báo khi người dùng thay đổi
    useEffect(() => {
        if (!user) return; // Chỉ chạy khi người dùng đã đăng nhập
        const fetchUserNotifications = async () => {
            const result = await getUnreadUserNotifications(user._id);
            if (result.success) {
                setNotifications(result.data);
            }
        };

        fetchUserNotifications();
        const intervalId = setInterval(fetchUserNotifications, 10000); // Lấy thông báo mới mỗi 10 giây
        return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
    }, [user]);

    // Xử lý khi click vào một thông báo
    const handleNotifClick = async (notification) => {
        await markUserNotificationAsRead(notification.id); // Đánh dấu đã đọc
        setIsNotifOpen(false); // Đóng dropdown
        navigate('/my-trips'); // Chuyển đến trang chuyến đi của tôi
    };

    // --- KẾT THÚC LOGIC THÔNG BÁO ---

    // Effect để kiểm tra trạng thái cuộn trang
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect để đóng các dropdown khi click ra bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) closeDropdown();
            if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);
    
    // Hàm xử lý đăng xuất và đóng các menu khi chuyển trang
    const handleLogout = () => { logout(); navigate('/'); };
    const handleLinkClick = () => { closeDropdown(); setIsMenuOpen(false); };

    // Danh sách các mục điều hướng
    const navItems = [
        { name: 'Trang chủ', path: '/' },
        { name: 'Tours', path: '/tours' },
        { name: 'Điểm đến', path: '/destinations' },
        { name: 'Blog', path: '/blog' },
        { name: 'Liên hệ', path: '/contact' },
    ];

    // Các lớp CSS cho màu chữ tùy thuộc vào trạng thái cuộn
    const textClassNotScrolled = 'text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]';
    const textClassScrolled = 'text-gray-800';
    
    return (
        <>
            {/* Thẻ header chính */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-sky-500 text-white shadow-lg' : 'bg-white/20 text-white'}`}>
                                <Plane className="h-6 w-6" />
                            </div>
                            <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : textClassNotScrolled}`}>Globy</span>
                        </Link>

                        {/* Điều hướng cho màn hình lớn */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.name} 
                                    to={item.path} 
                                    className={({ isActive }) => 
                                        `font-medium transition-all duration-300 hover:text-sky-500 relative group ${isScrolled ? textClassScrolled : textClassNotScrolled} ${isActive ? 'text-sky-500 is-active' : ''}`
                                    }
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full group-[.is-active]:w-full"></span>
                                </NavLink>
                            ))}
                        </nav>
                        
                        {/* Các nút chức năng bên phải */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Nút tìm kiếm */}
                            <button onClick={() => setIsSearchOpen(true)}>
                                <Search className={`h-6 w-6 cursor-pointer transition-colors duration-300 hover:text-sky-500 ${isScrolled ? textClassScrolled : textClassNotScrolled}`} />
                            </button>

                            {/* Chuông thông báo (chỉ hiện khi đã đăng nhập) */}
                            {user && (
                                <div className="relative" ref={notifRef}>
                                    <button onClick={() => setIsNotifOpen(prev => !prev)} className={`relative transition-colors duration-300 hover:text-sky-500 p-2 ${isScrolled ? textClassScrolled : textClassNotScrolled}`}>
                                        <Bell size={24} />
                                        {notifications.length > 0 && (
                                            // -- ✅ ĐIỀU CHỈNH Ở ĐÂY --
                                            // Sử dụng grid để định vị chính xác và dễ dàng hơn
                                            <span className="absolute top-0 right-0 grid h-5 w-5 place-content-center rounded-full bg-red-500 text-white text-xs font-bold border-2 border-white">
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>
                                    {/* Dropdown thông báo */}
                                    {isNotifOpen && (
                                        <div className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl border z-50">
                                            <div className="p-3 font-semibold border-b text-gray-800">Thông báo</div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map(notif => (
                                                        <div key={notif.id} onClick={() => handleNotifClick(notif)} className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                                                            <p className="text-sm text-gray-800">{notif.message}</p>
                                                            <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString('vi-VN')}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="p-4 text-sm text-gray-500 text-center">Không có thông báo mới.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Dropdown người dùng */}
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                    {user ? (
                                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-sky-400 transition-all" />
                                    ) : (
                                        <User className={`h-6 w-6 cursor-pointer transition-colors duration-300 hover:text-sky-500 ${isScrolled ? textClassScrolled : textClassNotScrolled}`} />
                                    )}
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-md shadow-xl py-2 animate-fade-in-down">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-3 border-b">
                                                    <p className="font-semibold text-sm truncate text-gray-800">{user.name || "User"}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email || user.phoneNumber}</p>
                                                </div>
                                                <NavLink to="/profile" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <UserCog size={16} className="text-gray-500" />
                                                    <span>Tài khoản của tôi</span>
                                                </NavLink>
                                                <NavLink to="/my-trips" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Briefcase size={16} className="text-gray-500" />
                                                    <span>Chuyến đi của tôi</span>
                                                </NavLink>
                                                <NavLink to="/wishlist" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Heart size={16} className="text-gray-500" />
                                                    <span>Danh sách yêu thích</span>
                                                </NavLink>
                                                <div className="border-t my-1"></div>
                                                <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                    <LogOut size={16} />
                                                    <span>Đăng xuất</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to="/login" onClick={handleLinkClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <LogIn size={16} />
                                                    <span>Đăng nhập</span>
                                                </NavLink>
                                                <NavLink to="/register" onClick={handleLinkClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <UserPlus size={16} />
                                                    <span>Đăng ký</span>
                                                </NavLink>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nút menu cho mobile */}
                        <button className={`md:hidden p-2 rounded-lg ${isScrolled ? textClassScrolled : textClassNotScrolled}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Menu cho mobile */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <NavLink key={item.name} to={item.path} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-50'}`} onClick={handleLinkClick}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            
            {/* Lớp phủ tìm kiếm */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

// Xuất component
export default Header;