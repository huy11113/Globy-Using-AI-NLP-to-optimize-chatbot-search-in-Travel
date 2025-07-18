import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Sử dụng đường dẫn tương đối thay vì "@/..."
import Header from './components/home/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import TourList from './pages/TourList';
import Destinations from './pages/Destinations';


// Nếu bạn chưa tạo 2 trang dưới thì giữ nguyên comment
// import ContactPage from './pages/ContactPage';
// import Page from './pages/Page';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tour" element={<TourList />} />
            <Route path="/destinations" element={<Destinations />} />
          
            {/* Tạm thời comment nếu chưa có */}
            {/* <Route path="/contact" element={<ContactPage />} />
            <Route path="/page" element={<Page />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
