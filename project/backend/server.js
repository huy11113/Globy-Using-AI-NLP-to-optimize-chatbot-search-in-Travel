const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- CẤU HÌNH ---
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/globyDB';

const app = express();
app.use(cors());
app.use(express.json());

// --- KẾT NỐI TỚI MONGODB ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
  .catch(err => console.error('🔥 Lỗi kết nối MongoDB:', err));

// --- ĐỊNH NGHĨA CÁC SCHEMA ---

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'guide'], default: 'user' },
  avatar: String,
  phone: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
  createdAt: { type: Date, default: Date.now }
});

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  continent: String,
  createdAt: { type: Date, default: Date.now }
});

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  price: Number,
  duration: String,
  image: String,
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  featured: Boolean,
  departures: [{
    date: Date,
    seatsAvailable: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  startDate: Date,
  people: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const hotelSchema = new mongoose.Schema({
  name: String,
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  address: String,
  description: String,
  image: String,
  rating: Number,
  reviewsCount: Number,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const hotelRoomSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  type: String,
  description: String,
  pricePerNight: Number,
  capacity: Number,
  images: [String]
});

const hotelBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'HotelRoom' },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// --- SỬA LỖI QUAN TRỌNG TẠI ĐÂY ---
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['credit_card', 'paypal', 'momo'], required: true },
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  paidAt: { type: Date, default: Date.now },
  
  // Sửa lỗi: Cho phép bookingId tham chiếu đến nhiều loại model khác nhau
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'bookingModel' // refPath trỏ đến trường bookingModel bên dưới
  },
  bookingModel: {
    type: String,
    required: true,
    enum: ['Booking', 'HotelBooking'] // Chỉ cho phép 2 giá trị này
  }
});

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  type: { type: String, enum: ['booking', 'promotion', 'system'] },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// --- TẠO CÁC MODEL TỪ SCHEMA ---
const User = mongoose.model('User', userSchema);
const Destination = mongoose.model('Destination', destinationSchema);
const Tour = mongoose.model('Tour', tourSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Review = mongoose.model('Review', reviewSchema);
const Hotel = mongoose.model('Hotel', hotelSchema);
const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);
const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Notification = mongoose.model('Notification', notificationSchema);

// --- TẠO CÁC API ENDPOINT (TẠM THỜI) ---
// Ghi chú: Đây chỉ là cách đơn giản để lấy dữ liệu. 
// Trong thực tế, bạn sẽ cần các route và controller phức tạp hơn cho từng model.
const createGenericEndpoint = (model) => async (req, res) => {
  try {
    const items = await model.find({});
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: `Lỗi khi lấy dữ liệu ${model.modelName.toLowerCase()}`, error });
  }
};

app.get('/api/users', createGenericEndpoint(User));
app.get('/api/destinations', createGenericEndpoint(Destination));
app.get('/api/tours', async (req, res) => {
  try {
    // Sử dụng .populate() để lấy thông tin chi tiết từ 'Destination'
    const tours = await Tour.find({}).populate({
      path: 'destinationId',
      select: 'name' // Chỉ lấy trường 'name' cho gọn
    });

    // Đổi tên 'destinationId' thành 'destination' để khớp với component TourCard
    const formattedTours = tours.map(tour => {
      const tourObject = tour.toObject();
      tourObject.destination = tourObject.destinationId;
      delete tourObject.destinationId;
      return tourObject;
    });

    res.status(200).json({ success: true, count: formattedTours.length, data: formattedTours });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy dữ liệu tours', error });
  }
});
app.get('/api/bookings', createGenericEndpoint(Booking));
app.get('/api/reviews', createGenericEndpoint(Review));
app.get('/api/hotels', createGenericEndpoint(Hotel));
app.get('/api/hotelRooms', createGenericEndpoint(HotelRoom));
app.get('/api/hotelBookings', createGenericEndpoint(HotelBooking));
app.get('/api/payments', createGenericEndpoint(Payment));
app.get('/api/notifications', createGenericEndpoint(Notification));

// --- CHẠY SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});