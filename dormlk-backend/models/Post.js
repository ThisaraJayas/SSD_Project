// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: { type: String, maxlength: 10000 },
  price: String,
  mobileContact: String,
  emailContact: String,
  whatsappContact: String,
  availability: String,
  accommodationType: String,
  cityDistrict: String,
  noOfBed: String,
  noOfBathroom: String,
  createdDateTime: { type: Date, default: Date.now },
  postStatus: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  facilities: [String],
  closeByLocation: [String],
  suitableFor: [String],
  images: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

export default mongoose.model('Post', PostSchema);
