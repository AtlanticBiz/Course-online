// Database models directory structure
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  subscription: {
    isActive: {
      type: Boolean,
      default: false
    },
    plan: {
      type: String,
      enum: ['none', 'monthly'],
      default: 'none'
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    stripeCustomerId: {
      type: String
    }
  },
  purchasedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserSchema);
