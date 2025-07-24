import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: String,
  description: String,
  destinationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    // ref phải khớp với tên model 'Destination'
    ref: 'Destination',
    required: true
  },
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

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;