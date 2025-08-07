import React from 'react';
import { FileText, ChevronDown, Baby, AlertTriangle } from 'lucide-react';

const TourNotes = () => {
    // Dữ liệu chi tiết và đầy đủ hơn
    const childFares = {
        title: "Chính sách giá vé cho trẻ em",
        icon: <Baby size={20} className="text-blue-600" />,
        color: "blue",
        content: [
            "Trẻ em dưới 2 tuổi: Phụ thu 30% giá tour. Gia đình tự lo ăn uống và vé tham quan (nếu có). Bé sẽ ngủ ghép chung giường với bố mẹ.",
            "Trẻ em từ 2 đến dưới 11 tuổi: Tính 90% giá tour. Bé sẽ có suất ăn riêng, ghế ngồi riêng trên xe và ngủ ghép chung giường với bố mẹ.",
            "Trường hợp 2 trẻ em đi cùng 2 người lớn: Quý khách vui lòng thanh toán thêm chi phí cho 1 suất người lớn để lấy thêm 1 giường.",
            "Trẻ em từ 11 tuổi trở lên: Tính bằng giá vé người lớn."
        ]
    };

    const generalNotes = {
        title: "Điều khoản và Lưu ý quan trọng",
        icon: <AlertTriangle size={20} className="text-yellow-600" />,
        color: "yellow",
        content: [
            "Quý khách vui lòng đọc kỹ chương trình, giá tour, các khoản bao gồm và không bao gồm, cũng như các điều kiện hủy tour trước khi đăng ký.",
            "Hộ chiếu (Passport) của Quý khách phải còn hạn trên 6 tháng tính đến ngày về.",
            "Quý khách vui lòng đặt cọc 70% giá trị tour ngay khi đăng ký và thanh toán đủ 100% trước ngày khởi hành 14 ngày.",
            "Do tính chất là đoàn ghép khách lẻ, công ty sẽ có trách nhiệm thu nhận khách cho đủ đoàn (tối thiểu 10 khách người lớn) thì đoàn sẽ khởi hành đúng lịch trình. Nếu số lượng đoàn dưới 10 khách, công ty sẽ thông báo cho khách trước ngày khởi hành 5 ngày và thoả thuận lại ngày khởi hành mới, hoặc hoàn trả lại toàn bộ số tiền đã đặt cọc.",
            "Thứ tự các điểm tham quan trong chương trình có thể thay đổi tùy thuộc vào điều kiện thời tiết và tình hình giao thông thực tế, tuy nhiên vẫn đảm bảo đầy đủ các điểm tham quan như đã trình bày.",
            "Phụ thu phí dịch vụ 3% trên tổng giá trị giao dịch khi Quý khách thanh toán bằng thẻ tín dụng hoặc qua các cổng thanh toán điện tử."
        ]
    };
    
    const renderSection = (data) => (
        <details className="group" open>
            <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-800 list-none p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg border">
                <div className="flex items-center gap-3">
                    {data.icon}
                    <span>{data.title}</span>
                </div>
                <ChevronDown className="transform transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className={`p-5 border border-t-0 rounded-b-lg bg-white border-${data.color}-200`}>
                 <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    {data.content.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </details>
    );

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <FileText className="text-gray-500" />
                <h3 className="text-2xl font-bold text-gray-800">Các thông tin quan trọng khác</h3>
            </div>
            
            <div className="space-y-6">
                {renderSection(childFares)}
                {renderSection(generalNotes)}
            </div>
        </div>
    );
};

export default TourNotes;