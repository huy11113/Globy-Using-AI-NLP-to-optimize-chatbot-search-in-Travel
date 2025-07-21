const Tour = require('../models/tour');

// @desc    Lấy tất cả tour với bộ lọc, sắp xếp và phân trang
// @route   GET /api/tours
// @access  Public
const getAllTours = async (req, res) => {
  try {
    // 1. Xây dựng đối tượng truy vấn (Query Object)
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Xử lý các bộ lọc nâng cao (ví dụ: khoảng giá)
    // Ví dụ: /tours?price[gte]=1000&duration[lte]=5
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Tour.find(JSON.parse(queryStr));

    // 2. Sắp xếp (Sorting)
    // Ví dụ: /tours?sort=price,-ratingsAverage
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Mặc định sắp xếp theo tour mới nhất
    }

    // 3. Lấy trường dữ liệu (Field Limiting)
    // Populate để lấy tên của destination
    query = query.populate('destinationId', 'name');


    // 4. Thực thi truy vấn
    const tours = await query;

    // Gửi phản hồi
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = { getAllTours };