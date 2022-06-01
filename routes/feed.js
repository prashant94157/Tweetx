const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

//write post
router.post(
  '/',
  [auth, [check('content', 'Please write something to tweet').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newPost = new Post({
        text: req.body.content,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).result('Server Error');
    }
  }
);

//read feed
router.get('/', auth, async (req, res) => {
  try {
    const allPosts = await Post.find().populate('user', 'name avatar');
    res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).result('Server Error');
  }
});

module.exports = router;
