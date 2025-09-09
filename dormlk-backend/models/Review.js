// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  content: String,
  dateTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = mongoose.model('Review', ReviewSchema);
