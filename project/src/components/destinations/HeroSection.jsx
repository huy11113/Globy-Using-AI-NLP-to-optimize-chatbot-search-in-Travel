import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          Popular Travel Destinations
        </h1>
        <p className="text-lg sm:text-xl opacity-90">
          Explore top-rated destinations across continents to inspire your next adventure
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
