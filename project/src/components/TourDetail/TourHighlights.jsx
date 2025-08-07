import React from 'react';
import { Info } from 'lucide-react';

const TourHighlights = ({ tour }) => {
    const highlights = {
        "Hành trình": tour.title,
        "Lịch trình": tour.duration,
        "Khởi hành": tour.departures?.map(d => new Date(d.date).toLocaleDateString('vi-VN')).join('; '),
        "Vận chuyển": "Xe du lịch đời mới & Máy bay khứ hồi" // Dữ liệu mẫu
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <Info className="text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Điểm nhấn hành trình</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {Object.entries(highlights).map(([key, value]) => (
                    <div key={key} className="flex">
                        <span className="font-semibold w-28 flex-shrink-0">{key}</span>
                        <span className="text-gray-700">{value}</span>
                    </div>
                ))}
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tour.description}
            </p>
        </div>
    );
};

export default TourHighlights;