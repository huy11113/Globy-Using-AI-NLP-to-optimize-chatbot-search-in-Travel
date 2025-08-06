const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Hàm fetch API chung để xử lý yêu cầu và lỗi một cách nhất quán.
 * @param {string} endpoint - Điểm cuối của API (ví dụ: '/users').
 * @param {object} options - Các tùy chọn cho hàm fetch (method, headers, body).
 * @returns {Promise<object>} - Kết quả từ server.
 */
const fetchApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
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

/**
 * Lấy danh sách tất cả người dùng (cho admin).
 * @param {string} token - Token xác thực của admin.
 * @returns {Promise<object>}
 */
export const getAllUsers = (token) => {
    return fetchApi(`/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Sẽ cần khi bạn bảo mật API admin
        },
    });
};

/**
 * Cập nhật thông tin cá nhân của người dùng.
 * @param {string} userId - ID của người dùng.
 * @param {object} userData - Dữ liệu cần cập nhật (name, phoneNumber).
 * @returns {Promise<object>}
 */
export const updateUserProfile = (userId, userData) => {
    return fetchApi(`/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
};

/**
 * Thay đổi mật khẩu của người dùng.
 * @param {string} userId - ID của người dùng.
 * @param {object} passwordData - { currentPassword, newPassword }.
 * @returns {Promise<object>}
 */
export const changeUserPassword = (userId, passwordData) => {
    return fetchApi(`/users/${userId}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
    });
};

/**
 * Xóa tài khoản người dùng.
 * @param {string} userId - ID của người dùng.
 * @returns {Promise<object>}
 */
export const deleteUserAccount = (userId) => {
    return fetchApi(`/users/${userId}`, {
        method: 'DELETE',
    });
};