// src/components/common/Pagination.jsx

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // --- LOGIC MỚI ĐỂ TẠO CÁC NÚT BẤM ---
  const getPaginationItems = () => {
    const delta = 2; // Số lượng trang hiển thị bên cạnh trang hiện tại
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    // Loại bỏ các giá trị trùng lặp trong trường hợp totalPages nhỏ
    return [...new Set(range)]; 
  };

  const paginationItems = getPaginationItems();

  // --- PHẦN GIAO DIỆN ---
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center space-x-1 sm:space-x-2" aria-label="Phân trang">
      {/* Nút "Trang trước" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="sr-only">Trang trước</span>
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Các nút số trang và dấu "..." */}
      {paginationItems.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="flex items-center justify-center h-10 w-10 text-gray-500">
              <MoreHorizontal className="h-5 w-5" />
            </span>
          );
        }
        
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center h-10 min-w-[2.5rem] px-2 rounded-lg border text-sm font-semibold transition-colors ${
              currentPage === page
                ? 'border-sky-600 bg-sky-600 text-white shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút "Trang sau" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="sr-only">Trang sau</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;