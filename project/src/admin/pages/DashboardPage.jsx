import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import StatCard from '../components/StatCard';
import { DollarSign, Users, ShoppingBag, UserPlus, FileText, ArrowRight, TrendingUp } from 'lucide-react';
import { getAllBookings } from '@/api/admin';
import { getAllUsers } from '@/api/user';

// --- COMPONENT CON ---

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

// --- BIỂU ĐỒ DOANH THU ---
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

// --- BIỂU ĐỒ TRẠNG THÁI BOOKING ---
const BookingStatusChart = ({ data }) => {
    const COLORS = {
        confirmed: '#10b981', // green-500
        approved: '#3b82f6', // blue-500
        pending_approval: '#f59e0b', // amber-500
        rejected: '#ef4444', // red-500
    };
    return (
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};


// --- COMPONENT CHÍNH ---
const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState({ revenue: [], bookingStatus: [] });
    const [recentBookings, setRecentBookings] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // ... (Logic fetchData giữ nguyên như trước, chỉ thêm phần xử lý cho biểu đồ)
            try {
                setLoading(true);
                const [bookingsResult, usersResult] = await Promise.all([ getAllBookings(), getAllUsers() ]);
                if (!bookingsResult.success || !usersResult.success) throw new Error('Không thể tải dữ liệu dashboard.');

                const bookings = bookingsResult.data;
                const users = usersResult.data;

                // --- Xử lý dữ liệu cho biểu đồ ---
                // 1. Biểu đồ doanh thu 6 tháng gần nhất
                const revenueByMonth = Array(6).fill(0).map((_, i) => {
                    const d = new Date();
                    d.setMonth(d.getMonth() - i);
                    return { name: `T${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`, revenue: 0 };
                }).reverse();
                
                bookings.forEach(b => {
                    if (b.status === 'confirmed' && b.createdAt) {
                        const bookingDate = new Date(b.createdAt);
                        const monthKey = `T${bookingDate.getMonth() + 1}/${bookingDate.getFullYear().toString().slice(-2)}`;
                        const monthData = revenueByMonth.find(m => m.name === monthKey);
                        if (monthData) {
                            monthData.revenue += (b.totalPrice || 0) * 25450; // Giả định tỷ giá
                        }
                    }
                });

                // 2. Biểu đồ trạng thái booking
                const statusCounts = bookings.reduce((acc, b) => {
                    acc[b.status] = (acc[b.status] || 0) + 1;
                    return acc;
                }, {});

                const statusData = Object.keys(statusCounts).map(key => ({
                    name: {
                        confirmed: 'Hoàn tất',
                        approved: 'Đã duyệt',
                        pending_approval: 'Chờ duyệt',
                        rejected: 'Đã từ chối'
                    }[key] || key,
                    value: statusCounts[key],
                    status: key,
                }));
                
                setChartData({ revenue: revenueByMonth, bookingStatus: statusData });
                
                // --- Xử lý các thống kê khác (giữ nguyên) ---
                const now = new Date();
                const oneMonthAgo = new Date(new Date().setMonth(now.getMonth() - 1));
                const currentMonthBookings = bookings.filter(b => new Date(b.createdAt) >= oneMonthAgo);
                const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
                
                setStats({
                    totalRevenue,
                    newBookings: { value: currentMonthBookings.length },
                    newUsers: { value: users.filter(u => new Date(u.createdAt) >= oneMonthAgo).length },
                    totalUsers: users.length
                });

                setRecentBookings(bookings.slice(0, 5));
                setRecentUsers(users.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));

            } catch (err) { setError(err.message); } finally { setLoading(false); }
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
                        <StatCard icon={<DollarSign size={28} />} title="Tổng doanh thu (VNĐ)" value={new Intl.NumberFormat('vi-VN').format(stats.totalRevenue * 25450)} />
                        <StatCard icon={<ShoppingBag size={28} />} title="Booking mới (tháng này)" value={stats.newBookings.value} />
                        <StatCard icon={<UserPlus size={28} />} title="Khách hàng mới (tháng này)" value={stats.newUsers.value} />
                        <StatCard icon={<Users size={28} />} title="Tổng số người dùng" value={stats.totalUsers} />
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
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Hoạt động gần đây */}
             </div>
        </div>
    );
};

export default DashboardPage;