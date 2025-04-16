const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const User = require('../models/User');

// @route   GET api/progress/:courseId
// @desc    Get user progress for a course
// @access  Private
router.get('/:courseId', auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });
    
    if (!progress) {
      // If no progress record exists, create one
      const course = await Course.findById(req.params.courseId);
      
      if (!course) {
        return res.status(404).json({ msg: 'Curso no encontrado' });
      }
      
      // Check if user has access to this course
      const user = await User.findById(req.user.id);
      const hasAccess = user.purchasedCourses.includes(req.params.courseId) || 
                        (user.subscription && user.subscription.isActive);
      
      if (!hasAccess) {
        return res.status(403).json({ msg: 'No tienes acceso a este curso' });
      }
      
      // Create new progress record
      const newProgress = new Progress({
        userId: req.user.id,
        courseId: req.params.courseId,
        completedLessons: [],
        progress: 0
      });
      
      await newProgress.save();
      return res.json(newProgress);
    }
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   POST api/progress/:courseId/lesson/:lessonId
// @desc    Mark lesson as completed
// @access  Private
router.post('/:courseId/lesson/:lessonId', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });
    
    if (!progress) {
      // If no progress record exists, create one
      const course = await Course.findById(req.params.courseId);
      
      if (!course) {
        return res.status(404).json({ msg: 'Curso no encontrado' });
      }
      
      progress = new Progress({
        userId: req.user.id,
        courseId: req.params.courseId,
        completedLessons: [req.params.lessonId],
        progress: 0 // Will be calculated below
      });
    } else if (!progress.completedLessons.includes(req.params.lessonId)) {
      // Add lesson to completed lessons if not already there
      progress.completedLessons.push(req.params.lessonId);
    }
    
    // Get course to calculate progress percentage
    const course = await Course.findById(req.params.courseId);
    
    // Calculate total number of lessons
    let totalLessons = 0;
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
    });
    
    // Calculate progress percentage
    progress.progress = (progress.completedLessons.length / totalLessons) * 100;
    
    // Update last accessed
    progress.lastAccessed = Date.now();
    
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   POST api/progress/:courseId/notes
// @desc    Add notes to a lesson
// @access  Private
router.post('/:courseId/notes', auth, async (req, res) => {
  const { lessonId, content } = req.body;
  
  if (!lessonId || !content) {
    return res.status(400).json({ msg: 'Se requiere ID de lección y contenido' });
  }
  
  try {
    let progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });
    
    if (!progress) {
      return res.status(404).json({ msg: 'Progreso no encontrado' });
    }
    
    // Add note
    progress.notes.push({
      lessonId,
      content,
      createdAt: Date.now()
    });
    
    await progress.save();
    res.json(progress.notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   GET api/progress/dashboard
// @desc    Get progress summary for all courses
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id })
      .populate('courseId', 'title category thumbnail');
    
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
