// src/pages/BlogPage.jsx
import React, { useState } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogFilter from '../components/blog/BlogFilter';
import BlogGrid from '../components/blog/BlogGrid';
import { postsData } from '../data/blogData';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // Danh sách danh mục duy nhất
  const categories = ['Tất cả', ...new Set(postsData.map(post => post.category))];

  // Lọc dữ liệu bài viết
  const filteredPosts = postsData.filter(post => {
    const matchesCategory = activeCategory === 'Tất cả' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero đặt ngoài main để giống Destinations */}
      <BlogHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <BlogFilter 
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <BlogGrid posts={filteredPosts} />
      </main>
    </div>
  );
};

export default BlogPage;
