// File: src/api/chatbot.js

// Định nghĩa URL gốc, không có /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ✅ SỬA LẠI HÀM NÀY ĐỂ NHẬN VÀ GỬI ĐI LỊCH SỬ CHAT
export const askChatbot = async (messageHistory) => {
    try {
        // Thêm /api vào URL
        const response = await fetch(`${API_BASE_URL}/api/chatbot/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Quan trọng: Gửi đi một đối tượng có key là "history"
            // đúng như backend (ChatRequest.java) đang mong đợi
            body: JSON.stringify({ history: messageHistory }),
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