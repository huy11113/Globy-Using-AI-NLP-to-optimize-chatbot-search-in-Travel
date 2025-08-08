import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ChatbotWidget from './components/common/ChatbotWidget'; 
// --- Import Layouts ---
import Header from './components/home/Header';
import Footer from './components/common/Footer';
import AdminLayout from '@/admin/layouts/AdminLayout'; // Sửa đường dẫn

// --- Import Pages ---
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import TourList from './pages/TourList';
import Destinations from './pages/Destinations';
import TourDetailPage from './pages/TourDetailPage';
import ContactPage from './pages/ContactPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import MyTripsPage from './pages/MyTripsPage';
import BookingRequestPage from './pages/BookingRequestPage';
import MyAccountPage from './pages/MyAccountPage';

// Admin Pages
import AdminLoginPage from '@/admin//pages/AdminLoginPage'; // Sửa đường dẫn
import DashboardPage from '@/admin/pages/DashboardPage'; // Sửa đường dẫn
import AdminBookingsPage from '@/admin/pages/AdminBookingsPage'; // Sửa đường dẫn
import AdminToursPage from './admin/pages/AdminToursPage';
import AdminTourFormPage from './admin/pages/AdminTourFormPage';
import AdminUsersPage from './admin/pages/AdminUsersPage';
// --- Route Guards ---
const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const adminToken = localStorage.getItem('adminToken');
    return adminUser && adminUser.role === 'admin' && adminToken
        ? children
        : <Navigate to="/admin/login" replace />;
};

// --- Layout Wrapper ---
const LayoutDecider = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin/');
    const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

    if (isAdminRoute) {
        // Nếu là route admin, AdminRoute sẽ quyết định hiển thị AdminLayout hoặc trang Login
        return (
            <AdminRoute>
                <AdminLayout />
            </AdminRoute>
        );
    }

    if (isAuthRoute) {
        // Các trang xác thực không có layout
        return <Outlet />;
    }

    // Mặc định là layout chính cho người dùng
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// --- Main App Component ---
const App = () => {
    return (
        <Router>
            <Routes>
                {/* --- Routes cho các trang xác thực (không có layout) --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* --- Routes cho Admin (dùng AdminLayout) --- */}
                <Route 
                    path="/admin" 
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                    <Route path="tours" element={<AdminToursPage />} />
                    <Route path="tours/new" element={<AdminTourFormPage />} />
                    <Route path="tours/edit/:id" element={<AdminTourFormPage />} />
                     <Route path="users" element={<AdminUsersPage />} />


                </Route>

                {/* --- Routes cho người dùng (dùng MainLayout) --- */}
                <Route element={
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/tours" element={<TourList />} />
                    <Route path="/tours/:id" element={<TourDetailPage />} />
                    <Route path="/destinations" element={<Destinations />} />
                    <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><MyAccountPage /></PrivateRoute>} />
                    <Route path="/checkout/:bookingId" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                    <Route path="/my-trips" element={<PrivateRoute><MyTripsPage /></PrivateRoute>} />
                    <Route path="/booking-request" element={<PrivateRoute><BookingRequestPage /></PrivateRoute>} />
                </Route>
                
                {/* --- Route dự phòng --- */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ChatbotWidget />
        </Router>
    );
};

export default App;