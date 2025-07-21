import React from 'react';
import Hero from '../components/home/hero/Hero';
import TopDestinations from '../components/home/TopDestinations/index';
import HotTours from '../components/home/tours/HotTours.jsx';
import Services from '../components/home/Services';
import About from '../components/home/Testimonials.jsx';
import IntroSection from '../components/home/intro/IntroSection';
import BlogSection from '../components/home/BlogSection';
function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <IntroSection />
      <TopDestinations />
      <HotTours />
      <About />
      <Services />
      <BlogSection />
      {/* Có thể thêm các phần khác nếu cần */}
    </div>
  );
}

export default Home;