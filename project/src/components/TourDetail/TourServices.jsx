import React from 'react';
import { Check, X, Paperclip, ChevronDown } from 'lucide-react';

const TourServices = ({ tour }) => {
    // Kiểm tra xem có dữ liệu không để tránh hiển thị component rỗng
    const hasIncluded = tour.included && tour.included.length > 0;
    const hasExcluded = tour.excluded && tour.excluded.length > 0;

    if (!hasIncluded && !hasExcluded) {
        return null;
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <Paperclip className="text-gray-500" />
                <h3 className="text-2xl font-bold text-gray-800">Dịch vụ Tour</h3>
            </div>
            <div className="space-y-4">
                {/* Phần Dịch vụ Bao gồm */}
                {hasIncluded && (
                    <details 
                        className="group bg-white rounded-lg border shadow-sm transition-all duration-300" 
                        open
                    >
                        <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-800 list-none p-4 hover:bg-gray-50">
                            <span>Dịch vụ bao gồm</span>
                            <ChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-gray-500" />
                        </summary>
                        <div className="p-4 border-t border-gray-200">
                            <ul className="space-y-3">
                                {tour.included.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                )}

                {/* Phần Dịch vụ Không bao gồm */}
                {hasExcluded && (
                     <details 
                        className="group bg-white rounded-lg border shadow-sm transition-all duration-300"
                        open
                    >
                        <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-800 list-none p-4 hover:bg-gray-50">
                            <span>Dịch vụ không bao gồm</span>
                            <ChevronDown className="transform transition-transform duration-300 group-open:rotate-180 text-gray-500" />
                        </summary>
                        <div className="p-4 border-t border-gray-200">
                            <ul className="space-y-3">
                                {tour.excluded.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <X className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </details>
                )}
            </div>
        </div>
    );
};

export default TourServices;