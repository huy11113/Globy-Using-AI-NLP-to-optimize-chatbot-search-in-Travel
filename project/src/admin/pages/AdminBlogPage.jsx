import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, deletePost } from '@/api/admin';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';

const AdminBlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const result = await getAllPosts();
            if (result.success) {
                setPosts(result.data);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id, title) => {
        if (window.confirm(`Bạn có chắc muốn xóa bài viết "${title}"?`)) {
            const result = await deletePost(id);
            if (result.success) {
                setPosts(current => current.filter(p => p.id !== id));
            } else {
                alert(`Lỗi: ${result.message}`);
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Blog</h1>
                <Link to="/admin/blog/new" className="btn primary__btn flex items-center gap-2">
                    <PlusCircle size={20} /> Viết bài mới
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-xl border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tiêu đề</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tác giả</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Ngày đăng</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td className="px-6 py-4 font-semibold">{post.title}</td>
                                    <td className="px-6 py-4">{post.author}</td>
                                    <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/admin/blog/edit/${post.id}`} className="p-2 text-sky-600 hover:bg-sky-100 rounded-full"><Edit size={18} /></Link>
                                            <button onClick={() => handleDelete(post.id, post.title)} className="p-2 text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogPage;