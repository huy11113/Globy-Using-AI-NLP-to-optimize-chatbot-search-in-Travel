import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Minus, Plus, ArrowRight, Info } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const TourBookingInfo = ({ tour }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [selectedDate, setSelectedDate] = useState(tour.departures?.[0]?.date || '');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const guestCount = adults + children;
    
    // ✅ THAY ĐỔI: Giả định tour.price đã là VNĐ, không cần quy đổi
    const priceInVND = tour.price; 
    const totalCostInVND = priceInVND * guestCount;

    useEffect(() => {
        setSelectedDate(tour.departures?.[0]?.date || '');
    }, [tour]);

    const handleBookNow = () => {
        if (!user) {
            alert("Vui lòng đăng nhập để có thể đặt tour.");
            navigate('/login');
            return;
        }
        navigate('/booking-request', { 
            state: { 
                tour, 
                guestCount, 
                adults, 
                children, 
                selectedDate, 
                // ✅ THAY ĐỔI: Gửi đi tổng chi phí đã tính bằng VNĐ
                totalCost: totalCostInVND
            }
        });
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-xl shadow-xl border border-gray-200"
        >
            <div className="text-center mb-4">
                <span className="text-sm text-gray-500">Giá chỉ từ</span>
                <p className="text-3xl font-extrabold text-sky-600">
                    {priceInVND.toLocaleString('vi-VN')} VNĐ
                    <span className="text-base font-normal text-gray-500"> / người</span>
                </p>
            </div>

            <div className="space-y-4">
                {/* --- Ngày khởi hành --- */}
                <div className="relative">
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Ngày khởi hành</label>
                    <div className="relative">
                        <select 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-sky-500"
                        >
                            {tour.departures?.map((dep, index) => (
                                <option key={index} value={dep.date}>
                                    {new Date(dep.date).toLocaleDateString('vi-VN')} ({dep.seatsAvailable} chỗ)
                                </option>
                            ))}
                        </select>
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                
                {/* --- Số lượng khách --- */}
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Số lượng khách</label>
                    <div className="grid grid-cols-2 gap-4 p-2 border border-gray-300 rounded-lg">
                        <div className="text-center">
                            <span className="text-sm font-medium">Người lớn</span>
                            <div className="flex items-center justify-between mt-1">
                                <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Minus size={16}/></button>
                                <span className="font-bold text-lg">{adults}</span>
                                <button onClick={() => setAdults(adults + 1)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Plus size={16}/></button>
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-medium">Trẻ em</span>
                            <div className="flex items-center justify-between mt-1">
                                <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Minus size={16}/></button>
                                <span className="font-bold text-lg">{children}</span>
                                <button onClick={() => setChildren(children + 1)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"><Plus size={16}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Tóm tắt giá --- */}
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                 <div className="flex justify-between items-center text-gray-600">
                      <span>{priceInVND.toLocaleString('vi-VN')} VNĐ x {guestCount} khách</span>
                      <span>{totalCostInVND.toLocaleString('vi-VN')} VNĐ</span>
                 </div>
                 <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                      <span>Tổng cộng:</span>
                      <span className="text-sky-600">{totalCostInVND.toLocaleString('vi-VN')} VNĐ</span>
                 </div>
            </div>

            {/* --- Nút hành động --- */}
            <button 
                onClick={handleBookNow}
                className="w-full group mt-4 flex items-center justify-center gap-2 bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-all shadow-md"
            >
                Gửi Yêu Cầu
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
             <p className="flex items-center justify-center mt-3 text-xs text-gray-500">
                <Info size={14} className="mr-1.5"/>
                Bạn sẽ chưa phải thanh toán ngay.
            </p>
        </motion.div>
    );
};

export default TourBookingInfo;