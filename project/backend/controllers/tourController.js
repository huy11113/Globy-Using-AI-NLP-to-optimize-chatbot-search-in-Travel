import Tour from '../models/Tour.js';

export const getAllTours = async (req, res) => {
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

    // Populate
    query = query.populate({ path: 'destinationId', select: 'name' });

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    
    // Thực thi truy vấn
    const tours = await query;
    const totalTours = await Tour.countDocuments(JSON.parse(queryStr));
    
    // =================================================================
    // ✅ BƯỚC DEBUG: In dữ liệu của tour đầu tiên ra terminal
    // =================================================================
    console.log('---[ DEBUG ]--- Dữ liệu tour thô sau khi populate:');
    console.log(tours[0]); 
    // =================================================================

    // Định dạng lại dữ liệu
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
      data: formattedTours,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};