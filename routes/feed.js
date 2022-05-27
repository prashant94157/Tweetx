const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Profile = require('../models/Profile');
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
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.content,
        avatar: user.avatar,
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
    const profile = await Profile.findOne({ user: req.user.id }).select(
      'following'
    );
    const following = profile.following;
    let posts = [];
    following.forEach(async (user) => {
      const newPosts = await Post.find({ user: user.user });
      posts = [...posts, ...newPosts];
    });
    res.send('feed is ready');
  } catch (error) {}
});

module.exports = router;
