const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Gửi yêu cầu lên backend để tạo link thanh toán PayOS.
 * @param {string} bookingId - ID của đơn hàng cần thanh toán.
 * @returns {Promise<object>} - Kết quả từ server, chứa URL thanh toán hoặc thông báo lỗi.
 */
export const createPaymentLink = async (bookingId) => {
    if (!bookingId) {
        return { success: false, message: 'Booking ID is required.' };
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/payment/create-payment-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Không thể tạo link thanh toán.");
        }
        
        return result;
    } catch (err) {
        console.error("Error creating payment link:", err);
        return { success: false, message: "Lỗi kết nối khi tạo link thanh toán. Vui lòng thử lại." };
    }
};