const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Lấy tất cả review của một tour
 * @param {string} tourId
 * @returns {Promise<any>}
 */
export const getReviewsByTour = async (tourId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/tour/${tourId}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message, data: [] };
    }
};

/**
 * Gửi một review mới
 * @param {object} reviewData - { userId, tourId, rating, comment }
 * @returns {Promise<any>}
 */
export const submitReview = async (reviewData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to submit review');
        return result;
    } catch (error) {
        return { success: false, message: error.message };
    }
};