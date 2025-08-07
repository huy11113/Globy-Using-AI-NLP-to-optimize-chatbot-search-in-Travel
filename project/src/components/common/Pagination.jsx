// Nhập các thư viện cần thiết
import React from 'react'; // Thư viện React để xây dựng component
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icon mũi tên trái/phải từ thư viện Lucide

/**
 * Component Pagination: Hiển thị thanh điều hướng phân trang.
 * @param {object} props - Các thuộc tính của component.
 * @param {number} props.currentPage - Trang hiện tại đang được chọn.
 * @param {number} props.totalPages - Tổng số trang.
 * @param {function} props.onPageChange - Hàm sẽ được gọi khi người dùng chọn một trang mới.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // === Xử lý trường hợp đặc biệt ===
  // Nếu chỉ có 1 trang hoặc không có trang nào, không cần hiển thị phân trang.
  if (totalPages <= 1) {
    return null;
  }

  // === Chuẩn bị dữ liệu ===
  // Tạo một mảng chứa các số trang, ví dụ: [1, 2, 3, ..., totalPages]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // === Render Giao diện ===
  return (
    // Sử dụng thẻ <nav> cho mục đích ngữ nghĩa và accessibility (hỗ trợ tiếp cận)
    // aria-label giúp trình đọc màn hình hiểu được đây là thanh điều hướng "Phân trang"
    <nav className="mt-8 flex items-center justify-center space-x-2" aria-label="Phân trang">
      {/* Nút "Trang trước" (Previous) */}
      <button
        // Gọi hàm onPageChange với số trang trước đó khi click
        onClick={() => onPageChange(currentPage - 1)}
        // Vô hiệu hóa nút nếu đang ở trang đầu tiên (trang 1)
        disabled={currentPage === 1}
        // Các lớp CSS của Tailwind để tạo kiểu cho nút
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {/* Văn bản này chỉ dành cho trình đọc màn hình, không hiển thị trên giao diện */}
        <span className="sr-only">Trang trước</span>
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Vòng lặp để hiển thị các nút số trang */}
      {pageNumbers.map((page) => (
        <button
          // `key` là bắt buộc và phải là duy nhất cho mỗi phần tử trong một danh sách
          key={page}
          // Khi click, chuyển đến trang được chọn
          onClick={() => onPageChange(page)}
          // Áp dụng style có điều kiện:
          // - Nếu là trang hiện tại (currentPage === page), áp dụng style nổi bật.
          // - Nếu là các trang khác, áp dụng style mặc định.
          className={`flex items-center justify-center h-10 w-10 rounded-lg border text-sm font-semibold transition-colors ${
            currentPage === page
              ? 'border-blue-600 bg-blue-600 text-white shadow-md' // Style cho trang hiện tại
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100' // Style cho các trang khác
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút "Trang sau" (Next) */}
      <button
        // Gọi hàm onPageChange với số trang tiếp theo khi click
        onClick={() => onPageChange(currentPage + 1)}
        // Vô hiệu hóa nút nếu đang ở trang cuối cùng
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="sr-only">Trang sau</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};

// Xuất component để có thể sử dụng ở các file khác
export default Pagination;