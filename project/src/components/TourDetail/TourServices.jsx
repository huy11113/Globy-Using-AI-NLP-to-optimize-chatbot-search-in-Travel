import React from 'react';
import { Check, X, Paperclip } from 'lucide-react';

const TourServices = ({ tour }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b">
                <Paperclip className="text-pink-500" />
                <h3 className="text-2xl font-bold text-gray-800">Dịch vụ bao gồm và không bao gồm</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-lg text-green-600 mb-3">BAO GỒM</h4>
                    <ul className="space-y-2">
                        {tour.included?.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-red-600 mb-3">KHÔNG BAO GỒM</h4>
                    <ul className="space-y-2">
                        {tour.excluded?.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <X className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TourServices;