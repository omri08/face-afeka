const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  friendRequests: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("friend", FriendSchema);
