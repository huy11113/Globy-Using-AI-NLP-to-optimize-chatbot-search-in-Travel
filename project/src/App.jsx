import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ChatbotWidget from './components/common/ChatbotWidget'; 
import ScrollToTop from './components/common/ScrollToTop';
// --- Import Layouts ---
import Header from './components/home/Header';
import Footer from './components/common/Footer';
import AdminLayout from '@/admin/layouts/AdminLayout';

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
import AdminLoginPage from '@/admin//pages/AdminLoginPage';
import DashboardPage from '@/admin/pages/DashboardPage';
import AdminBookingsPage from '@/admin/pages/AdminBookingsPage';
import AdminToursPage from './admin/pages/AdminToursPage';
import AdminTourFormPage from './admin/pages/AdminTourFormPage';
import AdminUsersPage from './admin/pages/AdminUsersPage';
import AdminReviewsPage from './admin/pages/AdminReviewsPage';
import AdminDestinationsPage from './admin/pages/AdminDestinationsPage';
import AdminDestinationFormPage from './admin/pages/AdminDestinationFormPage';
import AdminBlogPage from './admin/pages/AdminBlogPage';
import AdminBlogFormPage from './admin/pages/AdminBlogFormPage';

// --- ✅ CẬP NHẬT ROUTE GUARDS ---
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Nếu đang trong quá trình kiểm tra, hiển thị màn hình chờ
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
            </div>
        );
    }
    
    // Sau khi kiểm tra xong, nếu có user thì cho vào, không thì về trang login
    return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const adminToken = localStorage.getItem('adminToken');
    return adminUser && adminUser.role === 'admin' && adminToken
        ? children
        : <Navigate to="/admin/login" replace />;
};

// --- Main App Component ---
const App = () => {
    return (
        <Router>
            <ScrollToTop /> 
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
                    <Route path="reviews" element={<AdminReviewsPage />} />
                    <Route path="destinations" element={<AdminDestinationsPage />} />
                    <Route path="destinations/new" element={<AdminDestinationFormPage />} />
                    <Route path="destinations/edit/:id" element={<AdminDestinationFormPage />} />
                    <Route path="blog" element={<AdminBlogPage />} />
                    <Route path="blog/new" element={<AdminBlogFormPage />} />
                    <Route path="blog/edit/:id" element={<AdminBlogFormPage />} />
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