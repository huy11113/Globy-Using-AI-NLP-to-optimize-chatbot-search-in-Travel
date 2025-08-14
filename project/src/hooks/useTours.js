import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ✅ Thêm `featured` vào danh sách tham số


// ✅ ĐÃ CẬP NHẬT: Thay đổi tham số để khớp với bộ lọc mới
const useTours = ({ searchTerm = '', sortBy = '-createdAt', page = 1, limit = 9, priceRange = '', rating = '', featured = false }) => {
  const [tours, setTours] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy) params.set('sort', sortBy);
    
    // ✅ LOGIC MỚI: Xử lý khoảng giá
    if (priceRange) {
        const [min, max] = priceRange.split('-');
        if (min !== "0") {
            params.set('price[gte]', min);
        }
        if (max !== "Infinity") {
            params.set('price[lte]', max);
        }
    }


    // ✅ LOGIC MỚI: Xử lý rating
    if (rating) params.set('rating[gte]', rating);
    
    params.set('page', page);
    params.set('limit', limit);
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

  }, [searchTerm, sortBy, page, limit, priceRange, rating, featured]); // ✅ Thêm dependencies mới

  // ✅ SỬA LẠI: Thêm setTours để có thể cập nhật từ bên ngoài nếu cần
  return { tours, total, loading, error, setTours }; 
};


export default useTours;