// Định nghĩa URL gốc, không có /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const askChatbot = async (prompt) => {
    try {
        // SỬA LỖI: Thêm /api vào URL
        const response = await fetch(`${API_BASE_URL}/api/chatbot/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prompt),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Lỗi khi kết nối với chatbot.');
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi gọi API chatbot:", error);
        return { success: false, message: error.message };
    }
};