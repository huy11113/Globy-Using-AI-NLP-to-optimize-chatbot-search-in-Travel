import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TourBreadcrumb = ({ tour }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
      <ChevronRight size={16} />
      <Link to="/tours" className="hover:text-blue-600">Tours</Link>
      <ChevronRight size={16} />
      <span className="font-semibold text-gray-700 truncate">{tour.title}</span>
    </nav>
  );
};

export default TourBreadcrumb;