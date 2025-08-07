import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingDetails } from '../api/booking';
// ✅ SỬA LỖI: Thay thế LoaderCircle bằng Loader2
import { ShieldCheck, Loader2 } from 'lucide-react';

// --- COMPONENT CHÍNH ---
const CheckoutPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);

    // --- HÀM TẠO LINK THANH TOÁN (GỌI LÊN BACKEND) ---
    const createPaymentLink = useCallback(async () => {
        if (!bookingId) return;
        try {
            const response = await fetch('http://localhost:4000/api/payment/create-payment-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId }),
            });
            const result = await response.json();
            if (result.success) {
                setCheckoutUrl(result.checkoutUrl);
            } else {
                setError(result.message || "Không thể tạo link thanh toán. Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Lỗi kết nối khi tạo link thanh toán. Vui lòng đảm bảo backend đang chạy.");
        }
    }, [bookingId]);
    
    // --- LẤY THÔNG TIN BOOKING KHI VÀO TRANG ---
    useEffect(() => {
        const fetchBooking = async () => {
            setLoading(true);
            const result = await getBookingDetails(bookingId);
            if (result.success && result.data) {
                if (result.data.status !== 'approved') {
                    alert("Đơn hàng này không cần thanh toán hoặc đã được xử lý.");
                    navigate('/my-trips');
                } else {
                    setBooking(result.data);
                }
            } else {
                setError(result.message || "Không thể tải thông tin đơn hàng.");
            }
            setLoading(false);
        };
        fetchBooking();
    }, [bookingId, navigate]);
    
    // --- TẠO LINK THANH TOÁN SAU KHI CÓ THÔNG TIN BOOKING ---
    useEffect(() => {
        if (booking) {
            createPaymentLink();
        }
    }, [booking, createPaymentLink]);

    // --- POLLING: TỰ ĐỘNG KIỂM TRA TRẠNG THÁI ĐƠN HÀNG ---
    useEffect(() => {
        if (checkoutUrl) {
            setIsCheckingStatus(true);
            const intervalId = setInterval(async () => {
                const result = await getBookingDetails(bookingId);
                if (result.success && result.data.status === 'confirmed') {
                    clearInterval(intervalId);
                    setIsCheckingStatus(false);
                    alert("Thanh toán thành công! Chuyến đi của bạn đã được xác nhận.");
                    navigate('/my-trips');
                }
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [checkoutUrl, bookingId, navigate]);


    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                {/* ✅ SỬA LỖI: Thay thế LoaderCircle bằng Loader2 */}
                <Loader2 className="animate-spin text-sky-500" size={48} />
                <h2 className="mt-4 text-lg font-semibold text-gray-700">Đang tải thông tin thanh toán...</h2>
            </div>
        );
    }
    
    if (error || !booking) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi</h2>
                <p>{error || "Không tìm thấy đơn đặt tour."}</p>
            </div>
        );
    }
    
    const amountInVND = booking.totalPrice || 0;
    const qrCodeUrl = checkoutUrl ? checkoutUrl.replace('/vietqr', '/vietqr/show') : '';

    return (
        <main>
             <section className="relative h-60 bg-cover bg-center" style={{ backgroundImage: "url('https://images.spiderum.com/sp-images/8bbb4170ad1b11ecb24f5b60ba61a646.png')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                        Thanh Toán An Toàn
                    </h1>
                </div>
            </section>
             <section className="bg-slate-50 pb-16 md:pb-24">
                <div className="container mx-auto px-4 -mt-16 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-7">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
                                <h3 className="text-xl font-semibold mb-2">Quét mã để thanh toán</h3>
                                <p className="text-gray-500 mb-4">Sử dụng ứng dụng Ngân hàng hoặc Ví điện tử để quét mã VietQR.</p>
                                {qrCodeUrl ? (
                                    <iframe 
                                        src={qrCodeUrl}
                                        className="mx-auto w-[300px] h-[400px] md:w-[400px] md:h-[500px] border-none rounded-lg"
                                        title="PayOS QR Code"
                                    />
                                ) : (
                                    <div className="mx-auto w-[300px] h-[400px] md:w-[400px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
                                        <div className="text-center">
                                            {error ? (
                                                <p className="text-red-600">{error}</p>
                                            ) : (
                                                <>
                                                    {/* ✅ SỬA LỖI: Thay thế LoaderCircle bằng Loader2 */}
                                                    <Loader2 className="animate-spin text-sky-500 mx-auto" size={32} />
                                                    <p className="text-gray-600 mt-2">Đang tạo mã thanh toán...</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {isCheckingStatus && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-sky-600">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-sky-500"></div>
                                        <span>Đang chờ xác nhận thanh toán...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <aside className="lg:col-span-5 lg:sticky top-24 h-fit">
                             <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
                                <h3 className="text-xl font-semibold text-gray-800">{booking.tour.title}</h3>
                                <div className="border-t my-6"></div>
                                <dl className="flex justify-between items-center font-bold text-lg text-gray-900">
                                    <dt>Tổng thanh toán</dt>
                                    <dd className="text-3xl font-extrabold text-sky-600">{amountInVND.toLocaleString('vi-VN')} VNĐ</dd>
                                </dl>
                                <div className="flex items-center justify-center mt-4 text-sm text-green-700">
                                    <ShieldCheck size={16} className="mr-2"/>
                                    <span>Thanh toán được mã hóa an toàn qua PayOS</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;