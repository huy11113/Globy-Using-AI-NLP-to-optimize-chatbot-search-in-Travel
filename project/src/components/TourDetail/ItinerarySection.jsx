import React from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

const ItinerarySection = ({ tour }) => {
    if (!tour.itinerary || tour.itinerary.length === 0) return null;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-8">
                <BookOpen className="text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Lịch trình</h3>
            </div>
            <div className="space-y-2">
                {tour.itinerary.map((item, index) => (
                    <details 
                        key={index} 
                        className="group bg-white rounded-lg overflow-hidden" 
                        open={index === 0}
                    >
                        <summary className="font-bold text-lg cursor-pointer flex justify-between items-center text-white list-none bg-pink-500 p-4">
                            <span>NGÀY {item.day} | {item.title}</span>
                            <ChevronDown className="transform transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="p-4 border border-t-0 border-gray-200 text-gray-700 leading-relaxed whitespace-pre-line">
                            {item.details}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default ItinerarySection;