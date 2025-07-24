import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Không hiển thị gì nếu chỉ có 1 trang
  if (totalPages <= 1) {
    return null;
  }

  // Tạo một mảng các số trang, ví dụ: [1, 2, 3, ...]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-8 flex items-center justify-center space-x-2" aria-label="Pagination">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Các nút số trang */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center h-10 w-10 rounded-lg border text-sm font-semibold transition-colors ${
            currentPage === page
              ? 'border-blue-600 bg-blue-600 text-white shadow-md' // Style cho trang hiện tại
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100' // Style cho các trang khác
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="sr-only">Next</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;