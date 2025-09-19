# 🌍 Globy - Giao diện người dùng cho Website Du lịch

Chào mừng bạn đến với Globy, một nền tảng du lịch hiện đại được xây dựng để mang lại trải nghiệm tìm kiếm và đặt tour trực tuyến tốt nhất cho người dùng. Dự án này là giao diện người dùng (frontend), được phát triển bằng React, Vite và Tailwind CSS, tập trung vào tốc độ, hiệu suất và giao diện đẹp mắt.

**Truy cập trang web trực tiếp tại:** [https://www.globy-travel.website/](https://www.globy-travel.website/)

![Trang chủ Globy]#![Alt text](C)


## ✨ Tính năng nổi bật

-   **Giao diện Hiện đại & Responsive:** Thiết kế đẹp mắt, tối ưu hóa cho mọi thiết bị từ máy tính để bàn đến điện thoại di động.
-   **Tìm kiếm & Lọc Tour Thông minh:** Người dùng có thể dễ dàng tìm kiếm tour theo từ khóa, lọc theo mức giá, và sắp xếp kết quả linh hoạt.
-   **Trang Chi tiết Tour Toàn diện:** Hiển thị đầy đủ thông tin về tour bao gồm lịch trình, dịch vụ bao gồm/không bao gồm, album ảnh, đánh giá từ khách hàng và các tour liên quan.
-   **Hệ thống Đặt vé & Thanh toán:** Quy trình đặt vé đơn giản, tích hợp thanh toán an toàn qua PayOS.
-   **Xác thực người dùng:** Hỗ trợ đăng ký, đăng nhập bằng số điện thoại và tài khoản Google. Người dùng có trang quản lý tài khoản cá nhân, xem lại lịch sử chuyến đi và danh sách yêu thích.
-   **Chatbot AI Thông minh:** Tích hợp trợ lý ảo AI (sử dụng Google Gemini) để tư vấn và tìm kiếm tour tự nhiên dựa trên ngôn ngữ của người dùng.
-   **Trang Quản trị (Admin):** Giao diện riêng cho quản trị viên để quản lý tour, booking, người dùng, điểm đến và bài viết blog.

## 🛠️ Công nghệ sử dụng

-   **Framework:** [React](https://reactjs.org/) (sử dụng Vite)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router DOM](https://reactrouter.com/)
-   **Quản lý State:** React Context API
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Carousel/Slider:** [Swiper.js](https://swiperjs.com/)

## 🚀 Cài đặt và Chạy dự án

1.  **Clone a repository:**
    ```bash
    git clone <URL_CUA_REPOSITORY_CUA_BAN>
    cd <TEN_THU_MUC_FRONTEND>
    ```

2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

3.  **Cấu hình môi trường:**
    Tạo một file `.env` ở thư mục gốc của dự án và thêm vào biến môi trường để kết nối với backend:
    ```
    VITE_API_URL=http://localhost:4000
    ```
    *(Thay đổi URL nếu backend của bạn chạy ở một địa chỉ khác)*

4.  **Chạy dự án ở chế độ development:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập vào `http://localhost:5173`.

5.  **Build dự án cho production:**
    ```bash
    npm run build
    ```

---
