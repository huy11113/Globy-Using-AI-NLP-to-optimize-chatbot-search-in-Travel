const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * ✅ HÀM TIỆN ÍCH BỊ THIẾU
 * Hàm fetch API chung để xử lý yêu cầu và lỗi một cách nhất quán.
 */
const fetchApi = async (endpoint, options = {}) => {
    try {
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

// --- CÁC HÀM API CHO USER ---

/**
 * Lấy danh sách tất cả người dùng (cho admin).
 */
export const getAllUsers = (token) => {
    return fetchApi(`/users`, {
        headers: { /* 'Authorization': `Bearer ${token}` */ },
    });
};

/**
 * Xóa một người dùng (cho admin).
 */
export const deleteUser = (userId, token) => {
    return fetchApi(`/users/${userId}`, {
        method: 'DELETE',
        headers: { /* 'Authorization': `Bearer ${token}` */ },
    });
};

/**
 * Cập nhật vai trò của một người dùng (cho admin).
 */
export const updateUserRole = (userId, newRole, token) => {
    return fetchApi(`/users/${userId}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole }),
    });
};

/**
 * Cập nhật trạng thái khóa của người dùng (cho admin).
 */
export const updateUserSuspension = (userId, isSuspended, token) => {
    return fetchApi(`/users/${userId}/suspend`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ suspended: isSuspended }),
    });
};
/**
 * ✅ HÀM MỚI: Cập nhật thông tin cá nhân của người dùng.
 * @param {string} userId - ID của người dùng
 * @param {object} profileData - { name, phoneNumber, avatar }
 * @returns {Promise<object>}
 */
export const updateProfile = (userId, profileData) => {
    return fetchApi(`/users/${userId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
    });
};