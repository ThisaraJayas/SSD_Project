// models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: String,
  createdDateTime: { type: Date, default: Date.now },
  starRating: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

export default mongoose.model('Comment', CommentSchema);
