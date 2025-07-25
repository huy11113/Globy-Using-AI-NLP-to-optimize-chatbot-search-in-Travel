import Tour from '../models/Tour.js';

export const getAllTours = async (req, res) => {
  try {
    // 1. Tạo một bản sao của query để xử lý
    const queryObj = { ...req.query };
    
    // 2. Các trường đặc biệt cần loại bỏ khỏi bộ lọc chính
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 3. Xử lý các bộ lọc nâng cao (ví dụ: giá cả)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Tour.find(JSON.parse(queryStr));

    // 4. Sắp xếp
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Mặc định
    }

    // 5. Populate để lấy tên địa điểm
    query = query.populate({
        path: 'destinationId',
        select: 'name'
    });

    // 6. Phân trang
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    
    // 7. Thực thi truy vấn
    const tours = await query;
    const totalTours = await Tour.countDocuments(JSON.parse(queryStr));

    // 8. Định dạng lại dữ liệu trước khi gửi đi
    const formattedTours = tours.map(tour => {
        const tourObject = tour.toObject();
        tourObject.destination = tourObject.destinationId;
        delete tourObject.destinationId;
        return tourObject;
    });

    // 9. Gửi phản hồi
    res.status(200).json({
      success: true,
      count: formattedTours.length,
      total: totalTours,
      data: formattedTours,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};