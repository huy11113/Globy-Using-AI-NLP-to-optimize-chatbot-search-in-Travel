// Nhập các thư viện cần thiết
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react'; // Icons

// Mảng chứa dữ liệu cho các mục thông tin liên hệ
const infoItems = [
  {
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: "Văn Phòng",
    details: ["123 Đường Du Lịch, Thành Phố Phiêu Lưu", "Hà Nội, Việt Nam"]
  },
  {
    icon: <Mail className="w-8 h-8 text-blue-600" />,
    title: "Địa Chỉ Email",
    details: ["lienhe@globy.com", "hotro@globy.com"]
  },
  {
    icon: <Phone className="w-8 h-8 text-blue-600" />,
    title: "Số Điện Thoại",
    details: ["(+84) 123 456 789", "(+84) 987 654 321"]
  }
];

// Component hiển thị các thông tin liên hệ
const ContactInfo = () => {
  return (
    // Lưới chia các thẻ thông tin, 3 cột trên màn hình vừa và lớn
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Lặp qua mảng infoItems để tạo mỗi thẻ thông tin */}
      {infoItems.map((item, index) => (
        // Thẻ chứa thông tin
        <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-blue-500">
          {/* Vòng tròn chứa icon */}
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-blue-50 mb-6">
            {item.icon}
          </div>
          {/* Tiêu đề của thẻ */}
          <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
          {/* Chi tiết liên hệ */}
          <div className="mt-2 text-gray-600">
            {item.details.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
};

// Xuất component
export default ContactInfo;
