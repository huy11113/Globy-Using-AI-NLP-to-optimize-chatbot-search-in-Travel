import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Menu, X, User, Search, Plane, LogIn, UserPlus, LogOut, Heart, UserCog, Briefcase } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import SearchOverlay from '../common/SearchOverlay'; // <-- 1. IMPORT COMPONENT MỚI

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // <-- 2. THÊM STATE CHO SEARCH

    const { user, logout, isDropdownOpen, toggleDropdown, closeDropdown } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Tours', path: '/tours' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const textClassNotScrolled = 'text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]';
    const textClassScrolled = 'text-gray-800';
    
    return (
        <> {/* <-- BỌC BẰNG FRAGMENT */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-sky-500 text-white shadow-lg' : 'bg-white/20 text-white'}`}>
                                <Plane className="h-6 w-6" />
                            </div>
                            <span className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : textClassNotScrolled}`}>
                                Globy
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.name} 
                                    to={item.path} 
                                    className={({ isActive }) => 
                                        `font-medium transition-all duration-300 hover:text-sky-500 relative group ${isScrolled ? textClassScrolled : textClassNotScrolled} ${isActive ? 'text-sky-500 is-active' : ''}`
                                    }
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full group-[.is-active]:w-full"></span>
                                </NavLink>
                            ))}
                        </nav>
                        
                        {/* User Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* 3. CẬP NHẬT NÚT SEARCH ĐỂ MỞ OVERLAY */}
                            <button onClick={() => setIsSearchOpen(true)}>
                                <Search className={`h-6 w-6 cursor-pointer transition-colors duration-300 hover:text-sky-500 ${isScrolled ? textClassScrolled : textClassNotScrolled}`} />
                            </button>
                            
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={toggleDropdown} className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                    {user ? (
                                        <img 
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                                            alt={user.name} 
                                            className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-sky-400 transition-all" 
                                        />
                                    ) : (
                                        <User className={`h-6 w-6 cursor-pointer transition-colors duration-300 hover:text-sky-500 ${isScrolled ? textClassScrolled : textClassNotScrolled}`} />
                                    )}
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-md shadow-xl py-2 animate-fade-in-down">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-3 border-b">
                                                    <p className="font-semibold text-sm truncate">{user.name || "User"}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email || user.phoneNumber}</p>
                                                </div>
                                                <NavLink to="/profile" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <UserCog size={16} className="text-gray-500" />
                                                    <span>Tài khoản của tôi</span>
                                                </NavLink>
                                                <NavLink to="/my-trips" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Briefcase size={16} className="text-gray-500" />
                                                    <span>Chuyến đi của tôi</span>
                                                </NavLink>
                                                <NavLink to="/wishlist" onClick={handleLinkClick} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    <Heart size={16} className="text-gray-500" />
                                                    <span>Danh sách yêu thích</span>
                                                </NavLink>
                                                <div className="border-t my-1"></div>
                                                <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                                    <LogOut size={16} />
                                                    <span>Đăng xuất</span>
                                                </button>
                                            </>
                                        ) : (
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
                        <button className={`md:hidden p-2 rounded-lg ${isScrolled ? textClassScrolled : textClassNotScrolled}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <NavLink key={item.name} to={item.path} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-50'}`} onClick={handleLinkClick}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            
            {/* 4. RENDER SEARCH OVERLAY */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;