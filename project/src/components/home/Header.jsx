import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, User, Search, Plane } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tours', path: '/tours' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Blog', path: '/blog' },
    { name: 'Page', path: '/page' },
    { name: 'Contact', path: '/contact' },
  ];

  const destinationItems = {
    Europe: ['Germany Tours', 'Greece Tours', 'Holland Tours'],
    Asia: ['Hungary Tours'],
    'North America': [],
    'South America': [],
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100'
          : 'bg-transparent border-b border-white/20'
      }`}
      style={{ backgroundImage: 'ur[](https://example.com/clouds.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled ? 'bg-sky-500 text-white shadow-lg' : 'bg-white/20 text-white'
              }`}
            >
              <Plane className="h-6 w-6" />
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Globy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-all duration-300 hover:text-sky-500 relative group ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    } ${item.name === 'Destination' ? 'cursor-pointer' : ''} ${
                      isActive ? 'underline' : ''
                    }`
                  }
                  onMouseEnter={() => item.name === 'Destination' && setShowDestinationMenu(true)}
                  onMouseLeave={() => item.name === 'Destination' && setShowDestinationMenu(false)}
                >
                  {item.name}
                  {item.name === 'Destination' && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                  )}
                </NavLink>
                {item.name === 'Destination' && showDestinationMenu && (
                  <div
                    className="absolute left-0 mt-2 w-96 bg-white rounded-md shadow-lg py-2 border border-gray-200 flex"
                    onMouseEnter={() => setShowDestinationMenu(true)}
                    onMouseLeave={() => setShowDestinationMenu(false)}
                  >
                    <div className="w-1/3 border-r border-gray-100">
                      <div className="px-4 py-2 text-orange-500 font-semibold">All Destinations</div>
                      {Object.keys(destinationItems).map((category) => (
                        <div
                          key={category}
                          className={`px-4 py-2 text-gray-700 font-medium cursor-pointer ${
                            selectedCategory === category ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                    <div className="w-2/3 p-4">
                      {selectedCategory && (
                        <div>
                          {destinationItems[selectedCategory].length > 0 ? (
                            <div className="grid grid-cols-3 gap-4">
                              {destinationItems[selectedCategory].map((subItem) => (
                                <NavLink
                                  key={subItem}
                                  to={`/destination/${subItem.replace(' ', '-').toLowerCase()}`}
                                  className="text-sm text-gray-600 hover:text-sky-500"
                                >
                                  {subItem}
                                </NavLink>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No tours available</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Search
              className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-sky-500 cursor-pointer`}
              onClick={() => setIsSearchOpen(true)}
            />
            <User
              className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              } hover:text-sky-500 cursor-pointer`}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-2xl shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-gray-700 hover:text-sky-500 font-medium transition-colors ${
                      isActive ? 'underline' : ''
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 flex justify-end space-x-6 pr-4">
                <Search
                  className="h-6 w-6 text-gray-700 hover:text-sky-500 cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                />
                <User className="h-6 w-6 text-gray-700 hover:text-sky-500 cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-2 w-full max-w-md flex items-center border border-gray-300">
              <input
                type="text"
                placeholder="Search ..."
                className="w-full px-4 py-2 border-0 focus:outline-none"
              />
              <Search className="h-6 w-6 text-gray-500 ml-2 cursor-pointer" />
              <button onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;