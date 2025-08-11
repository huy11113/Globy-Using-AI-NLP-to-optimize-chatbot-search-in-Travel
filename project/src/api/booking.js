// Định nghĩa URL gốc, không có /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Hàm fetch API chung để xử lý yêu cầu và lỗi một cách nhất quán.
 * @param {string} endpoint - Điểm cuối của API (ví dụ: '/bookings').
 * @param {object} options - Các tùy chọn cho hàm fetch (method, headers, body).
 * @returns {Promise<object>} - Kết quả từ server.
 */
const fetchApi = async (endpoint, options = {}) => {
    try {
        // Luôn thêm /api vào trước endpoint
        const response = await fetch(`${API_BASE_URL}/api${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Đã có lỗi xảy ra.');
        }
        return result;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${endpoint}:`, error);
        return { success: false, message: error.message };
    }
};

export const createBooking = (bookingData) => {
    return fetchApi('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
};

export const processPayment = (paymentData) => {
    return fetchApi('/bookings/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
    });
};

export const getMyTrips = (userId) => {
    return fetchApi(`/bookings/my-trips/${userId}`);
};

export const getBookingDetails = (bookingId) => {
    return fetchApi(`/bookings/${bookingId}`);
};