import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Search, 
  Filter,
  Clock,
  ChevronDown,
  Heart
} from 'lucide-react';

const tours = [
  {
    id: '1',
    title: "Barcelona City Explorer",
    location: "Barcelona, Spain",
    price: 850,
    duration: "5 Days",
    groupSize: "14+",
    rating: 4.8,
    reviewCount: 127,
    image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Discover the vibrant culture and stunning architecture of Barcelona with our expert local guides.",
    category: "Cultural",
    featured: true
  },
  {
    id: '2',
    title: "Prague Castle & Old Town",
    location: "Prague, Czech Republic", 
    price: 650,
    duration: "4 Days",
    groupSize: "12+",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.pexels.com/photos/161901/prague-czech-republic-city-architecture-161901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Experience the fairy-tale charm of Prague's historic castle and medieval old town.",
    category: "Historical",
    featured: true
  },
  {
    id: '3',
    title: "Santorini Sunset Adventure",
    location: "Santorini, Greece",
    price: 1200,
    duration: "6 Days", 
    groupSize: "10+",
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Watch breathtaking sunsets and explore the iconic white-washed villages of Santorini.",
    category: "Romantic"
  },
  {
    id: '4',
    title: "Tokyo Cultural Immersion",
    location: "Tokyo, Japan",
    price: 1450,
    duration: "7 Days",
    groupSize: "8+",
    rating: 4.9,
    reviewCount: 203,
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Immerse yourself in Japanese culture, from ancient temples to modern city life.",
    category: "Cultural"
  },
  {
    id: '5',
    title: "Swiss Alps Adventure",
    location: "Interlaken, Switzerland",
    price: 1800,
    duration: "8 Days",
    groupSize: "12+",
    rating: 4.8,
    reviewCount: 94,
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Experience the majestic Swiss Alps with hiking, scenic railways, and mountain adventures.",
    category: "Adventure"
  },
  {
    id: '6',
    title: "Bali Temple & Beach",
    location: "Bali, Indonesia",
    price: 950,
    duration: "6 Days",
    groupSize: "16+",
    rating: 4.6,
    reviewCount: 178,
    image: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Discover ancient temples, pristine beaches, and rich Balinese culture.",
    category: "Exotic"
  }
];

const categories = ["All", "Cultural", "Historical", "Romantic", "Adventure", "Exotic"];

const TourCard = ({ tour }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        {/* Heart Icon */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white/90 transition-colors duration-200 shadow-md"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
          />
        </button>

        {/* Featured Badge */}
        {tour.featured && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-400 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
            Featured
          </span>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
          <span className="text-xl font-bold text-gray-800">${tour.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">{tour.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">{tour.rating}</span>
            <span className="text-xs text-gray-500">({tour.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>{tour.groupSize}</span>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {tour.category}
          </span>
        </div>

        {/* Book Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-200 hover:shadow-md">
          Book Now
        </button>
      </div>
    </div>
  );
};

const TourPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.featured ? -1 : 1; // Default: Featured first
  });

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Logic load more can be added here
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div 
        className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Explore the World</h1>
          <p className="text-lg sm:text-xl opacity-90">Discover amazing destinations with us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Sidebar - Filters */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <Filter className="w-6 h-6 text-blue-600" />
                <span>Filter Tours</span>
              </h3>

              {/* Search */}
              <div className="mb-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tours..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                    <option>Select destination</option>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>Americas</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Month */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white">
                    <option>Select month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="px-2">
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  {["Romantic", "Exotic", "Vacation"].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-200">
                  Apply Filters
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                Showing {sortedTours.length} of {tours.length} tours
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More Tours'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPage;