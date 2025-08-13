import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDestination, updateDestination } from '@/api/admin';
import useDestinationDetail from '@/hooks/useDestinationDetail';
import { Save, ArrowLeft, Loader2, Globe, FileText, Image as ImageIcon } from 'lucide-react';

const AdminDestinationFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    
    // Lấy dữ liệu cũ nếu đang ở chế độ chỉnh sửa
    const { destination: existingData, loading: loadingData } = useDestinationDetail(id);

    const [formData, setFormData] = useState({ name: '', continent: '', description: '', image: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && existingData) {
            setFormData(existingData);
        }
    }, [isEditing, existingData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const result = isEditing ? await updateDestination(id, formData) : await createDestination(formData);
        setIsLoading(false);
        if (result.success) {
            alert(isEditing ? 'Cập nhật thành công!' : 'Tạo mới thành công!');
            navigate('/admin/destinations');
        } else {
            setError(result.message || 'Đã có lỗi xảy ra.');
        }
    };

    if (loadingData) return <div>Đang tải dữ liệu...</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">{isEditing ? 'Chỉnh sửa Điểm đến' : 'Tạo Điểm đến mới'}</h1>
                <button type="button" onClick={() => navigate('/admin/destinations')} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                    <ArrowLeft size={18} /> Quay lại
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>}

            <div className="bg-white p-8 rounded-xl border shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5">Tên Điểm đến</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1.5">Châu lục</label>
                        <input name="continent" value={formData.continent} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Link ảnh đại diện</label>
                    <input name="image" value={formData.image} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Mô tả</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" className="w-full p-2 border rounded-md"></textarea>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" disabled={isLoading} className="btn primary__btn flex items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Save />}
                    {isLoading ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo mới')}
                </button>
            </div>
        </form>
    );
};

export default AdminDestinationFormPage;