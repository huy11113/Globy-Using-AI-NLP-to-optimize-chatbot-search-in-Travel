const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Hàm lấy tất cả các booking
export const getAllBookings = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
            headers: {
                // 'Authorization': `Bearer ${token}` // Sẽ cần khi bạn bảo mật API
            }
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Hàm duyệt một booking
export const approveBooking = async (bookingId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/approve`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to approve booking');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Hàm từ chối một booking
export const rejectBooking = async (bookingId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/reject`, {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to reject booking');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
// --- TOUR MANAGEMENT ---

export const createTour = async (tourData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // Sẽ cần khi bảo mật
            },
            body: JSON.stringify(tourData)
        });
        if (!response.ok) throw new Error('Failed to create tour');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const updateTour = async (tourId, tourData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tours/${tourId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tourData)
        });
        if (!response.ok) throw new Error('Failed to update tour');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteTour = async (tourId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tours/${tourId}`, {
            method: 'DELETE',
            headers: {
                // 'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to delete tour');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
