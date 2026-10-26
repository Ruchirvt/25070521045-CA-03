const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

// Public: comments of a post
router.get('/post/:postId', async (req, res) => {
  try {
    res.json(await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 }));
  } catch {
    res.json([]);
  }
});

// Logged in: add comment
router.post('/post/:postId', auth, async (req, res) => {
  try {
    const text = (req.body.text || '').trim();
    if (!text) return res.status(400).json({ error: 'Comment cannot be empty' });
    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user.id,
      authorName: req.user.name,
      text,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Author only: delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const c = await Comment.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Comment not found' });
    if (String(c.author) !== req.user.id)
      return res.status(403).json({ error: 'You can only delete your own comments' });
    await c.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
