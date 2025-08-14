import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

// Import các component
import FilterSidebar from '../components/tours/FilterSidebar';
import SortBar from '../components/tours/SortBar';
import TourGrid from '../components/tours/TourGrid';
import TourListHeader from '../components/tours/TourListHeader';
import Pagination from '../components/common/Pagination';
import useTours from '../hooks/useTours';

const TourList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE_LIMIT = 9;

  // --- State Management ---
  // ✅ ĐÃ CẬP NHẬT: Thay đổi state để khớp với bộ lọc mới
  const [filters, setFilters] = useState({
    searchTerm: searchParams.get('search') || '',
    sortBy: searchParams.get('sort') || '-createdAt',
    priceRange: searchParams.get('priceRange') || '',
    rating: searchParams.get('rating') || '',
  });
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  // --- Data Fetching ---
  const { tours, total, loading, error } = useTours({ ...filters, page, limit: PAGE_LIMIT });
  const totalPages = Math.ceil(total / PAGE_LIMIT);

  // --- Cập nhật URL khi filter thay đổi ---
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.rating) params.set('rating', filters.rating);
    if (filters.sortBy !== '-createdAt') params.set('sort', filters.sortBy);
    if (page > 1) params.set('page', page);
    setSearchParams(params, { replace: true });
  }, [filters, page, setSearchParams]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  }, []);
  
  const handleSortChange = useCallback((value) => {
    setFilters(prev => ({ ...prev, sortBy: value }));
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({ searchTerm: '', sortBy: '-createdAt', priceRange: '', rating: '' });
    setPage(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  return (
    <>
      <TourListHeader />
      <main className="py-12 bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              loading={loading} // Truyền trạng thái loading xuống
            />
            <div className="w-full">
              <SortBar 
                total={total}
                sortBy={filters.sortBy}
                onSortChange={handleSortChange}
                loading={loading}
              />
              <TourGrid
                tours={tours}
                loading={loading}
                error={error}
              />
              {!loading && !error && total > 0 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TourList;