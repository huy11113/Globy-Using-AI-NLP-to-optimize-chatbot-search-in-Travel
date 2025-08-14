// src/components/common/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component này sẽ tự động cuộn trang lên đầu mỗi khi bạn chuyển route.
 */
const ScrollToTop = () => {
  // Lấy thông tin về đường dẫn hiện tại
  const { pathname } = useLocation();

  // Sử dụng useEffect để thực hiện một hành động mỗi khi `pathname` thay đổi
  useEffect(() => {
    // Cuộn cửa sổ về vị trí (0, 0) - tức là lên đầu trang
    window.scrollTo(0, 0);
  }, [pathname]); // Mảng dependency `[pathname]` đảm bảo effect chỉ chạy khi URL thay đổi

  // Component này không render ra bất kỳ giao diện nào
  return null;
};

export default ScrollToTop;