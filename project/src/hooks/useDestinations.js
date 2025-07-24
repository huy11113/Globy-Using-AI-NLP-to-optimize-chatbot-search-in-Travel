import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const useDestinations = (limit = 0) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Xây dựng URL, thêm limit nếu có
        const url = new URL(`${API_URL}/api/destinations`);
        if (limit > 0) {
          url.searchParams.append('limit', limit);
        }

        const response = await fetch(url.toString(), { signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch destinations');
        }
        const result = await response.json();
        setDestinations(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();

    return () => {
      controller.abort();
    };
  }, [limit]); // Chỉ chạy lại khi `limit` thay đổi

  return { destinations, loading, error };
};

export default useDestinations;