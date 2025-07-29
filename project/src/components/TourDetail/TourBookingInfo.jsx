import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const TourBookingInfo = ({ tour }) => {
  // --- HOOKS ---
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [selectedDate, setSelectedDate] = useState(tour.departures?.[0]?.date || '');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // --- DERIVED STATE (CALCULATED DATA) ---
  const guestCount = adults + children;
  // ✅ TÍNH TOÁN GIÁ DỰA TRÊN GIÁ GỐC
  const totalCost = tour.price * guestCount;

  // Update default date if the tour prop changes
  useEffect(() => {
    setSelectedDate(tour.departures?.[0]?.date || '');
  }, [tour]);

  // --- HANDLERS ---
  const handleBookNow = () => {
    if (!selectedDate || guestCount === 0) {
      alert("Please select a departure date and number of guests.");
      return;
    }
    
    // Navigate to the checkout page and pass data via state
    navigate('/checkout', { 
      state: {
        tour,
        guestCount,
        selectedDate,
        totalCost: totalCost.toFixed(0)
      }
    });
  };

  return (
    <div className="lg:sticky top-24">
      <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-5">
        
        {/* ✅ PHẦN GIÁ ĐÃ ĐƯỢC CẬP NHẬT */}
        <div>
          <p className="text-gray-500 text-lg">Price starts from</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-bold text-sky-600">${tour.price}</span>
            <span className="text-lg font-normal text-gray-500">/ person</span>
          </div>
        </div>

        {/* Booking Form */}
        <div className="border-t pt-5 space-y-4">
          {/* Departure Date Selection */}
          <div>
            <label htmlFor="departure" className="block text-sm font-semibold text-gray-800">Departure Date</label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select 
                id="departure"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                {tour.departures?.map((dep, index) => (
                  <option key={index} value={dep.date}>
                    {new Date(dep.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {dep.seatsAvailable} seats left
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Guest Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">Guests</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {/* Adults */}
              <div className="p-3 border border-gray-300 rounded-lg">
                <label htmlFor="adults" className="block text-xs font-medium text-gray-500">Adults</label>
                <div className="flex items-center justify-between mt-1">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"><Minus size={16}/></button>
                  <span className="font-bold text-lg">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"><Plus size={16}/></button>
                </div>
              </div>
              {/* Children */}
              <div className="p-3 border border-gray-300 rounded-lg">
                <label htmlFor="children" className="block text-xs font-medium text-gray-500">Children</label>
                 <div className="flex items-center justify-between mt-1">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"><Minus size={16}/></button>
                  <span className="font-bold text-lg">{children}</span>
                  <button onClick={() => setChildren(children + 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"><Plus size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ PHẦN TÓM TẮT GIÁ ĐÃ ĐƯỢC CẬP NHẬT */}
        <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center text-gray-600">
                <span>${tour.price} x {guestCount} guests</span>
                <span className="font-semibold">${(tour.price * guestCount).toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-sky-600">${totalCost.toFixed(0)}</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button 
            onClick={handleBookNow}
            className="w-full bg-sky-600 text-white font-bold py-3.5 rounded-lg hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Book Now
          </button>
          <button className="w-full bg-gray-100 text-gray-800 font-bold py-3.5 rounded-lg hover:bg-gray-200 transition-all">
            Request Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourBookingInfo;