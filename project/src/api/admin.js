// src/api/admin.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const fetchApi = async (endpoint, options = {}) => {
    try {
        // Sửa lỗi: Thêm /api vào trước endpoint
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

// Hàm lấy tất cả các booking
export const getAllBookings = (token) => {
    return fetchApi('/admin/bookings', {
        headers: {
            // 'Authorization': `Bearer ${token}`
        }
    });
};

// Hàm duyệt một booking
export const approveBooking = (bookingId, token) => {
    return fetchApi(`/admin/bookings/${bookingId}/approve`, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`
        }
    });
};

// Hàm từ chối một booking
export const rejectBooking = (bookingId, token) => {
    return fetchApi(`/admin/bookings/${bookingId}/reject`, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${token}`
        }
    });
};

// --- TOUR MANAGEMENT ---
export const createTour = (tourData, token) => {
    return fetchApi('/tours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
    });
};

export const updateTour = (tourId, tourData, token) => {
    return fetchApi(`/tours/${tourId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
    });
};

export const deleteTour = (tourId, token) => {
    return fetchApi(`/tours/${tourId}`, {
        method: 'DELETE',
        headers: {
            // 'Authorization': `Bearer ${token}`
        }
    });
};
// ✅ HÀM MỚI: Lấy tất cả dữ liệu thống kê cho dashboard
export const getDashboardStats = (token) => {
    return fetchApi('/admin/dashboard/stats', {
        headers: {
            // 'Authorization': `Bearer ${token}` // Bật lại khi cần xác thực
        }
    });
};
// --- REVIEW MANAGEMENT (ADMIN) ---

/**
 * Lấy tất cả review cho admin.
 */
export const getAllReviewsForAdmin = (token) => {
    return fetchApi('/reviews/admin/all', {
        headers: { /* 'Authorization': `Bearer ${token}` */ }
    });
};

/**
 * Cập nhật trạng thái hiển thị của một review.
 * @param {string} reviewId ID của review
 * @param {boolean} isVisible Trạng thái mới
 */
export const updateReviewVisibility = (reviewId, isVisible, token) => {
    return fetchApi(`/reviews/admin/${reviewId}/visibility`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isVisible })
    });
};

/**
 * Xóa một review.
 * @param {string} reviewId ID của review
 */
export const deleteReview = (reviewId, token) => {
    return fetchApi(`/reviews/admin/${reviewId}`, {
        method: 'DELETE',
        headers: {
            // 'Authorization': `Bearer ${token}`
        }
    });
};
// --- DESTINATION MANAGEMENT ---
export const createDestination = (destinationData, token) => {
    return fetchApi('/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' /*, 'Authorization': `Bearer ${token}`*/ },
        body: JSON.stringify(destinationData)
    });
};

export const updateDestination = (id, destinationData, token) => {
    return fetchApi(`/destinations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' /*, 'Authorization': `Bearer ${token}`*/ },
        body: JSON.stringify(destinationData)
    });
};

export const deleteDestination = (id, token) => {
    return fetchApi(`/destinations/${id}`, {
        method: 'DELETE',
        headers: { /* 'Authorization': `Bearer ${token}` */ }
    });
};
// --- BLOG POST MANAGEMENT ---
export const getAllPosts = (token) => {
    return fetchApi('/blog', { /* ... headers */ });
};

export const createPost = (postData, token) => {
    return fetchApi('/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' /*, Authorization */ },
        body: JSON.stringify(postData)
    });
};

export const updatePost = (id, postData, token) => {
    return fetchApi(`/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' /*, Authorization */ },
        body: JSON.stringify(postData)
    });
};

export const deletePost = (id, token) => {
    return fetchApi(`/blog/${id}`, {
        method: 'DELETE',
        headers: { /* Authorization */ }
    });
};