const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/authMiddleware');

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
};

router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
  const feedbackCount = await Feedback.countDocuments();
  const studentCount = await User.countDocuments({ role: 'student' });
  res.json({ feedbackCount, studentCount });
});

router.get('/students', authMiddleware, adminOnly, async (req, res) => {
  const students = await User.find({ role: 'student' }).select('-password');
  res.json(students);
});

router.put('/students/:id/toggle', authMiddleware, adminOnly, async (req, res) => {
  const student = await User.findById(req.params.id);
  student.isActive = !student.isActive;
  await student.save();
  res.json({ message: `Student ${student.isActive ? 'unblocked' : 'blocked'}` });
});

router.delete('/students/:id', authMiddleware, adminOnly, async (req, res) => {
  await User.findBy