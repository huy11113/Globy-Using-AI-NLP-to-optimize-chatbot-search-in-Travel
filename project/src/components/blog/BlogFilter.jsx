import React from 'react';

const BlogFilter = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
}) => {
  return (
    <section className="mb-12">
      {/* Thanh tìm kiếm */}
      <div className="relative w-full max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <svg
          className="w-6 h-6 text-gray-400 absolute top-1/2 right-4 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      {/* Bộ lọc danh mục */}
      <div className="flex justify-center flex-wrap gap-3 md:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BlogFilter;
