const API_URL = 'http://localhost:4000/api/auth';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const requestPasswordReset = async (phoneNumber) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });
  return response.json();
};

export const submitNewPassword = async (data) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
// --- HÀM MỚI CHO ADMIN LOGIN ---
/**
 * Gửi yêu cầu đăng nhập cho admin.
 * @param {object} credentials - Chứa phoneNumber và password.
 * @returns {Promise<any>}
 */
export const loginAdmin = async (credentials) => {
  // Gọi đến endpoint /admin/login mới
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return response.json();
};
// HÀM MỚI
export const loginWithGoogle = async (googleToken) => {
  const response = await fetch(`${API_URL}/google/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: googleToken }), // Gửi token trong body
  });
  return response.json();
};