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
            <Route path="/contact" element={<ContactPage />} /> {/* ✅ Thêm route mới */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;