import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Quay lại sử dụng module 'path'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Sử dụng process.cwd() để lấy đường dẫn thư mục gốc của dự án.
      // Cách này ổn định và được tất cả các công cụ hỗ trợ.
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});