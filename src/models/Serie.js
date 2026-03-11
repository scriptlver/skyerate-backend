const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    genre: [
      {
        type: String,
      },
    ],

    seasons: {
      type: Number,
    },

    releaseYear: {
      type: Number,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Serie", serieSchema);