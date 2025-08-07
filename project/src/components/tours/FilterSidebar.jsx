import React from 'react';
import { Search, Star, RotateCcw, Filter as FilterIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CÁC THÀNH PHẦN KHÔNG THAY ĐỔI ---

// Dữ liệu tĩnh được đưa ra ngoài để tránh re-render không cần thiết
const DURATION_OPTIONS = ["1-3 Ngày", "4-7 Ngày", "8-14 Ngày", "15+ Ngày"];
const CATEGORY_OPTIONS = ["Phiêu lưu", "Văn hóa", "Bãi biển", "Gia đình", "Nghỉ dưỡng"];
const MAX_PRICE = 100000000;
const PRICE_STEP = 1000000;

// Component Section chung
const FilterSection = ({ title, children, className = '' }) => (
    <div className={`py-6 ${className}`}>
        <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">{title}</h4>
        {children}
    </div>
);

// Component Skeleton UI
const SidebarSkeleton = () => (
    <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-24">
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
            <div className="space-y-4 border-t pt-6">
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="space-y-4 border-t pt-6">
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="space-y-4 border-t pt-6">
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-16 bg-gray-200 rounded-md w-full"></div>
            </div>
        </div>
    </aside>
);


// --- COMPONENT CHÍNH ĐÃ ĐƯỢC CẢI TIẾN ---
const FilterSidebar = ({ filters, onFilterChange, onResetFilters, loading }) => {
  
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'range' && value === '0' ? '' : value;
        onFilterChange(name, finalValue);
    };
    
    // Kiểm tra xem có bộ lọc nào đang được áp dụng không
    const hasActiveFilters = 
        filters.searchTerm || filters.maxPrice || filters.minRating || filters.category;

    if (loading) {
        return <SidebarSkeleton />;
    }

    return (
        <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-24 h-fit">
            <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FilterIcon size={20}/> Bộ lọc
                    </h3>
                    {hasActiveFilters && (
                        <button onClick={onResetFilters} className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors">
                            <RotateCcw className="h-4 w-4" /> Đặt lại
                        </button>
                    )}
                </div>

                <div className="divide-y divide-gray-200">
                    <FilterSection title="Từ khóa">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text" name="searchTerm" placeholder="Tên tour, địa điểm..."
                                value={filters.searchTerm || ''} onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            />
                        </div>
                    </FilterSection>

                    <FilterSection title="Khoảng giá">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">0đ</span>
                            <span className="px-3 py-1 text-sm font-bold text-sky-800 bg-sky-100 rounded-full">
                                Lên đến {new Intl.NumberFormat('vi-VN').format(filters.maxPrice || MAX_PRICE)}{filters.maxPrice ? 'đ' : '+'}
                            </span>
                        </div>
                        <input
                            type="range" id="maxPrice" name="maxPrice" min="0" max={MAX_PRICE} step={PRICE_STEP}
                            value={filters.maxPrice || 0} onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb"
                        />
                    </FilterSection>

                    <FilterSection title="Đánh giá">
                        <div className="flex justify-center bg-gray-50 p-2 rounded-lg gap-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <React.Fragment key={rating}>
                                    <input type="radio" id={`rating-${rating}`} name="minRating" value={rating} checked={Number(filters.minRating) === rating} onChange={handleInputChange} className="sr-only peer"/>
                                    <label htmlFor={`rating-${rating}`} className="cursor-pointer text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-300 transition-all duration-200" title={`Từ ${rating} sao trở lên`}>
                                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                            <Star className="w-8 h-8 fill-current" />
                                        </motion.div>
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Loại hình tour" className="border-b-0">
                        <div className="grid grid-cols-2 gap-3">
                            {CATEGORY_OPTIONS.map(category => (
                                <React.Fragment key={category}>
                                     <input
                                        type="radio" id={`category-${category}`} name="category"
                                        value={category} checked={filters.category === category} onChange={handleInputChange}
                                        className="sr-only peer"
                                    />
                                    <label
                                        htmlFor={`category-${category}`}
                                        className={`w-full text-center px-4 py-2.5 text-sm font-semibold border rounded-full cursor-pointer transition-all duration-200 
                                            peer-checked:bg-sky-500 peer-checked:border-sky-500 peer-checked:text-white peer-checked:shadow-md
                                            bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400
                                        `}
                                    >
                                        {category}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </FilterSection>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;