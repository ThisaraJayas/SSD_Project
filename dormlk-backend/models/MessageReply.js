// models/MessageReply.js
import mongoose from 'mongoose';

const MessageReplySchema = new mongoose.Schema({
  reply: { type: String, maxlength: 10000 },
  createdDateTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
});

export default mongoose.model('MessageReply', MessageReplySchema);
