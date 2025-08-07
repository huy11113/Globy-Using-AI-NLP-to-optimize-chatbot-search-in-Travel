// Nhập thư viện React
import React from 'react';

// Component Form liên hệ
const ContactForm = () => {
  return (
    // Lưới chia bố cục thành 2 cột trên màn hình lớn
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Cột thông tin liên hệ */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900 leading-tight">Gửi tin nhắn cho chúng tôi</h2>
        <p className="text-lg text-gray-600">
          Nếu bạn có bất kỳ câu hỏi nào về các tour du lịch, điểm đến hoặc cần hỗ trợ đặc biệt, đừng ngần ngại liên hệ. Đội ngũ của chúng tôi sẽ trả lời bạn sớm nhất có thể.
        </p>
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800">Giờ làm việc</h4>
          <p className="text-gray-600">Thứ Hai - Thứ Sáu: 8:00 - 18:00</p>
          <p className="text-gray-600">Thứ Bảy: 9:00 - 13:00</p>
        </div>
      </div>
      
      {/* Cột chứa form */}
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg border border-gray-200">
        <form className="space-y-6">
          {/* Lưới cho ô Tên và Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
              <input type="text" id="name" name="name" placeholder="Tên của bạn" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Địa chỉ Email</label>
              <input type="email" id="email" name="email" placeholder="you@example.com" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          {/* Ô Chủ đề */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Chủ đề</label>
            <input type="text" id="subject" name="subject" placeholder="Chúng tôi có thể giúp gì cho bạn?" className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          {/* Ô Tin nhắn */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Nội dung tin nhắn</label>
            <textarea id="message" name="message" rows="5" placeholder="Nhập tin nhắn của bạn ở đây..." className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          {/* Nút Gửi */}
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Gửi tin nhắn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Xuất component để sử dụng ở nơi khác
export default ContactForm;