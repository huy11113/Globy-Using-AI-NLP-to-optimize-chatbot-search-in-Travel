// ✅ Cải tiến 1: Định nghĩa một URL gốc để dễ dàng thay đổi và tái sử dụng.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Gửi yêu cầu tạo một booking mới lên server.
 * @param {object} bookingData - Dữ liệu booking (userId, tourId, v.v.).
 * @returns {Promise<object>} - Kết quả từ server.
 */
export const createBooking = async (bookingData) => {
  try {
    // ✅ Sửa lỗi 2: URL chính xác phải là /bookings
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();

    // ✅ Cải tiến 3: Xử lý lỗi chuyên nghiệp.
    // Nếu request không thành công (ví dụ: lỗi 400, 500), ném ra lỗi.
    if (!response.ok) {
      throw new Error(result.message || 'Gửi yêu cầu đặt tour thất bại.');
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error);
    // Luôn trả về một object có message để UI có thể hiển thị.
    return { success: false, message: error.message };
  }
};

/**
 * Gửi yêu cầu xử lý thanh toán cho một booking.
 * @param {object} paymentData - Dữ liệu thanh toán (bookingId, amount, method).
 * @returns {Promise<object>} - Kết quả từ server.
 */
export const processPayment = async (paymentData) => {
  try {
    // ✅ Sửa lỗi 4: URL chính xác là /bookings/payment
    const response = await fetch(`${API_BASE_URL}/bookings/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Thanh toán thất bại.');
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi xử lý thanh toán:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Lấy danh sách tất cả các chuyến đi của một người dùng.
 * @param {string} userId - ID của người dùng.
 * @returns {Promise<object>} - Kết quả từ server.
 */
export const getMyTrips = async (userId) => {
  try {
    // ✅ Sửa lỗi 5: URL chính xác là /bookings/my-trips/{userId}
    const response = await fetch(`${API_BASE_URL}/bookings/my-trips/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Không thể lấy dữ liệu chuyến đi.');
    }
    
    return result;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách chuyến đi:", error);
    return { success: false, message: error.message };
  }
  
};


/**
 * Lấy thông tin chi tiết của một booking.
 * @param {string} bookingId - ID của booking.
 * @returns {Promise<object>} - Chi tiết booking từ server.
 */
export const getBookingDetails = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Không thể lấy thông tin đơn đặt tour.');
    }
    return result;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết booking:", error);
    return { success: false, message: error.message };
  }
};