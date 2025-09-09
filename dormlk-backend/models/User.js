// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  userType: { type: String, enum: ['REGULAR', 'ADMIN'], default: 'REGULAR' },
  password: { type: String, select: false },
});

module.exports = mongoose.model('User', UserSchema);
