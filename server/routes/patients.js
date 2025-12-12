const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Symptom = require('../models/Symptom');

// Get patient dashboard
router.get('/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');

    const activeSymptoms = await Symptom.find({
      userId,
      status: 'Active',
    });

    const recentSymptoms = await Symptom.find({ userId }).sort({ createdAt: -1 }).limit(10);

    res.json({
      user,
      activeSymptoms,
      recentSymptoms,
      totalSymptoms: recentSymptoms.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update patient profile
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, age, gender, phone, medicalHistory, medications } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, age, gender, phone, medicalHistory, medications },
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get patient details
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
