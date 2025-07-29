const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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
  phoneNumber: { type: String, unique: true, sparse: true },
  password: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
  // Thêm lại các trường còn thiếu để không gây lỗi
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin', 'guide'], default: 'user' },
  avatar: String,
  resetCode: String,
}, { timestamps: true });

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  continent: String,
}, { timestamps: true });

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
  images: [String],
  startLocation: String,
  endLocation: String,
  included: [String],
  excluded: [String],
  tags: [String],
  category: String,
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

// --- API ENDPOINTS ---

// === API XÁC THỰC NGƯỜI DÙNG ===
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { phoneNumber, password, name, email } = req.body;
        if (!phoneNumber || !password) {
            return res.status(400).json({ success: false, message: 'Số điện thoại và mật khẩu là bắt buộc.' });
        }
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Số điện thoại đã tồn tại.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ phoneNumber, password: hashedPassword, name, email });
        await newUser.save();
        res.status(201).json({ success: true, message: "Đăng ký thành công!", data: { id: newUser._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Số điện thoại hoặc mật khẩu không hợp lệ.' });
        }
        const { password: _, ...userData } = user.toObject();
        res.status(200).json({ success: true, message: "Đăng nhập thành công!", data: userData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
    }
});

authRouter.post('/forgot-password', async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Số điện thoại không tồn tại.' });
        }
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetCode = resetCode;
        await user.save();
        console.log(`Mã xác nhận cho ${phoneNumber}: ${resetCode}`);
        res.status(200).json({ success: true, message: 'Mã xác nhận đã được gửi (kiểm tra console backend).' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
    }
});

authRouter.post('/reset-password', async (req, res) => {
    try {
        const { phoneNumber, resetCode, newPassword } = req.body;
        const user = await User.findOne({ phoneNumber, resetCode });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Số điện thoại hoặc mã xác nhận không đúng.' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetCode = undefined;
        await user.save();
        res.status(200).json({ success: true, message: 'Mật khẩu đã được đặt lại thành công.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
    }
});

app.use('/api/auth', authRouter);

// ✅ --- API CHO DANH SÁCH YÊU THÍCH ---
const wishlistRouter = express.Router(); // Định nghĩa router trước khi sử dụng

// Lấy danh sách yêu thích của người dùng
wishlistRouter.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: 'wishlist',
            model: 'Tour',
            populate: { path: 'destinationId', model: 'Destination', select: 'name' }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
        }
        res.status(200).json({ success: true, data: user.wishlist });
    } catch (error) {
        console.error("Lỗi lấy wishlist:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ." });
    }
});

// Thêm/Xóa một tour khỏi danh sách yêu thích (toggle)
wishlistRouter.post('/toggle', async (req, res) => {
    const { userId, tourId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy người dùng." });
        }

        const tourIndex = user.wishlist.indexOf(tourId);
        if (tourIndex > -1) {
            user.wishlist.splice(tourIndex, 1);
        } else {
            user.wishlist.push(tourId);
        }
        await user.save();
        
        const updatedUser = await User.findById(userId).populate({
            path: 'wishlist',
            model: 'Tour',
            populate: { path: 'destinationId', model: 'Destination', select: 'name' }
        });
        res.status(200).json({ success: true, data: updatedUser.wishlist });
    } catch (error) {
        console.error("Lỗi toggle wishlist:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ." });
    }
});

app.use('/api/wishlist', wishlistRouter);
// === API CHO ĐỊA ĐIỂM ===
const destinationRouter = express.Router();

// Lấy tất cả địa điểm
destinationRouter.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find({});
        res.status(200).json({ success: true, data: destinations });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ." });
    }
});

// Lấy chi tiết một địa điểm bằng ID
destinationRouter.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ success: false, message: "Không tìm thấy địa điểm." });
        }
        res.status(200).json({ success: true, data: destination });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ." });
    }
});

app.use('/api/destinations', destinationRouter);
// ✅ --- ROUTER MỚI CHO BOOKING & THANH TOÁN ---
const bookingRouter = express.Router();

// 1. TẠO BOOKING MỚI
bookingRouter.post('/', async (req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
            status: 'pending' // Luôn bắt đầu với trạng thái chờ
        });
        await newBooking.save();
        res.status(201).json({ 
            success: true, 
            message: "Booking đã được tạo, vui lòng tiến hành thanh toán.",
            data: newBooking 
        });
    } catch (error) {
        console.error("Lỗi khi tạo booking:", error);
        res.status(500).json({ success: false, message: "Không thể tạo booking." });
    }
});

// 2. XỬ LÝ THANH TOÁN CHO BOOKING
bookingRouter.post('/payment', async (req, res) => {
    const { bookingId, amount, method } = req.body;
    
    try {
        // Tìm booking tương ứng
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Không tìm thấy booking." });
        }

        // **MÔ PHỎNG THANH TOÁN**
        // Trong thực tế, đây là nơi bạn gọi API của Stripe, PayPal, MoMo...
        // Ở đây, chúng ta giả định thanh toán luôn thành công.
        const isPaymentSuccessful = true; 

        if (isPaymentSuccessful) {
            // Tạo một bản ghi thanh toán mới
            const newPayment = new Payment({
                userId: booking.userId,
                amount: amount,
                method: method,
                status: 'paid',
                bookingId: booking._id,
                bookingModel: 'Booking' // Giả sử chỉ thanh toán cho Tour
            });
            await newPayment.save();

            // Cập nhật trạng thái booking thành "confirmed"
            booking.status = 'confirmed';
            await booking.save();

            res.status(200).json({ success: true, message: "Thanh toán thành công! Chuyến đi của bạn đã được xác nhận." });
        } else {
            // Nếu thanh toán thất bại
            booking.status = 'cancelled';
            await booking.save();
            res.status(400).json({ success: false, message: "Thanh toán thất bại, vui lòng thử lại." });
        }
    } catch (error) {
        console.error("Lỗi khi xử lý thanh toán:", error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ khi thanh toán." });
    }
});

app.use('/api/bookings', bookingRouter);

// === CÁC API CŨ CỦA BẠN (GIỮ NGUYÊN) ===
const createGenericEndpoint = (model) => async (req, res) => {
  try {
    const items = await model.find({});
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: `Lỗi khi lấy dữ liệu ${model.modelName.toLowerCase()}`, error: error.message });
  }
};

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
        // Đổi tên destinationId thành destination để khớp với frontend
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
