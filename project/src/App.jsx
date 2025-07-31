import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import ContactPage from './pages/ContactPage'; // ✅ Import trang mới
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
// 1. IMPORT CÁC TRANG MỚI CHO ADMIN
import AdminLoginPage from './admin/AdminLoginPage'; // Trang đăng nhập admin

// Tạo một component tạm thời cho trang Dashboard
const AdminDashboard = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-center">Chào mừng đến trang Quản trị!</h1>
    </div>
);
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<TourList />} />
            <Route path="/tours/:id" element={<TourDetailPage />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactPage />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} /> 
           <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetailPage />} /> 
        {/* 2. THÊM CÁC ROUTE MỚI CHO ADMIN */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;