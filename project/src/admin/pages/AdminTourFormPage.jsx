import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTourDetail from '@/hooks/useTourDetail';
import useDestinations from '@/hooks/useDestinations';
import { createTour, updateTour } from '@/api/admin';
import { Plus, Trash2 } from 'lucide-react';

// Component con cho các input lặp lại
const FormInput = ({ label, name, value, onChange, type = 'text', required = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type={type} name={name} id={name} value={value || ''} onChange={onChange} required={required} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
    </div>
);

const AdminTourFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const { tour: existingTour, loading: loadingTour } = useTourDetail(id);
    const { destinations, loading: loadingDestinations } = useDestinations();

    const [tourData, setTourData] = useState({
        title: '', city: '', description: '', destinationId: '', price: 0,
        duration: '', image: '', featured: false, images: [], startLocation: '',
        endLocation: '', included: [], excluded: [], tags: [], category: '',
        departures: [], itinerary: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Các state tạm để thêm item vào mảng
    const [tempIncluded, setTempIncluded] = useState('');
    const [tempExcluded, setTempExcluded] = useState('');
    const [tempTag, setTempTag] = useState('');
    const [tempImage, setTempImage] = useState('');

    useEffect(() => {
        if (isEditing && existingTour) {
            setTourData({
                ...existingTour,
                destinationId: existingTour.destination?._id || '',
            });
        }
    }, [isEditing, existingTour]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTourData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleArrayChange = (setter, value, field) => {
        if (!value.trim()) return;
        setTourData(prev => ({ ...prev, [field]: [...prev[field], value] }));
        setter('');
    };

    const handleRemoveFromArray = (index, field) => {
        setTourData(prev => ({...prev, [field]: prev[field].filter((_, i) => i !== index)}));
    };
    
    const handleItineraryChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItinerary = [...tourData.itinerary];
        updatedItinerary[index][name] = name === 'day' ? parseInt(value) : value;
        setTourData(prev => ({...prev, itinerary: updatedItinerary}));
    };
    
    const addItineraryItem = () => {
        setTourData(prev => ({...prev, itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', details: '' }]}));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const result = isEditing ? await updateTour(id, tourData) : await createTour(tourData);
        setIsLoading(false);
        if (result.success) {
            alert(result.message);
            navigate('/admin/tours');
        } else {
            setError(result.message || 'Đã có lỗi xảy ra.');
        }
    };

    if (loadingTour || loadingDestinations) return <div className="text-center p-8">Đang tải dữ liệu...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">{isEditing ? `Chỉnh sửa Tour` : 'Tạo Tour mới'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border space-y-8">
                
                {/* --- Phần thông tin cơ bản --- */}
                <fieldset className="p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Thông tin cơ bản</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        <FormInput label="Tên Tour" name="title" value={tourData.title} onChange={handleChange} required />
                        <FormInput label="Thành phố" name="city" value={tourData.city} onChange={handleChange} required />
                        <div>
                            <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">Địa điểm (Châu lục)</label>
                            <select name="destinationId" id="destinationId" value={tourData.destinationId} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" required>
                                <option value="">-- Chọn địa điểm --</option>
                                {destinations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                            </select>
                        </div>
                        <FormInput label="Giá ($)" name="price" value={tourData.price} onChange={handleChange} type="number" required />
                        <FormInput label="Thời lượng" name="duration" value={tourData.duration} onChange={handleChange} required />
                        <FormInput label="Category" name="category" value={tourData.category} onChange={handleChange} />
                        <FormInput label="Điểm khởi hành" name="startLocation" value={tourData.startLocation} onChange={handleChange} />
                        <FormInput label="Điểm kết thúc" name="endLocation" value={tourData.endLocation} onChange={handleChange} />
                    </div>
                </fieldset>

                {/* --- Phần Hình ảnh --- */}
                <fieldset className="p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Hình ảnh</legend>
                    <div className="p-2 space-y-4">
                        <FormInput label="Link ảnh đại diện" name="image" value={tourData.image} onChange={handleChange} required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Thêm các ảnh khác (gallery)</label>
                            <div className="flex mt-1">
                                <input type="text" value={tempImage} onChange={e => setTempImage(e.target.value)} className="flex-grow border-gray-300 rounded-l-md shadow-sm" />
                                <button type="button" onClick={() => handleArrayChange(setTempImage, tempImage, 'images')} className="px-4 py-2 bg-gray-200 rounded-r-md"><Plus/></button>
                            </div>
                            <div className="mt-2 space-y-1">
                                {tourData.images?.map((item, index) => <div key={index} className="flex justify-between items-center text-sm p-1 bg-gray-50 rounded"><span>{item}</span><button type="button" onClick={() => handleRemoveFromArray(index, 'images')}><Trash2 size={14} className="text-red-500"/></button></div>)}
                            </div>
                        </div>
                    </div>
                </fieldset>
                
                {/* --- Lịch trình --- */}
                <fieldset className="p-4 border rounded-md">
                    <legend className="px-2 font-semibold">Lịch trình chi tiết</legend>
                    <div className="p-2 space-y-4">
                        {tourData.itinerary?.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 border rounded-md relative">
                                <input type="number" name="day" placeholder="Ngày số" value={item.day} onChange={e => handleItineraryChange(index, e)} className="border-gray-300 rounded-md" />
                                <input type="text" name="title" placeholder="Tiêu đề" value={item.title} onChange={e => handleItineraryChange(index, e)} className="border-gray-300 rounded-md" />
                                <textarea name="details" placeholder="Chi tiết" value={item.details} onChange={e => handleItineraryChange(index, e)} rows="2" className="md:col-span-3 border-gray-300 rounded-md"></textarea>
                                <button type="button" onClick={() => handleRemoveFromArray(index, 'itinerary')} className="absolute top-1 right-1 p-1 bg-red-100 rounded-full"><Trash2 size={14} className="text-red-500"/></button>
                            </div>
                        ))}
                        <button type="button" onClick={addItineraryItem} className="w-full py-2 border-2 border-dashed rounded-md text-gray-500 hover:bg-gray-50">Thêm mục lịch trình</button>
                    </div>
                </fieldset>
                
                 {/* ... (Các phần khác như Included, Excluded, Tags bạn có thể thêm tương tự) ... */}

                <div className="flex items-center">
                    <input type="checkbox" name="featured" id="featured" checked={tourData.featured} onChange={handleChange} className="h-4 w-4 text-sky-600 border-gray-300 rounded" />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Đánh dấu là tour nổi bật</label>
                </div>
                
                {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-sm text-center">{error}</p>}
                <div className="pt-4 flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/admin/tours')} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300">Hủy</button>
                    <button type="submit" disabled={isLoading} className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600 disabled:bg-sky-300">{isLoading ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo Tour')}</button>
                </div>
            </form>
        </div>
    );
};

export default AdminTourFormPage;