import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const useDestinationDetail = (id) => {
  const [destination, setDestination] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [destinationResponse, toursResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/destinations/${id}`),
          fetch(`${API_BASE_URL}/tours?destination=${id}`)
        ]);

        const destinationData = await destinationResponse.json();
        if (!destinationResponse.ok) {
          throw new Error(destinationData.message || 'Không thể tải thông tin địa điểm.');
        }
        setDestination(destinationData.data);

        const toursData = await toursResponse.json();
        if (!toursResponse.ok) {
          throw new Error(toursData.message || 'Không thể tải danh sách tour.');
        }
        setTours(toursData.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { destination, tours, loading, error };
};

export default useDestinationDetail;