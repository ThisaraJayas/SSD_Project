// models/MessageReply.js
const mongoose = require('mongoose');

const MessageReplySchema = new mongoose.Schema({
  reply: { type: String, length: 10000 },
  createdDateTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
});

module.exports = mongoose.model('MessageReply', MessageReplySchema);
