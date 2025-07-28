import React, { createContext, useState, useEffect } from 'react';
import { getWishlist, toggleWishlist as apiToggleWishlist } from '../api/wishlist';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]); // State để lưu danh sách yêu thích

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchWishlist(parsedUser._id); // Lấy danh sách yêu thích khi tải lại trang
    }
  }, []);

  // Hàm để lấy danh sách yêu thích từ server
  const fetchWishlist = async (userId) => {
    if (!userId) return;
    const result = await getWishlist(userId);
    if (result.success) {
      setWishlist(result.data);
    }
  };

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    fetchWishlist(userData._id); // Lấy danh sách yêu thích khi đăng nhập
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setWishlist([]);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  // Hàm để thêm/xóa tour khỏi danh sách yêu thích
  const toggleTourInWishlist = async (tourId) => {
    if (!user) {
      alert("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }
    const result = await apiToggleWishlist(user._id, tourId);
    if (result.success) {
      setWishlist(result.data); // Cập nhật lại danh sách từ server
    }
  };

  // Hàm để kiểm tra một tour có trong danh sách yêu thích không
  const isTourInWishlist = (tourId) => {
    return wishlist.some(tour => tour._id === tourId);
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, isDropdownOpen, toggleDropdown, closeDropdown,
      wishlist, toggleTourInWishlist, isTourInWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
};