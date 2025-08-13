import React from 'react';
import { Outlet } from 'react-router-dom';
// ✅ KIỂM TRA ĐƯỜNG DẪN IMPORT NÀY
import Sidebar from '../components/Sidebar'; 
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;