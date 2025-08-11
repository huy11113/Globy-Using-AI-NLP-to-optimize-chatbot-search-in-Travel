const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/wishlist`;

/**
 * Lấy danh sách tour yêu thích của người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise<any>}
 */
export const getWishlist = async (userId) => {
  const response = await fetch(`${API_URL}/${userId}`);
  return response.json();
};

/**
 * Thêm hoặc xóa một tour khỏi danh sách yêu thích
 * @param {string} userId - ID của người dùng
 * @param {string} tourId - ID của tour
 * @returns {Promise<any>}
 */
export const toggleWishlist = async (userId, tourId) => {
  const response = await fetch(`${API_URL}/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, tourId }),
  });
  return response.json();
};