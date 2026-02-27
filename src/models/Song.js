const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true,
      trim: true,
    },

    artist: { 
      type: String,
      required: true,
      trim: true,
    },

    album: { 
      type: String,
      default: null,
      trim: true,
    },

    genre: { 
      type: String,
      default: null,
      trim: true,
    },

    duration: { // duração em minutos e segundos rs (obrigatório)
      minutes: {
        type: Number,
        required: true,
        min: 0,
      },
      seconds: {
        type: Number,
        required: true,
        min: 0,
        max: 59,
      },
    },

    releaseDate: { 
      type: Date,
      default: null,
    },

    coverImage: {
      type: String,
      default: null,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);