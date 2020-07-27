const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },

  location: {
    type: String,
  },

  bio: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  friendRequests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("profile", ProfileSchema);
