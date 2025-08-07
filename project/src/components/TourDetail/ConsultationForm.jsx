import React from 'react';
import { PhoneCall } from 'lucide-react';

const ConsultationForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const phone = e.target.phone.value;
        alert(`Cảm ơn bạn! Chúng tôi sẽ sớm liên hệ qua số điện thoại: ${phone}`);
        e.target.reset();
    };

    return (
        <div className="bg-gray-100 p-6 rounded-xl border">
             <div className="flex items-center gap-3 mb-4">
                <PhoneCall className="text-pink-500" />
                <h4 className="font-bold text-gray-800">ĐỂ LẠI SỐ ĐIỆN THOẠI CHÚNG TÔI SẼ GỌI ĐIỆN TƯ VẤN</h4>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Nhập số điện thoại!"
                    className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition-colors"
                >
                    GỬI THÔNG TIN!
                </button>
            </form>
        </div>
    );
};

export default ConsultationForm;