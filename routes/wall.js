const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

// @route    GET api/wall
// @desc     Get current users wall
// @access   Private
router.get("/", auth, async (req, res) => {
  //First get all the user posts
  try {
    const userPosts = await Post.find({ user: req.user.id });
    if (!userPosts) {
      return res.status(400).json({ msg: "There is no Posts for this user" });
    }

    let friendsList = await Profile.findOne({ user: req.user.id });
    friendsList = friendsList.friends;

    if (!friendsList) {
      return res
        .status(400)
        .json({ msg: "There is no friendList for this user" });
    }
    // find friends posts

    const friendsPosts = await friendsList.reduce(async (arr, friend) => {
      const posts = await Post.find({ user: friend._id, private: false });

      arr = [...arr, ...posts];
      return arr;
    }, []);

    const result = userPosts.concat(friendsPosts);
    return res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
