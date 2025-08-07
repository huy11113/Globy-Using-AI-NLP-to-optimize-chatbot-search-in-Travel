import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTour, updateTour } from '@/api/admin';
import useTourDetail from '@/hooks/useTourDetail';
import useDestinations from '@/hooks/useDestinations';

// Icons
import { 
    Plus, Trash2, Calendar, DollarSign, Clock, MapPin, Image as ImageIcon, 
    ClipboardList, Check, X, Tag, GripVertical, Save, ArrowLeft, 
    Loader2 
} from 'lucide-react';


// --- CÁC COMPONENT CON ---

// Component Section chung cho form
const FormSection = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-4 mb-6">{title}</h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

// Component Input tùy chỉnh
const FormInput = ({ label, name, value, onChange, type = 'text', required = false, icon, placeholder, as = 'input' }) => {
    const InputComponent = as;
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {icon}
                </div>
                <InputComponent
                    type={type} name={name} id={name} value={value || ''} onChange={onChange} required={required}
                    placeholder={placeholder || `Nhập ${label.toLowerCase()}...`}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows={as === 'textarea' ? 4 : undefined}
                />
            </div>
        </div>
    );
};

// Component quản lý danh sách (VD: Dịch vụ bao gồm/không bao gồm)
const ArrayInputManager = ({ label, field, tourData, setTourData, icon, placeholder }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (!inputValue.trim()) return;
        setTourData(prev => ({ ...prev, [field]: [...(prev[field] || []), inputValue] }));
        setInputValue('');
    };

    const handleRemoveItem = (index) => {
        setTourData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
            <div className="flex">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow border-gray-300 rounded-l-lg shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
                />
                <button type="button" onClick={handleAddItem} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300">
                    <Plus size={20} />
                </button>
            </div>
            <div className="mt-3 space-y-2">
                {tourData[field]?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                            {icon}
                            <span className="truncate w-64" title={item}>{item}</span>
                        </div>
                        <button type="button" onClick={() => handleRemoveItem(index)} className="p-1 hover:bg-red-100 rounded-full">
                            <Trash2 size={16} className="text-red-500"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Component quản lý lịch trình
const ItineraryManager = ({ tourData, setTourData }) => {
    const handleItineraryChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItinerary = [...tourData.itinerary];
        updatedItinerary[index] = { ...updatedItinerary[index], [name]: name === 'day' ? parseInt(value) || '' : value };
        setTourData(prev => ({ ...prev, itinerary: updatedItinerary }));
    };
    
    const addItineraryItem = () => {
        setTourData(prev => ({ ...prev, itinerary: [...prev.itinerary, { day: (prev.itinerary.length || 0) + 1, title: '', details: '' }] }));
    };

    const removeItineraryItem = (index) => {
        setTourData(prev => ({ ...prev, itinerary: prev.itinerary.filter((_, i) => i !== index) }));
    };
    
    return (
         <div className="space-y-4">
            {tourData.itinerary?.map((item, index) => (
                <div key={index} className="grid grid-cols-1 gap-4 p-4 border rounded-lg relative bg-white">
                    <div className="flex items-center gap-4">
                         <GripVertical className="text-gray-400 cursor-grab flex-shrink-0" />
                         <input type="number" name="day" placeholder="Ngày" value={item.day} onChange={e => handleItineraryChange(index, e)} className="w-20 border-gray-300 rounded-md" />
                         <input type="text" name="title" placeholder="Tiêu đề ngày..." value={item.title} onChange={e => handleItineraryChange(index, e)} className="flex-grow border-gray-300 rounded-md" />
                    </div>
                    <textarea name="details" placeholder="Chi tiết lịch trình..." value={item.details} onChange={e => handleItineraryChange(index, e)} rows="3" className="border-gray-300 rounded-md"></textarea>
                    <button type="button" onClick={() => removeItineraryItem(index)} className="absolute top-2 right-2 p-1.5 bg-red-100 rounded-full hover:bg-red-200">
                        <Trash2 size={16} className="text-red-500"/>
                    </button>
                </div>
            ))}
            <button type="button" onClick={addItineraryItem} className="w-full py-2.5 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2">
                <Plus size={18}/> Thêm mục lịch trình
            </button>
        </div>
    );
};

// --- COMPONENT CHÍNH ---
const AdminTourFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const { tour: existingTour, loading: loadingTour } = useTourDetail(id);
    const { destinations, loading: loadingDestinations } = useDestinations();

    const [tourData, setTourData] = useState({
        title: '', city: '', description: '', destinationId: '', price: '',
        duration: '', image: '', featured: false, images: [], startLocation: '',
        endLocation: '', included: [], excluded: [], tags: [], category: '',
        departures: [{ date: '', seatsAvailable: '' }], itinerary: [{ day: 1, title: '', details: '' }],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && existingTour) {
            setTourData({
                ...existingTour,
                price: existingTour.price || '',
                destinationId: existingTour.destination?._id || '',
                departures: existingTour.departures?.length ? existingTour.departures.map(d => ({...d, date: d.date.split('T')[0]})) : [{ date: '', seatsAvailable: '' }],
                itinerary: existingTour.itinerary?.length ? existingTour.itinerary : [{ day: 1, title: '', details: '' }],
            });
        }
    }, [isEditing, existingTour]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTourData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    // Skeleton UI
    if (loadingTour || loadingDestinations) return (
        <div className="space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-md w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                    <div className="h-48 bg-gray-200 rounded-xl"></div>
                </div>
                <div className="lg:col-span-1 h-96 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">{isEditing ? `Chỉnh sửa Tour` : 'Tạo Tour mới'}</h1>
                 <button type="button" onClick={() => navigate('/admin/tours')} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
                    <ArrowLeft size={18} /> Quay lại danh sách
                </button>
            </div>

            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p>{error}</p></div>}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* --- CỘT TRÁI (NỘI DUNG CHÍNH) --- */}
                <div className="lg:col-span-2 space-y-8">
                    <FormSection title="Thông tin cơ bản">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Tên Tour" name="title" value={tourData.title} onChange={handleChange} required icon={<Tag size={18} className="text-gray-400" />} />
                            <FormInput label="Thành phố" name="city" value={tourData.city} onChange={handleChange} required icon={<MapPin size={18} className="text-gray-400" />} />
                            <div>
                                <label htmlFor="destinationId" className="block text-sm font-semibold text-gray-600 mb-1.5">Địa điểm (Châu lục)</label>
                                <select name="destinationId" id="destinationId" value={tourData.destinationId} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500" required>
                                    <option value="">-- Chọn địa điểm --</option>
                                    {destinations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                                </select>
                            </div>
                            <FormInput label="Loại hình (Category)" name="category" value={tourData.category} onChange={handleChange} icon={<Tag size={18} className="text-gray-400" />} />
                            <FormInput label="Điểm khởi hành" name="startLocation" value={tourData.startLocation} onChange={handleChange} icon={<MapPin size={18} className="text-gray-400" />} />
                            <FormInput label="Điểm kết thúc" name="endLocation" value={tourData.endLocation} onChange={handleChange} icon={<MapPin size={18} className="text-gray-400" />} />
                         </div>
                         <FormInput as="textarea" label="Mô tả Tour" name="description" value={tourData.description} onChange={handleChange} icon={<ClipboardList size={18} className="text-gray-400" />} />
                    </FormSection>

                    <FormSection title="Hình ảnh">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <FormInput label="Ảnh đại diện (URL)" name="image" value={tourData.image} onChange={handleChange} required icon={<ImageIcon size={18} className="text-gray-400" />} />
                            <ArrayInputManager label="Thư viện ảnh (URL)" field="images" tourData={tourData} setTourData={setTourData} icon={<ImageIcon size={16} className="text-gray-400" />} placeholder="Thêm link ảnh và nhấn Enter..." />
                        </div>
                    </FormSection>

                    <FormSection title="Lịch trình chi tiết">
                        <ItineraryManager tourData={tourData} setTourData={setTourData} />
                    </FormSection>
                </div>

                {/* --- CỘT PHẢI (THÔNG TIN PHỤ) --- */}
                <div className="lg:col-span-1 space-y-8 lg:sticky top-24">
                    <FormSection title="Giá & Thời lượng">
                         {/* ✅ THAY ĐỔI TẠI ĐÂY */}
                         <FormInput label="Giá (VNĐ)" name="price" type="number" value={tourData.price} onChange={handleChange} required icon={<DollarSign size={18} className="text-gray-400" />} />
                         <FormInput label="Thời lượng" name="duration" value={tourData.duration} onChange={handleChange} required icon={<Clock size={18} className="text-gray-400" />} />
                         <div className="flex items-center pt-2">
                            <input type="checkbox" name="featured" id="featured" checked={tourData.featured} onChange={handleChange} className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500" />
                            <label htmlFor="featured" className="ml-3 block text-sm font-semibold text-gray-700">Đánh dấu là tour nổi bật</label>
                        </div>
                    </FormSection>
                     <FormSection title="Dịch vụ">
                        <ArrayInputManager label="Bao gồm" field="included" tourData={tourData} setTourData={setTourData} icon={<Check size={16} className="text-green-500" />} placeholder="Thêm dịch vụ bao gồm..." />
                        <ArrayInputManager label="Không bao gồm" field="excluded" tourData={tourData} setTourData={setTourData} icon={<X size={16} className="text-red-500" />} placeholder="Thêm dịch vụ không bao gồm..." />
                    </FormSection>
                </div>
            </div>

            {/* --- THANH HÀNH ĐỘNG CUỐI TRANG --- */}
             <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 border-t z-10 -mx-8 -mb-8">
                <div className="max-w-7xl mx-auto flex justify-end gap-4 px-8">
                    <button type="button" onClick={() => navigate('/admin/tours')} className="bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">Hủy</button>
                    <button type="submit" disabled={isLoading} className="bg-sky-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        {isLoading ? 'Đang lưu...' : (isEditing ? 'Lưu thay đổi' : 'Tạo Tour')}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AdminTourFormPage;