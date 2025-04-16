const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema
const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['dropshipping', 'forex', 'crypto', 'ai', 'content']
  },
  thumbnail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  modules: [{
    moduleId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    lessons: [{
      lessonId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      contentType: {
        type: String,
        enum: ['video', 'document', 'presentation'],
        required: true
      },
      contentUrl: {
        type: String,
        required: true
      },
      duration: {
        type: Number // in minutes
      },
      order: {
        type: Number,
        required: true
      }
    }],
    order: {
      type: Number,
      required: true
    }
  }],
  totalLessons: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number, // in minutes
    default: 0
  }
});

module.exports = mongoose.model('Course', CourseSchema);
