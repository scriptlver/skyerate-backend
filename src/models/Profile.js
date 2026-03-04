const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    favoriteOfMonth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },

    pinnedReview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default: null,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
