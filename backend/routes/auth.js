const express = require('express');
const clerkMiddleware = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get current user profile
router.get('/profile', clerkMiddleware, async (req, res) => {
  try {
    const { userId } = req.auth;
    
    let user = await User.findOne({ clerkId: userId });
    
    if (!user) {
      // Create user if doesn't exist
      const clerkUser = await req.auth.getUser();
      user = new User({
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username || clerkUser.firstName || 'User'
      });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user preferences
router.put('/preferences', clerkMiddleware, async (req, res) => {
  try {
    const { userId } = req.auth;
    const { preferences } = req.body;
    
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { preferences },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

module.exports = router;