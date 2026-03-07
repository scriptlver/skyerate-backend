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
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "favorites.itemType",
        },
        itemType: {
          type: String,
          required: true,
          enum: ["Book", "Movie", "Series", "Anime", "Song", "FigureSkating"],
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    favoriteOfMonth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
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
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Profile", ProfileSchema);
