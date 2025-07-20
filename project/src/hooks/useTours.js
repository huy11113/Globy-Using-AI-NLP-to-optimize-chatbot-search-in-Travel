import { useState, useEffect } from 'react';

export const useTours = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadToursFromAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Gọi đến API server backend đang chạy ở cổng 4000
        const response = await fetch('http://localhost:4000/api/tours');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTours(data);

      } catch (err) {
        setError('Không thể tải danh sách tour. Vui lòng thử lại sau.');
        console.error("Lỗi khi gọi API:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadToursFromAPI();
  }, []); // Mảng rỗng đảm bảo hook chỉ chạy 1 lần

  return { tours, isLoading, error };
};