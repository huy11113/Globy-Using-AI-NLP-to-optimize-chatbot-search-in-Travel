import React from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ItinerarySection = ({ tour }) => {
    if (!tour.itinerary || tour.itinerary.length === 0) return null;

    // State để quản lý mục nào đang được mở, mặc định mở mục đầu tiên
    const [openIndex, setOpenIndex] = React.useState(0);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-8">
                <BookOpen className="text-sky-600" />
                <h3 className="text-2xl font-bold text-gray-800">Lịch trình chi tiết</h3>
            </div>

            <div className="relative">
                {/* Thanh timeline dọc */}
                <div className="absolute left-5 top-0 w-0.5 h-full bg-sky-200"></div>

                <div className="space-y-4">
                    {tour.itinerary.map((item, index) => (
                        <div key={index} className="relative pl-12">
                            {/* Điểm mốc trên timeline */}
                            <div className="absolute -left-[9px] top-4 h-6 w-6 bg-white rounded-full border-4 border-sky-500"></div>

                            <div 
                                className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-shadow hover:shadow-md"
                            >
                                <div 
                                    className="font-bold text-lg cursor-pointer flex justify-between items-center text-white bg-sky-600 p-4"
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                >
                                    <span>NGÀY {item.day} | {item.title}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown />
                                    </motion.div>
                                </div>
                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, height: 'auto' },
                                                collapsed: { opacity: 0, height: 0 }
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 text-gray-700 leading-relaxed whitespace-pre-line border-t border-sky-200">
                                                {item.details}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItinerarySection;