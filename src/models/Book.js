const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    pages: {
      type: Number,
      min: 1,
    },

    cover: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    categories: [
      {
        type: String,
        trim: true,
      },
    ],

    publishYear: Number,

    publisher: {
      type: String,
      trim: true,
    },

    editionNumber: {
      type: Number,
      min: 1,
    },

    isSeries: {
      type: Boolean,
      default: false,
    },

    seriesName: {
      type: String,
      trim: true,
    },

    volume: {
      type: Number,
      min: 1,
    },

    format: {
      type: String,
      enum: ["fisico", "ebook", "audiobook"],
    },

    // 🔥 duração em minutos (apenas para audiobook)
    duration: {
      type: Number,
      min: 1,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    externalId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
