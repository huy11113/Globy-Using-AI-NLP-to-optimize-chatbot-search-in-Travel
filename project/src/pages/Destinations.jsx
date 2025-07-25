import React, { useState } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/destinations/HeroSection';
import SectionTitle from '../components/destinations/SectionTitle';
import DestinationCard from '../components/destinations/DestinationCard';
import useDestinations from '../hooks/useDestinations';

// Skeleton loading
const DestinationCardSkeleton = ({ className }) => (
  <div className={`bg-gray-200 rounded-xl animate-pulse ${className}`} />
);

const Destinations = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { destinations, loading, error } = useDestinations();

  const renderGrid = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <DestinationCardSkeleton key={index} className="h-96 w-full" />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500">Could not load destinations.</p>;
    }

    if (destinations.length === 0) {
      return <p className="text-center text-gray-500">No destinations available.</p>;
    }

    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {destinations.map((destination, index) => (
          <motion.div
            key={destination._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="w-full"
          >
            <DestinationCard
              destination={destination}
              index={index}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle
          subtitle="Explore Destinations"
          title="Top Attractive\Destinations"
          description="Discover the world's most stunning destinations with specially designed tours"
        />
        <div className="mb-16">{renderGrid()}</div>
      </div>
    </div>
  );
};

export default Destinations;