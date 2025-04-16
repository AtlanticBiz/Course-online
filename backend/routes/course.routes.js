const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @route   GET api/courses
// @desc    Get all courses with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    // Apply category filter if provided
    if (category) {
      query.category = category;
    }
    
    // Apply search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const courses = await Course.find(query).select('title description category thumbnail price instructor totalLessons totalDuration');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   GET api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }
    
    res.json(course);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }
    
    res.status(500).send('Error del servidor');
  }
});

// @route   GET api/courses/category/:category
// @desc    Get courses by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.category })
      .select('title description category thumbnail price instructor totalLessons totalDuration');
    
    if (courses.length === 0) {
      return res.status(404).json({ msg: 'No hay cursos en esta categoría' });
    }
    
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   POST api/courses/:id/enroll
// @desc    Enroll in a course (purchase)
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ msg: 'Curso no encontrado' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if user already purchased this course
    if (user.purchasedCourses.includes(course._id)) {
      return res.status(400).json({ msg: 'Ya has comprado este curso' });
    }
    
    // In a real implementation, this would include Stripe payment processing
    // For now, we'll simulate a successful payment
    
    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.id,
      type: 'course_purchase',
      amount: course.price,
      courseId: course._id,
      status: 'completed',
      paymentMethod: 'card',
      stripeTransactionId: 'mock_' + Date.now()
    });
    
    await transaction.save();
    
    // Add course to user's purchased courses
    user.purchasedCourses.push(course._id);
    await user.save();
    
    res.json({ msg: 'Inscripción exitosa', transaction });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
