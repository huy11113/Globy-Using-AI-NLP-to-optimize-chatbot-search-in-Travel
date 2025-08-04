import React from 'react';
import StatCard from '../components/StatCard';
import { DollarSign, Users, ShoppingBag, BarChart } from 'lucide-react';

const DashboardPage = () => {
    // Dữ liệu mẫu, sau này bạn sẽ lấy từ API
    const stats = [
        {
            icon: <DollarSign size={28} />,
            title: 'Tổng doanh thu',
            value: '$34,598',
            change: '12.5%',
            changeType: 'increase',
        },
        {
            icon: <ShoppingBag size={28} />,
            title: 'Booking mới',
            value: '1,204',
            change: '5.2%',
            changeType: 'increase',
        },
        {
            icon: <Users size={28} />,
            title: 'Khách hàng mới',
            value: '312',
            change: '2.1%',
            changeType: 'decrease',
        },
        {
            icon: <BarChart size={28} />,
            title: 'Tỉ lệ chuyển đổi',
            value: '15.8%',
            change: '0.8%',
            changeType: 'increase',
        },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            
            {/* Hàng chứa các thẻ thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Hàng chứa biểu đồ và các hoạt động gần đây */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Biểu đồ doanh thu (placeholder) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Tổng quan doanh thu</h2>
                    <div className="h-80 bg-gray-100 flex items-center justify-center rounded-lg">
                        <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
                    </div>
                </div>

                {/* Hoạt động gần đây (placeholder) */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <h2 className="text-lg font-semibold text-gray-700 mb-4">Booking gần đây</h2>
                     <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                             <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-800">Booking #{1204 - i}</p>
                                    <p className="text-xs text-gray-500">Tour Vịnh Hạ Long - $350</p>
                                </div>
                             </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;