// Nhập thư viện React
import React from 'react';
import { Link } from 'react-router-dom';

// Component Header cho trang liên hệ
const ContactHeader = () => {
  return (
    // Section chính, dùng làm banner
    <section className="relative h-80 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Lớp chứa ảnh nền và lớp phủ tối */}
      <div className="absolute inset-0 z-0">
        {/* Ảnh nền */}
        <img
          src="https://nld.mediacdn.vn/2017/photo-5-1502239793510.jpg"
          alt="Ảnh nền trang liên hệ"
          className="w-full h-full object-cover"
        />
        {/* Lớp phủ màu đen mờ để làm nổi bật chữ */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Lớp chứa nội dung văn bản, nằm phía trên ảnh nền */}
      <div className="relative z-10 p-6">
        {/* Tiêu đề chính */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          Liên Hệ Với Chúng Tôi
        </h1>
        {/* Đoạn mô tả */}
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Chúng tôi ở đây để giúp bạn. Hãy liên hệ nếu có bất kỳ câu hỏi nào hoặc để bắt đầu lên kế hoạch cho chuyến phiêu lưu tiếp theo của bạn.
        </p>

        {/* Breadcrumbs (Thanh điều hướng phân cấp) */}
        <nav className="mt-8 flex justify-center items-center gap-2 text-sm">
          <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
            Trang chủ
          </Link>
          <span className="opacity-50">&gt;</span>
          <span className="font-semibold">Liên hệ</span>
        </nav>
      </div>
    </section>
  );
};

// Xuất component để sử dụng
export default ContactHeader;
