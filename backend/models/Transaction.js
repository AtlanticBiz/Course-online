const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Transaction Schema
const TransactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['course_purchase', 'subscription'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
    // Not required for subscription transactions
  },
  status: {
    type: String,
    enum: ['completed', 'refunded', 'failed'],
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  stripeTransactionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
