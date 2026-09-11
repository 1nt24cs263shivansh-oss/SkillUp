import express from 'express';
import { MOCK_USERS } from '../data/mockData.js';

const router = express.Router();

// Mock Login
router.post('/login', (req, res) => {
  const { email } = req.body;
  
  let role = 'student';
  if (email.includes('mentor')) role = 'mentor';
  if (email.includes('recruiter')) role = 'recruiter';

  const user = {
    _id: `user-${Date.now()}`,
    name: email.split('@')[0],
    email,
    role,
    skills: ['Python', 'SQL', 'React'],
    token: 'mock-jwt-token-123'
  };

  // Replace: User.findOne() and bcrypt.compare()
  return res.json(user);
});

// Mock Register
router.post('/register', (req, res) => {
  const { name, email, role, skills } = req.body;
  
  const newUser = {
    _id: `user-${Date.now()}`,
    name,
    email,
    role,
    skills: skills ? skills.split(',').map(s => s.trim()) : [],
    token: 'mock-jwt-token-123'
  };

  // Replace: User.create()
  return res.status(201).json(newUser);
});

export default router;