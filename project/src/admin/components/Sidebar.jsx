import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Map, Plane, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    // Tạm thời hardcode, sau này bạn có thể lấy từ AuthContext
    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        // Điều hướng về trang login, bạn có thể dùng useNavigate() nếu ở trong component có Router context
        window.location.href = '/admin/login'; 
    };
    
    const navLinks = [
        { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Map size={20} />, text: 'Quản lý Bookings', path: '/admin/bookings' },
        { icon: <Plane size={20} />, text: 'Quản lý Tours', path: '/admin/tours' },
        { icon: <Users size={20} />, text: 'Quản lý Users', path: '/admin/users' },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
            {/* Logo Section */}
            <div className="h-20 flex items-center justify-center px-4 border-b border-gray-700">
                <Link to="/" className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500 rounded-lg">
                        <Plane className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">Globy Admin</span>
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                                isActive ? 'bg-sky-500 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        {link.icon}
                        <span className="font-medium">{link.text}</span>
                    </NavLink>
                ))}
            </nav>
            
            {/* Footer Section */}
            <div className="px-4 py-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;