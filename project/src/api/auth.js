const API_URL = 'http://localhost:4000/api/auth';

// Hàm chung để xử lý fetch và lỗi
const fetchApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            // Nếu server trả về lỗi, ném lỗi với thông báo từ server
            throw new Error(result.message || 'Đã có lỗi xảy ra.');
        }
        return result;
    } catch (error) {
        console.error(`Lỗi khi gọi API ${endpoint}:`, error);
        // Trả về một object lỗi nhất quán
        return { success: false, message: error.message };
    }
};

export const registerUser = async (userData) => {
    return fetchApi('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
};

export const loginUser = async (credentials) => {
    return fetchApi('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
};

export const requestPasswordReset = async (phoneNumber) => {
    return fetchApi('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
    });
};

export const submitNewPassword = async (data) => {
    return fetchApi('/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

export const loginAdmin = async (credentials) => {
    return fetchApi('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
};

export const loginWithGoogle = async (googleToken) => {
    return fetchApi('/google/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
    });
};