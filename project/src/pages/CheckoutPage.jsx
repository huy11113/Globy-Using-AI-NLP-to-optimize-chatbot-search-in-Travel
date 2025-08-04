import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getBookingDetails, processPayment } from '../api/booking';
import { ShieldCheck, User, Mail, Phone, Banknote, Copy, ArrowLeft } from 'lucide-react';

// --- COMPONENT PHỤ CHO CÁC LỰA CHỌN THANH TOÁN ---
const PaymentOption = ({ method, selectedMethod, onSelect, icon, title, subtitle }) => (
    <div 
        onClick={() => onSelect(method)} 
        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedMethod === method ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200' : 'border-gray-200 bg-white hover:border-gray-300'}`}
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

// --- COMPONENT CHÍNH ---
const CheckoutPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('momo'); // Mặc định là MoMo
    const [paymentStep, setPaymentStep] = useState(1); // Bước 1: Chọn, Bước 2: Hiển thị chi tiết

    useEffect(() => {
        if (bookingId) {
            const fetchBooking = async () => {
                setLoading(true);
                const result = await getBookingDetails(bookingId);
                if (result.success) setBooking(result.data);
                else setError(result.message);
                setLoading(false);
            };
            fetchBooking();
        }
    }, [bookingId]);

    const handleProceedToPayment = () => {
        // Chuyển sang bước 2 để hiển thị thông tin chi tiết
        setPaymentStep(2);
    };
    
    const handleCompletePayment = async () => {
        setLoading(true);
        setError('');
        const result = await processPayment({
            bookingId: booking.id,
            amount: booking.totalPrice,
            method: paymentMethod,
        });
        setLoading(false);
        if (result.success) {
            alert(result.message);
            navigate('/my-trips');
        } else {
            setError(result.message || 'Xác nhận thanh toán thất bại.');
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Đã sao chép: ${text}`);
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><h2>Đang tải...</h2></div>;
    if (error || !booking) return <div className="text-center py-24"><h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2><p>{error || "Không tìm thấy đơn đặt tour."}</p></div>;

    return (
        <section className="bg-slate-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Cột trái: Thông tin & Lựa chọn thanh toán */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                            {paymentStep === 2 && (
                                <button onClick={() => setPaymentStep(1)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-sky-600 mb-6">
                                    <ArrowLeft size={16} />
                                    Quay lại chọn phương thức khác
                                </button>
                            )}
                            <h1 className="text-3xl font-bold mb-6 text-gray-900">Thanh toán đơn hàng</h1>

                            {/* --- STEP 1: CHỌN PHƯƠNG THỨC --- */}
                            {paymentStep === 1 && (
                                <>
                                    <fieldset className="mb-8">
                                        <legend className="text-lg font-semibold text-gray-800 mb-4">Thông tin người đặt</legend>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"><User size={18}/><span>{user?.name}</span></div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md"><Mail size={18}/><span>{user?.email}</span></div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend className="text-lg font-semibold text-gray-800 mb-4">Chọn phương thức thanh toán</legend>
                                        <div className="space-y-4">
                                            <PaymentOption method="momo" selectedMethod={paymentMethod} onSelect={setPaymentMethod} icon={<img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="momo" className="w-7 h-7"/>} title="Ví điện tử MoMo" subtitle="Quét mã QR để thanh toán."/>
                                            <PaymentOption method="bank_transfer" selectedMethod={paymentMethod} onSelect={setPaymentMethod} icon={<Banknote className="text-green-500 w-7 h-7"/>} title="Chuyển khoản ngân hàng" subtitle="Chuyển khoản thủ công theo thông tin."/>
                                        </div>
                                    </fieldset>
                                </>
                            )}
                            
                            {/* --- STEP 2: HIỂN THỊ THÔNG TIN CHI TIẾT --- */}
                            {paymentStep === 2 && paymentMethod === 'momo' && (
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold mb-4">Quét mã QR bằng ứng dụng MoMo</h3>
                                    <img src="https://i.ibb.co/L0SMX8h/qr-momo.png" alt="QR Code MoMo" className="mx-auto w-64 h-64 border p-2 rounded-lg" />
                                    <p className="mt-4 text-gray-600">Nội dung chuyển khoản:</p>
                                    <p className="font-bold text-lg font-mono tracking-widest text-red-500">TT {booking.id.substring(0, 8)}</p>
                                </div>
                            )}

                            {paymentStep === 2 && paymentMethod === 'bank_transfer' && (
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-4 text-xl">Thông tin chuyển khoản</h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center py-2 border-b"><span>Ngân hàng:</span> <span className="font-bold">Vietcombank</span></div>
                                        <div className="flex justify-between items-center py-2 border-b"><span>Chủ tài khoản:</span> <span className="font-bold">CONG TY TNHH DU LICH GLOBY</span></div>
                                        <div className="flex justify-between items-center py-2 border-b"><span>Số tài khoản:</span> <button onClick={() => copyToClipboard('1234567890')} className="font-bold flex items-center gap-2 hover:text-green-600">1234567890 <Copy size={14}/></button></div>
                                        <div className="flex justify-between items-center py-2"><span>Nội dung CK:</span> <button onClick={() => copyToClipboard(`TT ${booking.id.substring(0, 8)}`)} className="font-bold font-mono flex items-center gap-2 hover:text-green-600">TT {booking.id.substring(0, 8)} <Copy size={14}/></button></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cột phải: Tóm tắt & Nút thanh toán */}
                    <aside className="lg:col-span-5 lg:sticky top-24 h-fit">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
                            <img src={booking.tour.image} alt={booking.tour.title} className="w-full h-40 object-cover rounded-lg mb-6 shadow-md" />
                            <h3 className="text-xl font-semibold text-gray-800">{booking.tour.title}</h3>
                            <dl className="space-y-3 text-gray-600 mt-4">
                                <div className="flex justify-between"><dt>Ngày đi:</dt><dd className="font-medium">{new Date(booking.startDate).toLocaleDateString('vi-VN')}</dd></div>
                                <div className="flex justify-between"><dt>Số khách:</dt><dd className="font-medium">{booking.people} người</dd></div>
                                <div className="flex justify-between"><dt>Mã đơn hàng:</dt><dd className="font-mono text-sm">#{booking.id.substring(0, 8).toUpperCase()}</dd></div>
                            </dl>
                            <div className="border-t my-6"></div>
                            <dl className="flex justify-between items-center font-bold text-lg text-gray-900">
                                <dt>Tổng thanh toán</dt>
                                <dd className="text-3xl font-extrabold text-sky-600">${booking.totalPrice.toFixed(2)}</dd>
                            </dl>
                            
                            {/* Nút bấm thay đổi tùy theo bước */}
                            {paymentStep === 1 && (
                                <button onClick={handleProceedToPayment} className="w-full mt-6 py-3.5 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-all duration-300">
                                    Xác nhận và Thanh toán
                                </button>
                            )}

                            {paymentStep === 2 && (
                                <button onClick={handleCompletePayment} disabled={loading} className="w-full mt-6 py-3.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-all duration-300">
                                    {loading ? 'Đang xử lý...' : 'Tôi đã thanh toán'}
                                </button>
                            )}
                            
                            <div className="flex items-center justify-center mt-4 text-sm text-green-700">
                                <ShieldCheck size={16} className="mr-2"/>
                                <span>Thanh toán được mã hóa an toàn</span>
                            </div>
                            {error && <p className="text-center text-sm p-3 bg-red-100 text-red-700 rounded-lg mt-4">{error}</p>}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;