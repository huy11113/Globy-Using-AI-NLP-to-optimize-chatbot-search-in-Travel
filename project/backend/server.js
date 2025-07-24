const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Đảm bảo bạn đã chạy: npm install dotenv

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
}, { timestamps: true });

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  continent: String,
}, { timestamps: true });

// ✅ CẬP NHẬT TẠI ĐÂY: Thêm trường `itinerary` vào tourSchema
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
  itinerary: [{
    day: Number,
    title: String,
    details: String
  }]
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  startDate: Date,
  people: Number,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

const hotelSchema = new mongoose.Schema({
  name: String,
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  address: String,
  description: String,
  image: String,
  rating: Number,
  reviewsCount: Number,
  featured: Boolean,
}, { timestamps: true });

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
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['credit_card', 'paypal', 'momo'], required: true },
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  paidAt: { type: Date, default: Date.now },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'bookingModel'
  },
  bookingModel: {
    type: String,
    required: true,
    enum: ['Booking', 'HotelBooking']
  }
});

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  type: { type: String, enum: ['booking', 'promotion', 'system'] },
  read: { type: Boolean, default: false },
}, { timestamps: true });

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

// --- CÁC API ENDPOINT ---

// Endpoint chung để lấy dữ liệu (đơn giản)
const createGenericEndpoint = (model) => async (req, res) => {
  try {
    const items = await model.find({});
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: `Lỗi khi lấy dữ liệu ${model.modelName.toLowerCase()}`, error: error.message });
  }
};

// Endpoint để lấy danh sách tours
app.get('/api/tours', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9;
  const skip = (page - 1) * limit;

  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    } else {
      query = query.sort('-createdAt');
    }

    query = query.populate({ path: 'destinationId', select: 'name' });
    query = query.skip(skip).limit(limit);
    
    const tours = await query;
    const totalTours = await Tour.countDocuments(JSON.parse(queryStr));

    const formattedTours = tours.map(tour => {
        const tourObject = tour.toObject();
        tourObject.destination = tourObject.destinationId;
        delete tourObject.destinationId;
        return tourObject;
    });

    res.status(200).json({ 
        success: true, 
        count: formattedTours.length, 
        total: totalTours,
        data: formattedTours 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi khi lấy dữ liệu tours', error: error.message });
  }
});

// Endpoint để lấy chi tiết một tour bằng ID
app.get('/api/tours/:id', async (req, res) => {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findById(tourId).populate({ path: 'destinationId', select: 'name' });

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    const tourObject = tour.toObject();
    tourObject.destination = tourObject.destinationId;
    delete tourObject.destinationId;

    res.status(200).json({ success: true, data: tourObject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});


// Gán các endpoint chung cho các model còn lại
app.get('/api/users', createGenericEndpoint(User));
app.get('/api/destinations', createGenericEndpoint(Destination));
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