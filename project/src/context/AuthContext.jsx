import React, { createContext, useState, useEffect } from 'react';
import { getWishlist, toggleWishlist as apiToggleWishlist } from '../api/wishlist';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchWishlist(parsedUser._id);
    }
  }, []);

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
    fetchWishlist(userData._id);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setWishlist([]);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  const toggleTourInWishlist = async (tourId) => {
    if (!user) {
      alert("Vui lòng đăng nhập để sử dụng chức năng này.");
      return;
    }
    const result = await apiToggleWishlist(user._id, tourId);
    if (result.success) {
      setWishlist(result.data);
    }
  };

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