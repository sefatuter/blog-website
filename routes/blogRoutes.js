import express from 'express';
import { Post } from '../models/index.js';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/users/login');
};

// Show all posts
router.get('/', isAuthenticated, async (req, res) => {
  const posts = await Post.findAll();
  res.render('index', { posts });
});

// New post form
router.get('/new', isAuthenticated, (req, res) => {
  res.render('create');
});

// Create post
router.post('/', isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/blogs');
});

// Edit post form
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  res.render('edit', { post });
});

// Update post
router.put('/:id', isAuthenticated, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.redirect('/blogs');
});

// Delete post
router.delete('/:id', isAuthenticated, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  await post.destroy();
  res.redirect('/blogs');
});

export default router;
