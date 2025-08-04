import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const AdminHeader = () => {
    // Lấy thông tin admin từ localStorage
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));

    return (
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                />
            </div>

            {/* Admin Info and Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-gray-800">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

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