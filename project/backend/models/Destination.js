import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  continent: String,
  createdAt: { type: Date, default: Date.now }
});

// Tên model là 'Destination'
const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;