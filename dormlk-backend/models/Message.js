// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobileNo: String,
  message: { type: String, length: 10000 },
  createdDateTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MessageReply' }]
});

module.exports = mongoose.model('Message', MessageSchema);
