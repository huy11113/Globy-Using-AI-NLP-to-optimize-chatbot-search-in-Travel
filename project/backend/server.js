const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- CẤU HÌNH ---
const PORT = 4000;
const MONGO_URI = 'mongodb://localhost:27017/travelDB'; 

const app = express();
app.use(cors());
app.use(express.json());

// --- KẾT NỐI TỚI MONGODB ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch(err => console.error('🔥 Failed to connect to MongoDB', err));

// --- BẮT ĐẦU PHẦN CẬP NHẬT ---
// Cập nhật Schema để khớp với dữ liệu đầy đủ trong database
const tourSchema = new mongoose.Schema({
  title: String,
  location: String, // Thêm trường này
  price: Number,
  duration: String, // Đổi thành String để khớp "5 Days"
  groupSize: String, // Thêm trường này
  rating: Number,
  reviewCount: Number, // Sửa lại tên trường cho đúng
  image: String,

  description: String,
  category: String,
  featured: Boolean,
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');
// --- KẾT THÚC PHẦN CẬP NHẬT ---

// --- API ENDPOINT (Không đổi) ---
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tours', error });
  }
});

// --- CHẠY SERVER (Không đổi) ---
app.listen(PORT, () => {
  console.log(`🚀 Mock API server is running on http://localhost:${PORT}`);
});