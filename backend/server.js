const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes (will be implemented in separate files)
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Academy Platform API' });
});

// Import route modules
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const progressRoutes = require('./routes/progress.routes');
const subscriptionRoutes = require('./routes/subscription.routes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (connection string will be in .env file)
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('MongoDB connected');
//     // Start server after successful database connection
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// For development, start server without MongoDB connection
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
