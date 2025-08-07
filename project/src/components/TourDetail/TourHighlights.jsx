import React from 'react';
import { Info, Calendar, Clock, PlaneTakeoff, Users, Map } from 'lucide-react';

const TourHighlights = ({ tour }) => {
    // Tạo một danh sách các điểm nhấn để dễ dàng quản lý và hiển thị
    const highlights = [
        {
            label: "Hành trình",
            value: `${tour.startLocation} - ${tour.endLocation}`,
            icon: <Map size={20} className="text-gray-500" />
        },
        {
            label: "Thời gian",
            value: tour.duration,
            icon: <Clock size={20} className="text-gray-500" />
        },
        {
            label: "Khởi hành",
            // Lấy 3 ngày khởi hành đầu tiên để hiển thị
            value: tour.departures?.slice(0, 3).map(d => new Date(d.date).toLocaleDateString('vi-VN')).join('; '),
            icon: <Calendar size={20} className="text-gray-500" />
        },
        {
            label: "Vận chuyển",
            value: "Xe du lịch & Máy bay", // Dữ liệu này có thể thêm vào tour sau
            icon: <PlaneTakeoff size={20} className="text-gray-500" />
        },
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            {/* Tiêu đề của mục */}
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <Info className="text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Điểm nhấn hành trình</h3>
            </div>
            
            {/* Lưới hiển thị các thông tin chi tiết */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {highlights.map((item) => (
                    <div key={item.label} className="flex items-start py-2">
                        <div className="flex-shrink-0 mr-4 mt-1">
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{item.label}</p>
                            <p className="text-gray-600">{item.value || 'Đang cập nhật'}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Phần mô tả chi tiết */}
            <div className="border-t pt-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {tour.description}
                </p>
            </div>
        </div>
    );
};

export default TourHighlights;