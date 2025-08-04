import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CreditCard, ShieldCheck, ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { createBooking, processPayment } from '../api/booking';
import HotelSuggestion from '../components/Checkout/HotelSuggestion';

// Component con cho một lựa chọn phương thức thanh toán
const PaymentOption = ({ method, selectedMethod, onSelect, icon, title, subtitle }) => (
    <div 
        onClick={() => onSelect(method)} 
        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${selectedMethod === method ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
        {icon}
        <div className="flex-grow ml-4">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedMethod === method ? 'border-sky-500 bg-sky-500' : 'border-gray-300'}`}>
            {selectedMethod === method && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
    </div>
);

const CheckoutPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const { tour, guestCount, selectedDate, totalCost } = location.state || {};
    
    const [billingDetails, setBillingDetails] = useState({ fullName: '', email: '', phone: '' });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setBillingDetails({
                fullName: user.name || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
            });
        }
    }, [user]);

    if (!tour) {
        return (
            <div className="text-center py-40">
                <h2 className="text-2xl font-bold">Không có thông tin tour để thanh toán.</h2>
                <Link to="/tours" className="text-sky-500 hover:underline mt-4 inline-block">
                    Quay lại danh sách tour
                </Link>
            </div>
        );
    }

    const serviceFee = Math.round(totalCost * 0.05);
    const hotelCost = selectedHotel ? 240 : 0; // Giả sử giá khách sạn là $240
    const finalTotal = Number(totalCost) + serviceFee + hotelCost;

    const handleInputChange = (e) => {
        setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
    };

    const handleConfirmAndPay = async () => {
        if (!user) {
            navigate('/auth');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            const bookingRes = await createBooking({
                userId: user._id,
                tourId: tour._id,
                startDate: selectedDate,
                people: guestCount,
                totalPrice: finalTotal,
            });

            if (!bookingRes.success) throw new Error(bookingRes.message || "Không thể tạo booking.");
            
            const paymentRes = await processPayment({
                bookingId: bookingRes.data._id,
                amount: finalTotal,
                method: paymentMethod,
            });

            if (!paymentRes.success) throw new Error(paymentRes.message || "Thanh toán thất bại.");

            alert("Đặt tour và thanh toán thành công!");
            navigate('/my-bookings');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 pt-24 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                        <Link to={`/tours/${tour._id}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-600 mb-8">
                            <ArrowLeft size={16} />
                            Quay lại trang chi tiết
                        </Link>
                        <h1 className="text-3xl font-bold mb-8 text-gray-900">Xác nhận & Thanh toán</h1>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Thông tin của bạn</h2>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input name="fullName" value={billingDetails.fullName} onChange={handleInputChange} className="w-full pl-11 pr-4 py-2.5 border rounded-lg" placeholder="Họ và tên" />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input name="email" type="email" value={billingDetails.email} onChange={handleInputChange} className="w-full pl-11 pr-4 py-2.5 border rounded-lg" placeholder="Email" />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input name="phone" type="tel" value={billingDetails.phone} onChange={handleInputChange} className="w-full pl-11 pr-4 py-2.5 border rounded-lg" placeholder="Số điện thoại" />
                            </div>
                        </div>

                        <HotelSuggestion
                            city={tour.city}
                            onHotelSelect={setSelectedHotel}
                        />

                        <div className="mt-8 border-t border-dashed pt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                <PaymentOption method="credit_card" selectedMethod={paymentMethod} onSelect={setPaymentMethod} icon={<CreditCard className="text-sky-500" />} title="Thẻ tín dụng / Ghi nợ" subtitle="Thanh toán an toàn qua cổng thanh toán." />
                                <PaymentOption method="paypal" selectedMethod={paymentMethod} onSelect={setPaymentMethod} icon={<img src="https://www.svgrepo.com/show/303251/paypal-logo.svg" alt="paypal" className="w-6 h-6"/>} title="PayPal" subtitle="Sử dụng ví điện tử PayPal." />
                                <PaymentOption method="momo" selectedMethod={paymentMethod} onSelect={setPaymentMethod} icon={<img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="momo" className="w-6 h-6"/>} title="Ví MoMo" subtitle="Quét mã QR bằng ứng dụng MoMo." />
                            </div>
                        </div>
                    </div>

                    <aside className="lg:col-span-5 lg:sticky top-24 h-fit">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                            <img src={tour.image} alt={tour.title} className="w-full h-40 object-cover rounded-lg mb-6" />
                            <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
                            <p className="text-sm text-gray-500 mt-1">Ngày khởi hành: {new Date(selectedDate).toLocaleDateString('vi-VN')}</p>
                            <p className="text-sm text-gray-500">Số khách: {guestCount}</p>
                            
                            <div className="border-t border-dashed my-6"></div>

                            <h3 className="text-lg font-semibold mb-4">Chi tiết giá</h3>
                            <dl className="space-y-3 text-gray-600">
                                <div className="flex justify-between">
                                    <dt>Giá tour ({guestCount} khách)</dt>
                                    <dd>${totalCost}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Phí dịch vụ (5%)</dt>
                                    <dd>${serviceFee}</dd>
                                </div>
                                {selectedHotel && (
                                    <div className="flex justify-between text-sky-600 font-medium">
                                        <dt>Khách sạn: {selectedHotel.name}</dt>
                                        <dd>${hotelCost}</dd>
                                    </div>
                                )}
                            </dl>
                            
                            <div className="border-t my-6"></div>

                            <dl className="flex justify-between font-bold text-lg text-gray-900">
                                <dt>Tổng cộng</dt>
                                <dd>${finalTotal}</dd>
                            </dl>
                            
                            <button
                                onClick={handleConfirmAndPay}
                                disabled={isLoading}
                                className="w-full mt-6 py-3.5 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 disabled:bg-sky-400"
                            >
                                {isLoading ? 'Đang xử lý...' : `Xác nhận và Thanh toán`}
                            </button>
                            <div className="flex items-center justify-center mt-4 text-sm text-green-700">
                                <ShieldCheck size={16} className="mr-2"/>
                                <span>Thanh toán được mã hóa an toàn</span>
                            </div>
                            {error && <p className="text-center text-sm p-3 bg-red-100 text-red-700 rounded-lg mt-4">{error}</p>}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;