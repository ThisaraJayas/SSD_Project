// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  createdDateTime: { type: Date, default: Date.now },
  starRating: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Comment', CommentSchema);
