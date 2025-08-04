import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Import các component layout và các trang
import Header from './components/home/Header';
import Footer from './components/common/Footer';
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
import AdminLoginPage from './admin/AdminLoginPage';
import AdminBookingsPage from './admin/AdminBookingsPage';

// Component bảo vệ các trang yêu cầu đăng nhập
const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" replace />;
};

// Component bảo vệ các trang của admin
const AdminRoute = ({ children }) => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const adminToken = localStorage.getItem('adminToken');
    return adminUser && adminUser.role === 'admin' && adminToken 
        ? children 
        : <Navigate to="/admin/login" replace />;
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        {/* === CÁC ROUTE CÔNG KHAI === */}
                        <Route path="/" element={<Home />} />
                        <Route path="/tours" element={<TourList />} />
                        <Route path="/tours/:id" element={<TourDetailPage />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        
                        {/* === CÁC ROUTE XÁC THỰC === */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />

                        {/* === CÁC ROUTE CẦN ĐĂNG NHẬP (PRIVATE) === */}
                        <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
                        
                        {/* ✅ SỬA LỖI Ở ĐÂY: Thêm /:bookingId để route có thể nhận ID */}
                        <Route path="/checkout/:bookingId" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                        
                        <Route path="/my-trips" element={<PrivateRoute><MyTripsPage /></PrivateRoute>} />
                        <Route path="/booking-request" element={<PrivateRoute><BookingRequestPage /></PrivateRoute>} />
                        
                        {/* === CÁC ROUTE CHO ADMIN === */}
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin/dashboard" element={<AdminRoute><AdminBookingsPage /></AdminRoute>} />

                        {/* === ROUTE DỰ PHÒNG === */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;