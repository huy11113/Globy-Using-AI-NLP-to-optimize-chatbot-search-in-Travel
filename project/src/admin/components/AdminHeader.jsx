
import { Search, Bell, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUnreadAdminNotifications, markNotificationAsRead } from '@/api/notification';

const AdminHeader = () => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const navigate = useNavigate();
    
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        const result = await getUnreadAdminNotifications();
        if (result.success) {
            setNotifications(result.data);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const intervalId = setInterval(fetchNotifications, 10000); // Lấy thông báo mới mỗi 10 giây
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = async (notification) => {
        await markNotificationAsRead(notification.id);
        setIsDropdownOpen(false);
        navigate('/admin/bookings');
        fetchNotifications(); // Cập nhật lại danh sách ngay lập tức
    };
    
    const unreadCount = notifications.length;

    return (
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsDropdownOpen(prev => !prev)} className="relative text-gray-500 hover:text-gray-800">
                        <Bell size={24} />
                        {unreadCount > 0 && (
                             <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl border z-50">
                            <div className="p-3 font-semibold border-b">Thông báo</div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map(notif => (
                                        <div 
                                            key={notif.id}
                                            onClick={() => handleNotificationClick(notif)}
                                            className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                                        >
                                            <p className="text-sm text-gray-800">{notif.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(notif.createdAt).toLocaleString('vi-VN')}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-4 text-sm text-gray-500 text-center">Không có thông báo mới.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                     <img 
                        src={adminUser?.avatar || `https://ui-avatars.com/api/?name=${adminUser?.name}&background=random`} 
                        alt="Admin Avatar" 
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold text-gray-800 text-sm">{adminUser?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-500">{adminUser?.role}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;