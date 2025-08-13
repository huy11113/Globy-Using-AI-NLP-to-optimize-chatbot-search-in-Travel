import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import StatCard from '../components/StatCard';
import { DollarSign, Users, ShoppingBag, UserPlus, TrendingUp, PackageOpen } from 'lucide-react';
import { getDashboardStats } from '@/api/admin'; // ✅ SỬ DỤNG HÀM MỚI

// --- CÁC COMPONENT CON (SKELETON, CHARTS) GIỮ NGUYÊN KHÔNG ĐỔI ---
const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6 animate-pulse">
        <div className="p-4 bg-gray-200 rounded-lg w-16 h-16"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
    </div>
);

const ChartSkeleton = ({ title }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-80 bg-gray-100 flex items-center justify-center rounded-lg"></div>
    </div>
);

const RevenueChart = ({ data }) => (
    <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toLocaleString('vi-VN')}Tr`} />
                <Tooltip 
                    cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}
                    contentStyle={{ borderRadius: '0.75rem', borderColor: '#e5e7eb' }}
                    formatter={(value) => [`${value.toLocaleString('vi-VN')} VNĐ`, 'Doanh thu']}
                />
                <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const BookingStatusChart = ({ data }) => {
    const COLORS = { confirmed: '#10b981', approved: '#3b82f6', pending_approval: '#f59e0b', rejected: '#ef4444' };
    return (
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[entry.status]} /> ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- COMPONENT CHÍNH ĐÃ ĐƯỢC CẬP NHẬT ---
const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState({ revenue: [], bookingStatus: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getDashboardStats(); // ✅ CHỈ MỘT LẦN GỌI API
                if (!result.success) throw new Error(result.message || 'Không thể tải dữ liệu dashboard.');

                const data = result.data;

                // --- GÁN DỮ LIỆU THỐNG KÊ ---
                setStats({
                    totalRevenue: data.totalRevenue || 0,
                    newBookings: { value: data.newBookingsThisMonth || 0 },
                    newUsers: { value: data.newUsersThisMonth || 0 },
                    totalUsers: data.totalUsers || 0,
                    totalTours: data.totalTours || 0, // ✅ Thêm thống kê mới
                });

                // --- XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ ---
                // 1. Biểu đồ doanh thu
                const revenueChart = Object.entries(data.revenueByMonth || {})
                    .map(([key, value]) => ({ name: key, revenue: value }))
                    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

                // 2. Biểu đồ trạng thái booking
                const statusNameMapping = {
                    confirmed: 'Hoàn tất', approved: 'Đã duyệt',
                    pending_approval: 'Chờ duyệt', rejected: 'Đã từ chối'
                };
                const statusChart = Object.entries(data.bookingStatusCounts || {})
                    .map(([key, value]) => ({
                        name: statusNameMapping[key] || key,
                        value: value,
                        status: key,
                    }));

                setChartData({ revenue: revenueChart, bookingStatus: statusChart });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {loading ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />) : (
                    <>
                        <StatCard icon={<DollarSign size={28} />} title="Tổng doanh thu (VNĐ)" value={new Intl.NumberFormat('vi-VN').format(stats.totalRevenue)} />
                        <StatCard icon={<ShoppingBag size={28} />} title="Booking mới (tháng này)" value={stats.newBookings.value} />
                        <StatCard icon={<UserPlus size={28} />} title="Khách hàng mới (tháng này)" value={stats.newUsers.value} />
                        <StatCard icon={<PackageOpen size={28} />} title="Tổng số tours" value={stats.totalTours} /> 
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"><TrendingUp size={20} /> Doanh thu 6 tháng gần nhất</h2>
                    {loading ? <ChartSkeleton /> : <RevenueChart data={chartData.revenue} />}
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <h2 className="text-lg font-semibold text-gray-700 mb-4">Tỷ lệ Booking</h2>
                     {loading ? <ChartSkeleton /> : <BookingStatusChart data={chartData.bookingStatus} />}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;