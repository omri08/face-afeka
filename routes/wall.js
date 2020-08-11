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
    let friendsPosts = [];
    for (let i = 0; i < friendsList.length; i++) {
      const post = await Post.find({
        user: friendsList[i]._id,
        private: false,
      });
      friendsPosts = [...friendsPosts, ...post];
      console.log(friendsPosts);
    }

    const result = userPosts.concat(friendsPosts);
    return res.json(result);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
