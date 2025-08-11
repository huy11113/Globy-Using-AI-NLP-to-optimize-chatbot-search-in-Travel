const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


/**
 * Lấy danh sách thông báo chưa đọc của admin.
 * @returns {Promise<object>}
 */
export const getUnreadAdminNotifications = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/notifications`);
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, message: error.message, data: [] };
    }
};

/**
 * Đánh dấu một thông báo là đã đọc.
 * @param {string} notificationId - ID của thông báo.
 * @returns {Promise<object>}
 */
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/notifications/${notificationId}/read`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to mark notification as read');
        }
        return await response.json();
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return { success: false, message: error.message };
    }
};
// Thêm 2 hàm này vào cuối file api/notification.js

/**
 * Lấy danh sách thông báo chưa đọc của user.
 * @param {string} userId - ID của người dùng
 * @returns {Promise<object>}
 */
export const getUnreadUserNotifications = async (userId) => {
    try {
        // Đường dẫn API đúng phải là /api/admin/notifications/user/{userId}
        const response = await fetch(`${API_BASE_URL}/admin/notifications/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user notifications');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user notifications:", error);
        return { success: false, message: error.message, data: [] };
    }
};

/**
 * Đánh dấu một thông báo của user là đã đọc.
 * @param {string} notificationId - ID của thông báo.
 * @returns {Promise<object>}
 */
export const markUserNotificationAsRead = async (notificationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/notifications/user/${notificationId}/read`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to mark user notification as read');
        }
        return await response.json();
    } catch (error) {
        console.error("Error marking user notification as read:", error);
        return { success: false, message: error.message };
    }
};