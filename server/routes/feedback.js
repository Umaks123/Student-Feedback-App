const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const { course, rating, message } = req.body;
  const feedback = new Feedback({ studentId: req.user.id, course, rating, message });
  await feedback.save();
  res.status(201).json({ message: 'Feedback submitted successfully' });
});

router.get('/', authMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find().populate('studentId', 'name email');
  res.json(feedbacks);
});

router.get('/my', authMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find({ studentId: req.user.id });
  res.json(feedbacks);
});

module.exports = router;