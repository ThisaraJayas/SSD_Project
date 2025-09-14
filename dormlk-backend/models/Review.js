// models/Review.js
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  content: String,
  dateTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

export default mongoose.model('Review', ReviewSchema);
