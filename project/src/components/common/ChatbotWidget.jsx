import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X, Compass, ArrowRight, PlaneTakeoff, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { askChatbot } from '../../api/chatbot';

// =================================================================
// CÁC COMPONENT CON ĐÃ ĐƯỢC THIẾT KẾ LẠI
// =================================================================

// --- ✅ COMPONENT MỚI: Hiển thị tour từng thẻ một với điều hướng ---
const SingleTourCarousel = React.memo(({ tours }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tours.length) % tours.length);
    };

    const currentTour = tours[currentIndex];
    
    // Sử dụng AnimatePresence để tạo hiệu ứng chuyển đổi mượt mà
    return (
        <div className="mt-3 space-y-2">
            <div className="relative h-[180px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-full"
                    >
                        <Link
                            to={currentTour.link}
                            onClick={() => document.getElementById('chatbot-toggle-button')?.click()}
                            className="group block bg-white rounded-xl shadow-md overflow-hidden h-full w-full"
                        >
                            <div className="relative h-full">
                                <img src={currentTour.image} alt={currentTour.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-3 text-white">
                                    <p className="font-bold text-sm leading-tight line-clamp-2">{currentTour.title}</p>
                                    <p className="text-xs opacity-80 mt-1">{currentTour.details.split(' - ')[0]}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Điều hướng và bộ đếm */}
            {tours.length > 1 && (
                <div className="flex items-center justify-between pt-1 px-2">
                    <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-xs font-semibold text-gray-500">
                        {currentIndex + 1} / {tours.length}
                    </span>
                    <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
});


// --- Component tin nhắn của Bot (cập nhật để dùng component mới) ---
const BotMessage = React.memo(({ msg }) => (
  <div className="flex items-end gap-2.5">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow">
      <Bot size={18} />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-t-xl rounded-br-xl max-w-[85%] bg-white text-gray-800 shadow-sm border border-gray-100"
    >
      <p className="whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      {/* ✅ SỬ DỤNG COMPONENT CAROUSEL MỚI */}
      {msg.tours && msg.tours.length > 0 && <SingleTourCarousel tours={msg.tours} />}
      {msg.link && (
        <Link
          to={msg.link}
          onClick={() => document.getElementById('chatbot-toggle-button')?.click()}
          className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:underline"
        >
          <span>Xem chi tiết tour</span><ArrowRight size={14} />
        </Link>
      )}
    </motion.div>
  </div>
));

// --- Component hiển thị loading "đang gõ" ---
const LoadingIndicator = () => (
    <div className="flex items-end gap-2.5">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow">
            <Bot size={18} />
        </div>
        <div className="p-3 rounded-t-xl rounded-br-xl bg-white flex items-center gap-1.5 shadow-sm border border-gray-100">
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} />
        </div>
    </div>
);

// --- Component màn hình chào mới ---
const WelcomeScreen = ({ onSuggestionClick }) => {
    const suggestions = [
        { icon: <Sparkles size={20}/>, text: "Gợi ý tour nổi bật" },
        { icon: <PlaneTakeoff size={20}/>, text: "Tìm tour đi Nhật Bản" },
        { icon: <Compass size={20}/>, text: "Các tour mạo hiểm" },
    ];
    return (
        <div className="text-center p-4 flex flex-col h-full justify-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div 
                    className="w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear"}}
                >
                    <img 
                        src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/78018/world-map-clipart-md.png" 
                        alt="World Map"
                        className="w-full h-full"
                    />
                </motion.div>
            </div>

            <p className="font-bold text-gray-800 text-lg">Xin chào, tôi là Globy!</p>
            <p className="mt-1 text-gray-600 text-sm">Người bạn đồng hành AI, sẵn sàng giúp bạn khám phá thế giới. Bạn muốn bắt đầu từ đâu?</p>
            <div className="mt-8 space-y-3">
                {suggestions.map((item, index) => (
                    <motion.button
                        key={item.text}
                        onClick={() => onSuggestionClick(item.text)}
                        className="w-full text-left flex items-center gap-4 p-3 bg-white/80 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 border"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <div className="text-sky-500">{item.icon}</div>
                        <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};


// =================================================================
// COMPONENT CHÍNH
// =================================================================
const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isLoading, isOpen]);

    const handleSendMessage = useCallback(async (e, predefinedQuery = null) => {
        if (e) e.preventDefault();
        const query = predefinedQuery || input;
        if (!query.trim() || isLoading) return;

        const newUserMessage = { text: query, fromUser: true };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const historyForApi = [...messages, newUserMessage];
            const result = await askChatbot(historyForApi);
            const botResponse = result.success 
                ? (typeof result.response === 'object' ? result.response : { text: result.response })
                : { text: result.message || "Rất tiếc, đã có lỗi xảy ra.", isError: true };
            setMessages(prev => [...prev, { ...botResponse, fromUser: false }]);
        } catch (error) {
            const networkError = { text: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.", fromUser: false, isError: true };
            setMessages(prev => [...prev, networkError]);
        } finally {
            setIsLoading(false);
        }
    }, [messages, input, isLoading]);
    
    return (
        <>
            <button
                id="chatbot-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[999] p-4 rounded-full bg-gradient-to-br from-gray-800 to-black text-white shadow-2xl hover:scale-110 transition-all duration-300 transform"
                aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'x' : 'bot'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'backOut' }}
                    >
                        {isOpen ? <X size={28} /> : <Bot size={28} />}
                    </motion.div>
                </AnimatePresence>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-[#f0f4f8] rounded-2xl shadow-2xl flex flex-col border overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center p-4 bg-white/80 backdrop-blur-sm shadow-sm border-b z-10">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow-inner">
                                <Bot size={22}/>
                            </div>
                            <div className="ml-3">
                                <h3 className="font-bold text-lg text-gray-800">Globy AI</h3>
                                <p className="text-xs text-green-600 font-semibold flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? <WelcomeScreen onSuggestionClick={(query) => handleSendMessage(null, query)} /> :
                            messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}>
                                    {msg.fromUser ? (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-3 rounded-t-xl rounded-bl-xl max-w-[85%] bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow text-sm"
                                        >
                                            {msg.text}
                                        </motion.div>
                                    ) : (
                                        <BotMessage msg={msg} />
                                    )}
                                </div>
                            ))}
                            {isLoading && <LoadingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <div className="p-3 border-t bg-white/90 backdrop-blur-sm">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Tìm kiếm hành trình của bạn..."
                                    className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg border-2 border-transparent focus:border-sky-300 focus:bg-white focus:outline-none transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 rounded-lg bg-gray-800 text-white hover:bg-black disabled:bg-gray-300 disabled:scale-95 transition-all duration-200"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotWidget;