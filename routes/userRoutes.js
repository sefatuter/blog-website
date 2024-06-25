import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

const router = express.Router();

// Register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect('/users/login');
});

// Login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.username = user.username; // Store the username in the session
    res.redirect('/blogs');
  } else {
    res.redirect('/users/login');
  }
});

// Logout user
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
});

export default router;
