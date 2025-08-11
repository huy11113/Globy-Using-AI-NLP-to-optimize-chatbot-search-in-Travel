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