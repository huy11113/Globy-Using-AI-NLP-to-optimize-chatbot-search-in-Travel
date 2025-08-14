import React from 'react';
import { Search, Star, RotateCcw, Filter as FilterIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CẤU HÌNH DỮ LIỆU TĨNH CHO BỘ LỌC ---
const PRICE_LEVELS = [
    { label: "Dưới 5 triệu", value: "0-5000000" },
    { label: "Từ 5 - 10 triệu", value: "5000000-10000000" },
    { label: "Từ 10 - 20 triệu", value: "10000000-20000000" },
    { label: "Trên 20 triệu", value: "20000000-Infinity" },
];

const RATING_OPTIONS = [1, 2, 3, 4, 5];

// --- COMPONENT CON ---
const FilterSection = ({ title, children, className = '' }) => (
    <div className={`py-6 ${className}`}>
        <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">{title}</h4>
        {children}
    </div>
);

// --- COMPONENT CHÍNH ĐÃ ĐƯỢC CẬP NHẬT ---
const FilterSidebar = ({ filters, onFilterChange, onResetFilters, loading }) => {

    const handleFilterClick = (name, value) => {
        // Nếu người dùng click lại vào lựa chọn đang active, hãy bỏ chọn nó
        const currentValue = filters[name];
        const newValue = currentValue === value ? '' : value;
        onFilterChange(name, newValue);
    };
    
    // Kiểm tra xem có bộ lọc nào đang được áp dụng không
    const hasActiveFilters = filters.searchTerm || filters.priceRange || filters.rating;

    if (loading) {
        // Có thể thêm component Skeleton UI ở đây nếu muốn
        return <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-24 h-fit animate-pulse"><div className="p-6 bg-gray-200 rounded-2xl h-96"></div></aside>;
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
                                value={filters.searchTerm || ''} 
                                onChange={(e) => onFilterChange('searchTerm', e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            />
                        </div>
                    </FilterSection>

                    <FilterSection title="Mức giá">
                        <div className="grid grid-cols-2 gap-3">
                            {PRICE_LEVELS.map(level => (
                                <button
                                    key={level.value}
                                    onClick={() => handleFilterClick('priceRange', level.value)}
                                    className={`w-full text-center px-2 py-2.5 text-sm font-semibold border rounded-full cursor-pointer transition-all duration-200 
                                        ${filters.priceRange === level.value
                                            ? 'bg-sky-500 border-sky-500 text-white shadow-md'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                        }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Đánh giá" className="border-b-0">
                        <div className="flex items-center justify-center bg-gray-50 p-2 rounded-lg gap-2">
                            {RATING_OPTIONS.map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleFilterClick('rating', rating.toString())}
                                    className={`w-10 h-10 flex items-center justify-center font-bold rounded-full transition-all duration-200
                                        ${Number(filters.rating) === rating
                                            ? 'bg-yellow-400 text-white ring-2 ring-yellow-200'
                                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                        }`}
                                    title={`${rating} sao`}
                                >
                                    {rating}
                                    <Star className="w-4 h-4 ml-1 fill-current" />
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;