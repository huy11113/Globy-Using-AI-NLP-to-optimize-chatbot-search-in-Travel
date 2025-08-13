import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '@/api/admin';
import { getPostById } from '@/api/blog'; // Cần tạo hàm này trong api/blog.js
import { Save, ArrowLeft, Loader2 } from 'lucide-react';

const AdminBlogFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    
    const [formData, setFormData] = useState({ title: '', category: '', imageUrl: '', excerpt: '', content: '', author: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchPost = async () => {
                const result = await getPostById(id);
                if (result.success) setFormData(result.data);
            };
            fetchPost();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const result = isEditing ? await updatePost(id, formData) : await createPost(formData);
        setIsLoading(false);
        if (result.success) {
            navigate('/admin/blog');
        } else {
            alert(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{isEditing ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h1>
            
            <div className="bg-white p-8 rounded-xl border shadow-sm space-y-4">
                 <input name="title" value={formData.title} onChange={handleChange} placeholder="Tiêu đề" required className="w-full text-2xl font-bold p-2 border-b focus:outline-none" />
                 <input name="author" value={formData.author} onChange={handleChange} placeholder="Tác giả" required className="w-full p-2 border rounded-md" />
                 <input name="category" value={formData.category} onChange={handleChange} placeholder="Chuyên mục" required className="w-full p-2 border rounded-md" />
                 <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Link ảnh đại diện" required className="w-full p-2 border rounded-md" />
                 <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Tóm tắt ngắn..." required rows="3" className="w-full p-2 border rounded-md"></textarea>
                 <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Nội dung đầy đủ..." required rows="10" className="w-full p-2 border rounded-md"></textarea>
            </div>

            <div className="flex justify-end gap-4">
                 <button type="button" onClick={() => navigate('/admin/blog')} className="btn secondary__btn">Hủy</button>
                 <button type="submit" disabled={isLoading} className="btn primary__btn flex items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isEditing ? 'Lưu' : 'Đăng bài'}
                </button>
            </div>
        </form>
    );
};

export default AdminBlogFormPage;