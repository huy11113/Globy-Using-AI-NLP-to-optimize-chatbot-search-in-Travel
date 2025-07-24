import React, { useState } from 'react';
import { Users, Calendar, Star } from 'lucide-react';

const BookingWidget = ({ tour }) => {
  const [guests, setGuests] = useState(1);
  const serviceFee = 25;
  const totalPrice = tour.price * guests + serviceFee;

  return (
    <div className="lg:sticky top-24 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-2xl font-bold text-blue-600">${tour.price} <span className="text-base font-normal text-gray-500">/ per person</span></p>
        <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /><span className="font-semibold">{tour.rating?.toFixed(1)}</span></div>
      </div>
      <div className="border-t pt-4 space-y-4">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
          <div className="relative mt-1">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="number" id="guests" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
        </div>
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure Date</label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select id="departure" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none">
              {tour.departures?.map((dep, index) => (
                <option key={index} value={dep.date}>
                  {new Date(dep.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="border-t pt-4 mt-4 space-y-2">
        <div className="flex justify-between text-gray-600"><span>${tour.price} x {guests} person(s)</span><span>${tour.price * guests}</span></div>
        <div className="flex justify-between text-gray-600"><span>Service fee</span><span>${serviceFee}</span></div>
        <div className="flex justify-between font-bold text-lg text-gray-900"><span>Total</span><span>${totalPrice}</span></div>
      </div>
      <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-teal-600 transform hover:scale-105 transition-all shadow-lg">Book Now</button>
    </div>
  );
};

export default BookingWidget;