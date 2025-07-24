import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const useTourDetail = (tourId) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tourId) {
      setError("Tour ID is required.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTourDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Backend của bạn cần có endpoint này: /api/tours/:id
        const response = await fetch(`${API_URL}/api/tours/${tourId}`, { signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch tour details');
        }
        const result = await response.json();
        setTour(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();

    return () => {
      controller.abort();
    };
  }, [tourId]);

  return { tour, loading, error };
};

export default useTourDetail;