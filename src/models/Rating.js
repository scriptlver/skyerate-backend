const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },

    itemType: {
      type: String,
      enum: ["Book", "Movie", "Serie", "FigureSkating", "Anime", "Song"],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subRatings: [
      {
        category: String,
        score: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],

    finalScore: {
      type: Number,
      min: 1,
      max: 5,
      required: function () {
        return !this.subRatings || this.subRatings.length === 0;
      },
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    image: String,
    gif: String,

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isFavoriteOfMonth: {
      type: Boolean,
      default: false,
    },

    isSpoiler: {
      type: Boolean,
      default: false,
    },


    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        text: {
          type: String,
          required: true,
          maxlength: 1000,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);