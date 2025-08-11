import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, Send, X, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { askChatbot } from '../../api/chatbot';

// --- ✅ COMPONENT MỚI: Danh sách tour có thể mở rộng ---
const ExpandableTourList = ({ tours }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const initialVisibleCount = 2;
    const toursToShow = isExpanded ? tours : tours.slice(0, initialVisibleCount);

    const handleToggle = () => setIsExpanded(!isExpanded);

    const cardVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="mt-2 space-y-2 border-t pt-2">
            <AnimatePresence initial={false}>
                {toursToShow.map((tour, index) => (
                    <motion.div
                        key={tour.link}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Link
                            to={tour.link}
                            onClick={() => document.getElementById('chatbot-toggle-button')?.click()}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 transition-colors group"
                        >
                            <img src={tour.image} alt={tour.title} className="w-14 h-14 object-cover rounded-md flex-shrink-0"/>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold text-sm text-sky-700 truncate">{tour.title}</p>
                                <p className="text-xs text-gray-500">{tour.details}</p>
                            </div>
                            <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>

            {tours.length > initialVisibleCount && (
                <button
                    onClick={handleToggle}
                    className="w-full text-center text-sm font-bold text-sky-600 p-2 rounded-md hover:bg-gray-200 flex items-center justify-center gap-1"
                >
                    <span>{isExpanded ? 'Thu gọn' : `Xem thêm ${tours.length - initialVisibleCount} kết quả`}</span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown size={16} />
                    </motion.div>
                </button>
            )}
        </div>
    );
};

// --- Component phụ cho tin nhắn của Bot ---
const BotMessage = ({ msg }) => (
    <div className="flex items-end gap-2">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-md">
            <Bot size={18} />
        </div>
        <div className="p-3 rounded-t-xl rounded-br-xl max-w-[85%] bg-gray-100 text-gray-800 shadow-sm">
            <p className="whitespace-pre-wrap">{msg.text}</p>
            
            {msg.image && (
                <img src={msg.image} alt="Tour suggestion" className="mt-2 rounded-lg shadow-md" />
            )}
            
            {msg.tours && msg.tours.length > 0 && (
                <ExpandableTourList tours={msg.tours} />
            )}

            {msg.link && (
                <Link
                    to={msg.link}
                    onClick={() => document.getElementById('chatbot-toggle-button')?.click()}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:underline"
                >
                    <span>Xem chi tiết tour</span>
                    <ArrowRight size={14} />
                </Link>
            )}
        </div>
    </div>
);

// --- Component chính (giữ nguyên logic, chỉ thay đổi BotMessage) ---
const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();

    useEffect(() => { setIsOpen(false); }, [location.pathname]);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);

    const handleSendMessage = async (e, predefinedQuery = null) => {
        if (e) e.preventDefault();
        const query = predefinedQuery || input;
        if (!query.trim()) return;

        const userMessage = { text: query, fromUser: true };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await askChatbot(query);
            if (result.success) {
                const botResponse = result.response;
                if (typeof botResponse === 'string') {
                    setMessages(prev => [...prev, { text: botResponse, fromUser: false }]);
                } else if (typeof botResponse === 'object') {
                    setMessages(prev => [...prev, {
                        text: botResponse.text,
                        image: botResponse.image,
                        link: botResponse.link,
                        tours: botResponse.tours,
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
    
    const suggestionChips = ["Tour nổi bật?", "Tìm tour đi biển", "Tour dưới 5 triệu"];

    return (
        <>
            <button
                id="chatbot-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[999] p-4 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 transform`}
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
                        initial={{ opacity: 0, scale: 0.8, y: 50, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0, originX: 1, originY: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50, originX: 1, originY: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200"
                    >
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-2xl shadow-md">
                            <div className="flex items-center gap-3">
                                <Sparkles size={24} className="text-yellow-300" />
                                <h3 className="font-bold text-lg">Trợ lý du lịch AI</h3>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}>
                                    {msg.fromUser ? (
                                        <div className="p-3 rounded-t-xl rounded-bl-xl max-w-[85%] bg-blue-500 text-white shadow">
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <BotMessage msg={msg} />
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-end gap-2">
                                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white">
                                        <Bot size={18} />
                                    </div>
                                    <div className="p-3 rounded-t-xl rounded-br-xl bg-gray-100 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}

                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 pt-8 text-sm space-y-4">
                                    <p>Chào bạn! Tôi có thể giúp bạn tìm kiếm thông tin về tour du lịch.</p>
                                    <p className="font-semibold">Bạn có thể thử hỏi:</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {suggestionChips.map(chip => (
                                            <button 
                                                key={chip}
                                                onClick={() => handleSendMessage(null, chip)}
                                                className="px-3 py-1.5 bg-sky-100 text-sky-700 text-xs font-medium rounded-full hover:bg-sky-200 transition-colors"
                                            >
                                                {chip}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Hỏi tôi về tour du lịch..."
                                    className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full border-2 border-transparent focus:border-sky-500 focus:outline-none transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 rounded-full bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-300 disabled:scale-95 transition-all duration-200"
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