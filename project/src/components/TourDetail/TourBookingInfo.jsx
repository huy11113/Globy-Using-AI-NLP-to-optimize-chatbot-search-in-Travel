import React from 'react';
import { Calendar } from 'lucide-react';

const TourBookingInfo = ({ tour }) => {
  const discountedPrice = tour.price * 0.9; 

  return (
    <div className="lg:sticky top-24">
      <div className="p-6 bg-white rounded-xl shadow-xl border border-gray-200 space-y-4">
        <div>
            <p className="text-gray-500 text-lg">Giá chỉ từ</p>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl text-gray-400 line-through">${tour.price}</span>
                <span className="text-4xl font-bold text-blue-600">${discountedPrice.toFixed(0)}</span>
                <span className="text-lg font-normal text-gray-500">/ người</span>
            </div>
        </div>
        <div className="border-t pt-4">
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Chọn ngày khởi hành</label>
            <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select 
                    id="departure" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-blue-500 focus:border-blue-500"
                >
                    {tour.departures?.map((dep, index) => (
                        <option key={index} value={dep.date}>
                        {new Date(dep.date).toLocaleDateString('vi-VN', { month: 'long', day: 'numeric', year: 'numeric' })} - Còn {dep.seatsAvailable} chỗ
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="adults" className="block text-sm font-medium text-gray-700">Người lớn</label>
                <input type="number" id="adults" min="1" defaultValue="1" className="mt-1 w-full p-2 border border-gray-300 rounded-lg"/>
            </div>
            <div>
                <label htmlFor="children" className="block text-sm font-medium text-gray-700">Trẻ em</label>
                <input type="number" id="children" min="0" defaultValue="0" className="mt-1 w-full p-2 border border-gray-300 rounded-lg"/>
            </div>
        </div>
        <div className="space-y-2 pt-2">
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                Đặt Tour Ngay
            </button>
            <button className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition-all">
                Yêu cầu tư vấn
            </button>
        </div>
      </div>
    </div>
  );
};

export default TourBookingInfo;