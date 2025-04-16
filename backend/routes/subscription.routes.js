const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @route   POST api/subscriptions/create
// @desc    Create new subscription
// @access  Private
router.post('/create', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    // Check if user already has an active subscription
    if (user.subscription.isActive) {
      return res.status(400).json({ msg: 'Ya tienes una suscripción activa' });
    }
    
    // In a real implementation, this would include Stripe subscription processing
    // For now, we'll simulate a successful subscription
    
    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.id,
      type: 'subscription',
      amount: 33, // $33 monthly subscription
      status: 'completed',
      paymentMethod: 'card',
      stripeTransactionId: 'mock_sub_' + Date.now()
    });
    
    await transaction.save();
    
    // Update user's subscription status
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription
    
    user.subscription = {
      isActive: true,
      plan: 'monthly',
      startDate,
      endDate,
      stripeCustomerId: 'mock_customer_' + Date.now()
    };
    
    await user.save();
    
    res.json({ 
      msg: 'Suscripción creada exitosamente', 
      subscription: user.subscription,
      transaction 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   GET api/subscriptions/status
// @desc    Check subscription status
// @access  Private
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    res.json(user.subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   POST api/subscriptions/cancel
// @desc    Cancel subscription
// @access  Private
router.post('/cancel', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    
    // Check if user has an active subscription
    if (!user.subscription.isActive) {
      return res.status(400).json({ msg: 'No tienes una suscripción activa' });
    }
    
    // In a real implementation, this would include Stripe subscription cancellation
    // For now, we'll simulate a successful cancellation
    
    // Update user's subscription status
    // Note: In a real implementation, you might want to keep the subscription active
    // until the end of the billing period
    user.subscription.isActive = false;
    
    await user.save();
    
    res.json({ 
      msg: 'Suscripción cancelada exitosamente', 
      subscription: user.subscription
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
