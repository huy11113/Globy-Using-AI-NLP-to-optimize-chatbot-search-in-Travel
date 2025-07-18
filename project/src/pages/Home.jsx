import React from 'react';
import Hero from '../components/home/hero/Hero';
import TopDestinations from '../components/home/TopDestinations/index';
import HotTours from '../components/home/tours/HotTours.jsx';
import Services from '../components/home/Services';
import About from '../components/common/About';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <TopDestinations />
      <HotTours />
      <Services />
      <About />
    </div>
  );
}

export default Home;