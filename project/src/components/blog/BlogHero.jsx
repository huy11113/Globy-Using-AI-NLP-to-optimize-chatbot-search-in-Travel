import React from 'react';

const BlogHero = () => {
  return (
    <div 
      className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=compress&cs=tinysrgb&w=1920')`
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          Travel Blog & Stories
        </h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
          Discover inspiring travel stories, tips, and destinations around the world.
        </p>
      </div>
    </div>
  );
};

export default BlogHero;
