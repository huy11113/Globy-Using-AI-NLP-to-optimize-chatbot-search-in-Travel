import React, { useState, useEffect } from 'react';
import { Info, BookOpen, Paperclip, FileText, Camera, Star } from 'lucide-react';

const TourNavigation = () => {
    const [activeSection, setActiveSection] = useState('highlights');

    const navItems = [
        { id: 'highlights', text: 'Điểm nhấn hành trình', icon: <Info size={18} /> },
        { id: 'gallery', text: 'Album ảnh', icon: <Camera size={18} /> },
        { id: 'itinerary', text: 'Lịch trình', icon: <BookOpen size={18} /> },
        { id: 'services', text: 'Dịch vụ', icon: <Paperclip size={18} /> },
        { id: 'notes', text: 'Ghi chú', icon: <FileText size={18} /> },
        { id: 'reviews', text: 'Đánh giá', icon: <Star size={18} /> }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150; 

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Trừ đi 100px để không bị header che
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="hidden lg:block"> 
            <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                    activeSection === item.id 
                                    ? 'bg-pink-500 text-white shadow' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.icon}
                                <span className="font-semibold text-sm">{item.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TourNavigation;