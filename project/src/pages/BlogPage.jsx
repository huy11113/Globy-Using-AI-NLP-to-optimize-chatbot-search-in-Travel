import React, { useState, useEffect } from 'react';
import BlogHero from '../components/blog/BlogHero';
import BlogFilter from '../components/blog/BlogFilter';
import BlogGrid from '../components/blog/BlogGrid';
import { getAllPosts } from '@/api/blog'; // ✅ Sử dụng hàm gọi API

const BlogPage = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const result = await getAllPosts();
            if (result.success) {
                // Sắp xếp bài viết mới nhất lên đầu
                const sortedPosts = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllPosts(sortedPosts);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    // Lấy danh sách danh mục duy nhất từ dữ liệu động
    const categories = ['Tất cả', ...new Set(allPosts.map(post => post.category))];

    // Lọc dữ liệu bài viết
    const filteredPosts = allPosts.filter(post => {
        const matchesCategory = activeCategory === 'Tất cả' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <BlogHero />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <BlogFilter 
                  categories={categories}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
                {loading ? (
                    <div className="text-center py-16">Đang tải bài viết...</div>
                ) : (
                    <BlogGrid posts={filteredPosts} />
                )}
            </main>
        </div>
    );
};

export default BlogPage;