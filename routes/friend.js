const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Profile = require("../models/Profile");

// @route    Post api/friends/:user_id
// @desc     Send friend request to user_id
// @access   Private
router.post("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar"]);

    //check if friend Request already sent
    if (
      profile.friendRequests.some(
        (friendReq) => friendReq.id.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ msg: "Friend Rquest already sent" });
    }

    // check if  current user and :id are already friends
    if (
      profile.friends.some((friend) => friend.id.toString() === req.user.id)
    ) {
      return res.status(400).json({ msg: "Already friends" });
    }

    profile.friendRequests.unshift({ user: req.user.id });

    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/friends/me/:user_id
// @desc     Approve friend request from user_id
// @access   Private
router.put("/me/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this approving user" });

    // find the firend request from user_id
    const friendReq = profile.friendRequests.find(
      ({ user }) => user.toString() === req.params.id
    );

    if (!friendReq)
      return res.status(400).json({ msg: "Friend request not found" });

    // approve firend request
    profile.friends.unshift(friendReq.user);
    // Delete from friend request
    for (let i = 0; i < profile.friendRequests.length; i++) {
      if (profile.friendRequests[i] === friendReq)
        profile.friendRequests.splice(i, 1);
    }

    // add me to user_id friends list
    const user_idFriendSchema = await Profile.findOne({ user: req.params.id });
    if (!user_idFriendSchema)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this requesting user" });
    user_idFriendSchema.friends.unshift(profile.user);

    await user_idFriendSchema.save();
    await profile.save();
    res.json(user_idFriendSchema);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/friends/me/:user_id
// @desc     ignore friend request from user_id
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this approving user" });
    for (let i = 0; i < profile.friendRequests.length; i++) {
      if (profile.friendRequests[i].user.toString() === req.params.id) {
        profile.friendRequests.splice(i, 1);
        await profile.save();
        return res.json({ msg: "Friend request deleted" });
      }
    }
    return res.status(404).json({ msg: "Friend request not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
