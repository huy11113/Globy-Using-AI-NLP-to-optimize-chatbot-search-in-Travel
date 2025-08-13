import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X, Sparkles, ArrowRight, ChevronDown, CornerDownLeft } from 'lucide-react';
import { askChatbot } from '../../api/chatbot';

// =================================================================
// ✅ BƯỚC 1: TÁI CẤU TRÚC - TÁCH CÁC COMPONENT CON
// =================================================================

// --- Component hiển thị một tour trong danh sách kết quả ---
const TourResultCard = React.memo(({ tour, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
  };
  return (
    <motion.div variants={cardVariants}>
      <Link
        to={tour.link}
        onClick={() => document.getElementById('chatbot-toggle-button')?.click()}
        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sky-100/50 transition-colors group border border-transparent hover:border-sky-200"
      >
        <img src={tour.image} alt={tour.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0 shadow-sm" />
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold text-sm text-gray-800 group-hover:text-sky-700 truncate">{tour.title}</p>
          <p className="text-xs text-gray-500 mt-1">{tour.details}</p>
        </div>
        <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform mt-1" />
      </Link>
    </motion.div>
  );
});

// --- Component hiển thị danh sách tour có thể mở rộng ---
const ExpandableTourList = React.memo(({ tours }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialVisibleCount = 2;
  const toursToShow = isExpanded ? tours : tours.slice(0, initialVisibleCount);

  return (
    <div className="mt-3 space-y-1 border-t border-gray-200 pt-3">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
        {toursToShow.map((tour, index) => (
          <TourResultCard key={tour.link || index} tour={tour} index={index} />
        ))}
      </motion.div>
      {tours.length > initialVisibleCount && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-center text-xs font-bold text-sky-600 p-2 rounded-md hover:bg-sky-100/50 flex items-center justify-center gap-1 transition-colors"
        >
          <span>{isExpanded ? 'Ẩn bớt' : `Xem thêm ${tours.length - initialVisibleCount} kết quả`}</span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown size={14} /></motion.div>
        </button>
      )}
    </div>
  );
});

// --- Component hiển thị tin nhắn của Bot ---
const BotMessage = React.memo(({ msg }) => (
  <div className="flex items-end gap-2.5">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow">
      <Bot size={18} />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-t-xl rounded-br-xl max-w-[85%] bg-white text-gray-800 shadow-sm border border-gray-100"
    >
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
      {msg.image && (
        <img src={msg.image} alt="Tour suggestion" className="mt-2 rounded-lg shadow-md" />
      )}
      {msg.tours && msg.tours.length > 0 && <ExpandableTourList tours={msg.tours} />}
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
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow">
            <Bot size={18} />
        </div>
        <div className="p-3 rounded-t-xl rounded-br-xl bg-white flex items-center gap-1.5 shadow-sm border border-gray-100">
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} />
        </div>
    </div>
);

// --- Component màn hình chào ---
const WelcomeScreen = ({ onSuggestionClick }) => (
    <div className="text-center text-gray-500 p-4 text-sm flex flex-col h-full justify-center">
        <div className="bg-gradient-to-br from-sky-400 to-blue-500 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <Sparkles size={32} className="text-white"/>
        </div>
        <p className="font-bold text-gray-700 text-lg">Chào bạn! Tôi là Trợ lý du lịch AI</p>
        <p className="mt-1">Tôi có thể giúp bạn tìm kiếm thông tin về các tour du lịch. Hãy thử hỏi tôi một vài câu nhé!</p>
        <div className="mt-6 space-y-2">
            {["Tour nổi bật?", "Tìm tour đi biển", "Tour dưới 5 triệu"].map(chip => (
                <button
                    key={chip}
                    onClick={() => onSuggestionClick(chip)}
                    className="px-3 py-1.5 bg-sky-100/60 text-sky-700 text-xs font-medium rounded-full hover:bg-sky-200/60 hover:text-sky-800 transition-colors"
                >
                    {chip}
                </button>
            ))}
        </div>
    </div>
);


// =================================================================
// ✅ BƯỚC 2: CẬP NHẬT COMPONENT CHÍNH
// =================================================================
const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();

    // Tự động đóng chatbot khi chuyển trang
    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    // Tự động cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isLoading, isOpen]);

    // ✅ Nâng cấp logic gửi tin nhắn để xử lý "Trí nhớ hội thoại"
    const handleSendMessage = useCallback(async (e, predefinedQuery = null) => {
        if (e) e.preventDefault();
        const query = predefinedQuery || input;
        if (!query.trim() || isLoading) return;

        const newUserMessage = { text: query, fromUser: true };
        const updatedHistory = [...messages, newUserMessage];

        setMessages(updatedHistory);
        setInput('');
        setIsLoading(true);

        try {
            // Gửi toàn bộ lịch sử chat cho backend
            const result = await askChatbot(updatedHistory);
            
            const botResponse = result.success 
                ? (typeof result.response === 'object' ? result.response : { text: result.response })
                : { text: result.message || "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại.", isError: true };

            setMessages(prev => [...prev, { ...botResponse, fromUser: false }]);

        } catch (err) {
            setMessages(prev => [...prev, { text: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.", fromUser: false, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, messages, isLoading]);
    
    return (
        <>
            <button
                id="chatbot-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[999] p-4 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 transform"
                aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot"}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'x' : 'message'}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
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
                        className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-50 rounded-2xl shadow-2xl flex flex-col border border-gray-200/80"
                    >
                        {/* Header */}
                        <div className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-t-2xl shadow-sm border-b">
                            <Sparkles size={20} className="text-sky-500" />
                            <h3 className="ml-2 font-bold text-lg text-gray-800">Trợ lý du lịch AI</h3>
                        </div>

                        {/* Message List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && <WelcomeScreen onSuggestionClick={(query) => handleSendMessage(null, query)} />}
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}>
                                    {msg.fromUser ? (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-3 rounded-t-xl rounded-bl-xl max-w-[85%] bg-blue-500 text-white shadow text-sm"
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
                        <div className="p-3 border-t bg-white rounded-b-2xl">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Hỏi tôi về một chuyến đi..."
                                    className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg border-2 border-transparent focus:border-sky-300 focus:outline-none transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 disabled:bg-gray-300 disabled:scale-95 transition-all duration-200"
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