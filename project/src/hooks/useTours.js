import { useState, useEffect } from 'react';
import axios from 'axios';

// Lấy base URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Custom hook chuyên nghiệp để lấy dữ liệu tour từ API.
 * Tự động refetch khi các bộ lọc hoặc sắp xếp thay đổi.
 * @param {object} filters - Đối tượng chứa các giá trị lọc và sắp xếp.
 */
const useTours = (filters) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Sử dụng AbortController để hủy request khi component unmount hoặc filter thay đổi
    const controller = new AbortController();
    const { signal } = controller;

    const fetchTours = async () => {
      setLoading(true);
      setError(null);

      try {
        // Xây dựng query string từ đối tượng filters
        const params = new URLSearchParams();
        if (filters.destination) params.append('destinationId.name', filters.destination);
        if (filters.sort) params.append('sort', filters.sort);
        // Thêm các filter khác tại đây (price, duration...)

        const response = await axios.get(`${API_URL}/api/tours`, {
          params,
          signal, // Gán signal vào request
        });
        
        setTours(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          // Bỏ qua lỗi khi request bị hủy một cách chủ động
          console.log('Request canceled:', err.message);
        } else {
          setError(err.response ? err.response.data.message : err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTours();

    // Cleanup function: Hủy request khi component bị unmount hoặc effect chạy lại
    return () => {
      controller.abort();
    };
  }, [filters]); // Phụ thuộc vào filters, effect sẽ chạy lại khi filters thay đổi

  return { tours, loading, error };
};

export default useTours;