import React, { useState } from 'react';
import { PhoneCall, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ConsultationForm = () => {
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!phone.trim()) return;

        setIsSubmitting(true);
        // Giả lập quá trình gửi đi
        setTimeout(() => {
            alert(`Cảm ơn bạn! Chúng tôi sẽ sớm liên hệ qua số điện thoại: ${phone}`);
            setPhone('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
             <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-sky-100">
                    <PhoneCall className="text-sky-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">Cần tư vấn thêm?</h4>
                    <p className="text-sm text-gray-500">Để lại SĐT, chúng tôi sẽ gọi lại ngay!</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Số điện thoại của bạn"
                    className="flex-grow w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                />
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-colors disabled:bg-gray-400"
                    aria-label="Gửi thông tin"
                >
                    <Send size={20} />
                </motion.button>
            </form>
        </div>
    );
};

export default ConsultationForm;