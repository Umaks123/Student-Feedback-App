const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  phone: String,
  dob: String,
  address: String,
  profilePic: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);