// src/pages/TourList.jsx

import React, { useState } from 'react';

// Import hooks and components với đường dẫn tương đối chính xác
import useTours from '../hooks/useTours';
import Header from '../components/home/Header'; // <-- SỬA: Import đúng tệp Header.jsx
import SearchFilter from '../components/tours/SearchFilter';
import TourListHeader from '../components/tours/TourListHeader';
import TourGrid from '../components/tours/TourGrid';

const TourList = () => {
  const [filters, setFilters] = useState({
    destination: '',
    sort: '-createdAt',
  });

  const { tours, loading, error } = useTours(filters);

  return (
    <div>
      {/* SỬA: Sử dụng component Header đã import.
          Component Header của bạn có thể không nhận prop "title".
          Đây là cách gọi chung, bạn có thể cần điều chỉnh lại nếu Header của bạn phức tạp hơn.
      */}
      <Header />

      <div className="py-8 text-center bg-gray-100">
        <h1 className="text-4xl font-bold">Tất Cả Tours</h1>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          <aside className="lg:col-span-1">
            <SearchFilter onFilterChange={setFilters} />
          </aside>

          <main className="lg:col-span-3">
            <TourListHeader
              loading={loading}
              tourCount={tours.length}
              onSortChange={setFilters}
            />
            <TourGrid
              loading={loading}
              error={error}
              tours={tours}
            />
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default TourList;