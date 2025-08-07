import React from 'react';
import { FileText } from 'lucide-react';

const TourNotes = () => {
    // Dữ liệu này có thể được lấy từ API trong tương lai
    const childFares = [
        "Dưới 2 tuổi: 30% giá tour (ngủ ghép chung giường với người lớn)",
        "Từ 2 - dưới 11 tuổi: 90% giá tour ( 1 Trẻ em ngủ ghép chung giường với 2 người lớn)",
        "Từ 11 tuổi trở lên: tính bằng giá tour người lớn",
        "Trường hợp 2 trẻ em đi chung với 2 người lớn, quý khách vui lòng đóng tiền 1 trẻ em giá người lớn để lấy thêm 1 giường"
    ];

    const notes = [
        "Khi đăng ký tour du lịch, Quý khách vui lòng đọc kỹ chương trình, giá tour, các khoản bao gồm cũng như không bao gồm, các điều kiện hủy tour trong chương trình.",
        "Quý khách vui lòng đem theo Passport (bản chính), đặt cọc trước 70% giá tour  khi đăng ký tour và hoàn tất thanh toán trước 2 tuần trước khi tour khởi hành",
        "Trường hợp Quý khách thanh toán bằng thẻ cà ngân hàng hoặc thanh toán qua cổng vnpay/onepay sẽ phụ thu thêm phí dịch vụ là 3%.",
        "Do tính chất là đoàn ghép khách lẻ, công ty sẽ có trách nhiệm thu nhận khách cho đủ đoàn (10 khách người lớn trở lên) thì đoàn sẽ khởi hành đúng lịch trình."
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <FileText className="text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Ghi chú (Xem Thêm)</h3>
            </div>
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">GIÁ VÉ TRẺ EM</h4>
                    <ul className="space-y-2 list-disc pl-5">
                        {childFares.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-3">LƯU Ý</h4>
                    <ul className="space-y-2 list-disc pl-5">
                        {notes.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TourNotes;