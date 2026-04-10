const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    director: {
      type: String,
    },

    genre: [
      {
        type: String,
      },
    ],

    seasons: {
      type: Number,
    },

    episodes: {
      type: Number,
    },

    duration: {
      type: String,
    },

    platform: {
      type: String,
    },

    releaseYear: {
      type: Number,
    },

    coverImage: {
      type: String,
    },

    description: {
      type: String,
    },

    isBook: {
      type: Boolean,
      default: false,
      set: (v) => v === "true" || v === true,
    },

    bookName: {
      type: String,
    },

    reviews: [
      {
        userName: String,
        rating: Number,
        comment: String,
        date: String,
        subRatings: [
          {
            category: String,
            score: Number,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Serie", serieSchema);
