const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Progress Schema
const ProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [{
    type: String // lessonId
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number, // percentage
    default: 0
  },
  notes: [{
    lessonId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  quizResults: [{
    quizId: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Compound index to ensure a user can only have one progress record per course
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
