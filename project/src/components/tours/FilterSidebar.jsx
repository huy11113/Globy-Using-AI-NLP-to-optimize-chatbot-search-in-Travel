import React from 'react';
import { Search, Star, RotateCcw, Filter as FilterIcon } from 'lucide-react';

// --- COMPONENT CON ---

// Component Section chung
const FilterSection = ({ title, children, className = '' }) => (
    <div className={`py-6 border-b border-gray-200 ${className}`}>
        <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">{title}</h4>
        {children}
    </div>
);

// Nút bấm cho Checkbox (chọn nhiều)
const CheckboxButton = ({ label, name, value, checked, onChange }) => (
    <>
        <input
            type="checkbox"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
        />
        <label
            htmlFor={`${name}-${value}`}
            className={`px-4 py-2 text-sm font-semibold border rounded-full cursor-pointer transition-all duration-200 
                ${checked 
                    ? 'bg-sky-500 border-sky-500 text-white shadow-md' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
        >
            {label}
        </label>
    </>
);

// Nút bấm cho Radio (chọn một)
const RadioButton = ({ label, name, value, checked, onChange }) => (
     <>
        <input
            type="radio"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
        />
        <label
            htmlFor={`${name}-${value}`}
            className={`w-full text-center px-4 py-2.5 text-sm font-semibold border rounded-full cursor-pointer transition-all duration-200 
                ${checked 
                    ? 'bg-sky-500 border-sky-500 text-white shadow-md' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
        >
            {label}
        </label>
    </>
);


// --- COMPONENT CHÍNH ---
const FilterSidebar = ({ filters, onFilterChange, onResetFilters, loading }) => {
  
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'range' && value === '0' ? '' : value;
        onFilterChange(name, finalValue);
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const currentValues = filters[name] ? filters[name].split(',') : [];
        let newValues = checked
            ? [...currentValues, value]
            : currentValues.filter(item => item !== value);
        onFilterChange(name, newValues.join(','));
    };

    const hasActiveFilters = Object.values(filters).some(value => value && value.length > 0 && value !== '0');

    // Dữ liệu mẫu
    const durationOptions = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
    const categoryOptions = ["Adventure", "Cultural", "Beach", "Family", "Relaxation"];

    // Skeleton khi đang tải
    if (loading) {
        return (
            <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-24">
                <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 space-y-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                    </div>
                     <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                        <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                    </div>
                     <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                        <div className="h-16 bg-gray-200 rounded-md w-full"></div>
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-24 h-fit">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><FilterIcon size={20}/> Bộ lọc</h3>
                    {hasActiveFilters && (
                        <button onClick={onResetFilters} className="flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors">
                            <RotateCcw className="h-4 w-4" /> Reset
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
                            <span className="text-sm text-gray-500">$0</span>
                            <span className="px-3 py-1 text-sm font-bold text-sky-800 bg-sky-100 rounded-full">
                                Lên đến ${filters.maxPrice || '5000+'}
                            </span>
                            <span className="text-sm text-gray-500">$5000</span>
                        </div>
                        <input
                            type="range" id="maxPrice" name="maxPrice" min="0" max="5000" step="100"
                            value={filters.maxPrice || 0} onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb"
                        />
                    </FilterSection>

                    <FilterSection title="Đánh giá">
                        <div className="flex justify-center bg-gray-50 p-2 rounded-lg gap-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <React.Fragment key={rating}>
                                    <input type="radio" id={`rating-${rating}`} name="minRating" value={rating} checked={Number(filters.minRating) === rating} onChange={handleInputChange} className="sr-only peer"/>
                                    <label htmlFor={`rating-${rating}`} className="cursor-pointer text-gray-300 peer-checked:text-yellow-400 hover:text-yellow-300 transition-all duration-200 peer-hover:scale-125" title={`Từ ${rating} sao trở lên`}>
                                        <Star className="w-8 h-8 fill-current" />
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Thời lượng tour">
                         <div className="flex flex-wrap gap-3">
                            {durationOptions.map(duration => (
                                <CheckboxButton key={duration} label={duration} name="duration" value={duration} onChange={handleCheckboxChange} checked={(filters.duration || '').includes(duration)} />
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Loại hình tour" className="border-b-0">
                        <div className="flex flex-col gap-3">
                            {categoryOptions.map(category => (
                                <RadioButton key={category} label={category} name="category" value={category} onChange={handleInputChange} checked={filters.category === category} />
                            ))}
                        </div>
                    </FilterSection>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;