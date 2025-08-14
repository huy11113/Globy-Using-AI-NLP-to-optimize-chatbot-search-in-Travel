// File: src/api/chatbot.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const askChatbot = async (messageHistory) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chatbot/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // ✅ Đảm bảo body gửi đi là một object có key là "history"
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