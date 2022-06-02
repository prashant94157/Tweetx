const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Posts = require('../models/Post');

//give all profiles when user is looged in
router.get('/all', auth, async (req, res) => {
  try {
    const profile = await Profile.find().populate('user', 'name avatar');

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//give logged in user's Profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate({
        path: 'follower',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      })
      .populate({
        path: 'following',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//give logged in user's Posts
router.get('/post', auth, async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.user.id })
      .populate('user')
      .select('-password');

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//give logged in user's follower
router.get('/follower', auth, async (req, res) => {
  try {
    const follower = await Profile.find({ user: req.user.id }).select(
      '-following'
    );
    res.json(follower);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//give logged in user's following
router.get('/following', auth, async (req, res) => {
  try {
    const following = await Profile.find({ user: req.user.id }).select(
      '-follower'
    );
    res.json(following);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//follow
router.put('/follower/add/:user_id', auth, async (req, res) => {
  try {
    const profile1 = await Profile.findOne({ user: req.user.id });
    const profile2 = await Profile.findOne({ user: req.params.user_id });
    if (!profile1 || !profile2) {
      return res.status(401).send('User not found');
    }
    const user1 = await User.findById(req.user.id).select('id');
    const user2 = await User.findById(req.params.user_id).select('id');

    if (!user1 || !user2) {
      return res.status(401).send('User not found');
    }
    profile1.following.unshift({ user: user2.id });
    profile2.follower.unshift({ user: user1.id });

    await profile1.save();
    await profile2.save();
    // res.redirect('/follower');
    res.json({ id: req.user.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//remove follow
router.put('/follower/remove/:user_id', auth, async (req, res) => {
  try {
    const profile1 = await Profile.findOne({ user: req.user.id });
    const profile2 = await Profile.findOne({ user: req.params.user_id });
    if (!profile1 || !profile2) {
      return res.status(401).send('User not found');
    }
    const user1 = await User.findById(req.user.id).select('id');
    const user2 = await User.findById(req.params.user_id).select('id');

    if (!user1 || !user2) {
      return res.status(401).send('User not found');
    }
    profile1.follower = profile1.follower.filter(
      ({ user }) => user != user2.id
    );
    profile2.following = profile2.following.filter(
      ({ user }) => user != user1.id
    );

    await profile1.save();
    await profile2.save();
    res.redirect('/following');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
