// src/hooks/useDestinationDetail.js

import { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const useDestinationDetail = (id) => {
  const [destination, setDestination] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Không làm gì nếu không có ID
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Gọi API để lấy thông tin địa điểm và các tour thuộc địa điểm đó CÙNG LÚC
        // Cách này giúp trang tải nhanh hơn
        const [destinationResponse, toursResponse] = await Promise.all([
          fetch(`http://localhost:4000/api/destinations/${id}`),
          // Sửa lỗi 404: API của bạn có thể đang mong đợi tham số `?destination=`
          fetch(`http://localhost:4000/api/tours?destination=${id}`)
        ]);

        // Xử lý dữ liệu địa điểm
        const destinationData = await destinationResponse.json();
        if (!destinationResponse.ok) {
          throw new Error(destinationData.message || 'Không thể tải thông tin địa điểm.');
        }
        setDestination(destinationData.data);

        // Xử lý dữ liệu các tour
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
  }, [id]); // Effect này sẽ chạy lại mỗi khi `id` từ URL thay đổi

  return { destination, tours, loading, error };
};

export default useDestinationDetail;