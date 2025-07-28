import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// ✅ Thêm các icon mới: UserCog và Briefcase
import { Menu, X, User, Search, Plane, LogIn, UserPlus, LogOut, Heart, UserCog, Briefcase } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { user, logout, isDropdownOpen, toggleDropdown, closeDropdown } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLinkClick = () => {
    closeDropdown();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-sky-500 text-white shadow-lg' : 'bg-white/20 text-white'}`}>
              <Plane className="h-6 w-6" />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Globy
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={({ isActive }) => `font-medium transition-all duration-300 hover:text-sky-500 relative group ${isScrolled ? 'text-gray-700' : 'text-white'} ${isActive ? 'text-sky-500' : ''}`}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Search className={`h-6 w-6 cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="p-1 rounded-full">
                <User className={`h-6 w-6 cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-2 animate-fade-in-down">
                  {user ? (
                    // ✅ Menu khi đã đăng nhập (ĐÃ CẬP NHẬT)
                    <>
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm truncate">{user.name || "User"}</p>
                        <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                      </div>
                      
                      <NavLink to="/profile" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UserCog size={16} className="text-gray-500" />
                        <span>Tài khoản của tôi</span>
                      </NavLink>
                      
                      <NavLink to="/my-bookings" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Briefcase size={16} className="text-gray-500" />
                        <span>Chuyến đi của tôi</span>
                      </NavLink>
                      
                      <NavLink to="/wishlist" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Heart size={16} className="text-gray-500" />
                        <span>Danh sách yêu thích</span>
                      </NavLink>

                      <div className="border-t my-1 mx-2"></div>

                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </>
                  ) : (
                    // Menu khi chưa đăng nhập
                    <>
                      <NavLink to="/login" onClick={handleLinkClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogIn size={16} />
                        <span>Đăng nhập</span>
                      </NavLink>
                      <NavLink to="/register" onClick={handleLinkClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UserPlus size={16} />
                        <span>Đăng ký</span>
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;