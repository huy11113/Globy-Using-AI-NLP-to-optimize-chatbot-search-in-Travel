// src/components/common/ChatbotWidget.jsx
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X, Loader } from 'lucide-react';
import { askChatbot } from '../../api/chatbot'; // Import API vừa tạo

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Cuộn xuống cuối khung chat mỗi khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, fromUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askChatbot(input);
      if (result.success) {
        // ✅ CẬP NHẬT: Xử lý phản hồi có cấu trúc
        const botResponse = result.response;
        if (typeof botResponse === 'string') {
          setMessages(prev => [...prev, { text: botResponse, fromUser: false }]);
        } else if (typeof botResponse === 'object') {
          setMessages(prev => [...prev, { 
            text: botResponse.text, 
            image: botResponse.image,
            link: botResponse.link,
            fromUser: false 
          }]);
        }
      } else {
        setMessages(prev => [...prev, { text: result.message, fromUser: false, isError: true }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.", fromUser: false, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      {/* Nút bật/tắt Widget */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-sky-600 text-white shadow-xl hover:bg-sky-700 transition-transform duration-300 transform hover:scale-110"
        aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Cửa sổ Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200"
          >
{/* Header của Chatbot */}
            <div className="flex items-center justify-between p-4 bg-sky-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-sky-100" />
                <h3 className="font-bold text-lg">Globy Chatbot</h3>
              </div>
              <button onClick={handleClose} className="p-1 rounded-full hover:bg-sky-700/50">
                <X size={20} />
              </button>
            </div>

            {/* Khung tin nhắn */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-auto text-sm">
                  Chào bạn! Tôi có thể giúp bạn tìm kiếm thông tin về tour du lịch.
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl max-w-[85%] ${
                      msg.fromUser 
                        ? 'bg-sky-500 text-white' 
                        : msg.isError 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p>{msg.text}</p>
                      {/* ✅ CẬP NHẬT: Hiển thị hình ảnh nếu có */}
                      {msg.image && (
                          <img src={msg.image} alt="Tour" className="mt-2 rounded-lg" />
                      )}
                      {/* ✅ CẬP NHẬT: Hiển thị đường dẫn nếu có */}
                      {msg.link && (
    <Link to={msg.link} className="mt-2 inline-block text-sm text-sky-600 hover:underline">
        Xem chi tiết tour →
    </Link>
)}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-xl max-w-[85%] bg-gray-100 text-gray-800 animate-pulse">
                      Đang trả lời...
                    </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input gửi tin nhắn */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi tôi về tour du lịch..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-2 border-transparent focus:border-sky-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
<button
                  type="submit"
                  disabled={isLoading}
                  className="p-2.5 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-400 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
