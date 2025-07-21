import { useState, useEffect } from 'react';

const useTours = (url) => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            // ✨ SỬA LỖI: Nếu không có URL thì không làm gì cả
            if (!url) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null); // Reset lỗi trước mỗi lần gọi mới

            try {
                const res = await fetch(`http://localhost:4000${url}`);

                if (!res.ok) {
                    throw new Error(`Lỗi HTTP: ${res.status}`);
                }
                
                const result = await res.json();
                
                if (result.success) {
                    setTours(result.data);
                } else {
                    throw new Error(result.message || 'Lấy dữ liệu thất bại');
                }

            } catch (err) {
                setError(err);
                console.error("Lỗi khi fetch tours:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [url]); // Phụ thuộc vào url

    return { tours, loading, error };
};

export default useTours;