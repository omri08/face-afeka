const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Friend = require("../models/Friend");

// @route    GET api/friends
// @desc     Get current users friend list
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const friendsList = await Friend.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!friendsList)
      return res
        .status(400)
        .json({ msg: "There is no friendList for this user" });
    res.json(friendsList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Post api/friends/:user_id
// @desc     Send friend request to user_id
// @access   Private
router.post("/:id", auth, async (req, res) => {
  try {
    const friednsList = await Friend.findOne({
      user: req.params.id,
    }).populate("user", ["name", "avatar"]);

    //check if friend Request already sent
    if (
      friednsList.friendRequests.some(
        (friendReq) => friendReq.id.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ msg: "Friend Rquest already sent" });
    }
    friednsList.friendRequests.unshift({ user: req.user.id });
    await friednsList.save();
    return res.json(friednsList);
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
    const friend = await Friend.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!friend)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this approving user" });

    // find the firend request from user_id
    friendReq = friend.friendRequests.find(
      ({ user }) => user.toString() === req.params.id
    );
    if (!friendReq)
      return res.status(400).json({ msg: "Friend request not found" });
    // approve firend request
    friend.friends.unshift(friendReq);
    // Delete from friend request
    for (let i = 0; i < friend.friendRequests.length; i++) {
      if (friend.friendRequests[i] === friendReq)
        friend.friendRequests.splice(i, 1);
    }
    // add me to user_id friends list
    user_idFriendSchema = await Friend.findOne({ user: req.params.id });
    if (!user_idFriendSchema)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this requesting user" });
    user_idFriendSchema.friends.unshift(friend.user);
    await user_idFriendSchema.save();
    await friend.save();
    res.json(user_idFriendSchema);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/friends/me/:user_id
// @desc     ignore friend request from user_id
// @access   Private
router.put("/me/:id", auth, async (req, res) => {
  try {
    const friend = await Friend.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );
    if (!friend)
      return res
        .status(400)
        .json({ msg: "There is no friend schema for this approving user" });
    for (let i = 0; i < friend.friendRequests.length; i++) {
      if (friend.friendRequests[i].id.toString() === req.params.id) {
        friend.friendRequests.splice(i, 1);
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
