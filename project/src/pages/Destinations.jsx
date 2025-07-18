import React, { useState } from 'react';
import HeroSection from '../components/destinations/HeroSection';
import SectionTitle from '../components/destinations/SectionTitle';
import DestinationCard from '../components/destinations/DestinationCard';
import { destinations } from '../data/destinations';


const Destinations = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Title */}
        <SectionTitle 
          subtitle="Khám phá điểm đến"
          title="Điểm đến hấp dẫn\nhàng đầu"
          description="Khám phá những điểm đến tuyệt vời nhất thế giới với các tour du lịch được thiết kế đặc biệt"
        />

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </div>

      </div>

    </div>
  );
};

export default Destinations;