import React from 'react';

const ItinerarySection = () => {
  // Dữ liệu mẫu cho Lịch trình
  const itinerary = [
    { day: 1, title: "Arrival & City Exploration", details: "Arrive at the airport, transfer to your hotel, and enjoy a welcome dinner. Afternoon walking tour of the historic city center." },
    { day: 2, title: "Mountain Hike & Local Village", details: "A full-day guided hike through scenic mountain trails, followed by a visit to a local village to experience their culture." },
    { day: 3, title: "Coastal Drive & Beach Relaxation", details: "Drive along the stunning coastline, stopping at viewpoints. Spend the afternoon relaxing on a beautiful sandy beach." },
    { day: 4, title: "Departure", details: "Enjoy a final breakfast before transferring to the airport for your departure." },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((item, index) => (
          <details key={index} className="group p-4 bg-white rounded-lg border shadow-sm" open={index === 0}>
            <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center">
              Day {item.day}: {item.title}
              <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-2 text-gray-600 leading-relaxed">{item.details}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ItinerarySection;