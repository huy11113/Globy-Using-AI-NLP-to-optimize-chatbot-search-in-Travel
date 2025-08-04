import React from 'react';

const StatCard = ({ icon, title, value, change, changeType }) => {
    const isPositive = changeType === 'increase';

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
            <div className="p-4 bg-sky-100 text-sky-500 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                {change && (
                    <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '▲' : '▼'} {change} so với tháng trước
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;