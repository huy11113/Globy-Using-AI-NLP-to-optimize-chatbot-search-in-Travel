import React from 'react';
import { 
  Plane, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowUp,
  Send
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' }
  ];

  const destinations = [
    'Santorini, Greece',
    'Bali, Indonesia', 
    'Tokyo, Japan',
    'Machu Picchu, Peru',
    'Iceland',
    'Safari Kenya'
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/10 to-blue-600/10"></div>
        <div className="absolute top-20 right-20 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/5 rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TravelLand
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in creating unforgettable travel experiences. 
              Discover the world with confidence and style.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                { icon: Youtube, href: '#', color: 'hover:bg-red-600' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`bg-gray-800 ${social.color} p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                >
                  <social.icon className="h-5 w-5 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Popular Destinations</h3>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-sky-500 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  <p>123 Travel Street</p>
                  <p>Adventure City, AC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-sky-500 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-sky-500 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-sky-400 group-hover:text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">info@traveland.com</span>
              </div>
            </div>

            {/* Enhanced Newsletter */}
            <div className="mt-8">
              <h4 className="text-md font-semibold mb-4 text-white">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest travel deals and destination guides</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-sky-400 focus:bg-gray-700 transition-all duration-300 text-white placeholder-gray-500"
                />
                <button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 px-4 py-3 rounded-r-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 TravelLand. All rights reserved. | 
              <a href="#" className="hover:text-sky-400 transition-colors ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-sky-400 transition-colors ml-1">Terms of Service</a>
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>We accept:</span>
              <div className="flex space-x-2">
                {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((payment, index) => (
                  <div key={index} className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-xs font-semibold transition-colors duration-300 cursor-pointer">
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute right-8 -top-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 group"
      >
        <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;