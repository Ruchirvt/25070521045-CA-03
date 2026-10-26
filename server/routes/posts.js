const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Public: list posts (optional ?q=search&category=Name)
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (q) {
      const rx = new RegExp(escapeRegex(q), 'i');
      filter.$or = [{ title: rx }, { body: rx }];
    }
    res.json(await Post.find(filter).sort({ createdAt: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Logged in: create
router.post('/', auth, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const post = await Post.create({
      title,
      body,
      category: category || 'Other',
      author: req.user.id,
      authorName: req.user.name,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Author only: edit
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (String(post.author) !== req.user.id)
      return res.status(403).json({ error: 'You can only edit your own posts' });
    post.title = req.body.title;
    post.body = req.body.body;
    post.category = req.body.category || post.category;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Author only: delete (also removes its comments)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (String(post.author) !== req.user.id)
      return res.status(403).json({ error: 'You can only delete your own posts' });
    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
