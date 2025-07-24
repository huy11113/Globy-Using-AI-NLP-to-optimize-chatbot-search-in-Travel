import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ✅ Thêm `featured` vào danh sách tham số
const useTours = ({ searchTerm = '', sortBy = '-createdAt', page = 1, limit = 9, maxPrice = '', minRating = '', featured = false }) => {
  const [tours, setTours] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy) params.set('sort', sortBy);
    if (maxPrice) params.set('price[lte]', maxPrice);
    if (minRating) params.set('rating[gte]', minRating);
    params.set('page', page);
    params.set('limit', limit);
    // ✅ Thêm logic để xử lý bộ lọc `featured`
    if (featured) {
      params.set('featured', 'true');
    }

    const queryString = params.toString();
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchToursData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/tours?${queryString}`, { signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Lỗi mạng! Status: ${response.status}`);
        }
        const result = await response.json();
        setTours(result.data);
        setTotal(result.total);
      } catch (err) {
        if (err.name !== 'AbortError') { setError(err.message); }
      } finally {
        setLoading(false);
      }
    };
    fetchToursData();
    return () => { controller.abort(); };

  }, [searchTerm, sortBy, page, limit, maxPrice, minRating, featured]); // ✅ Thêm `featured` vào dependencies

  return { tours, total, loading, error };
};

export default useTours;