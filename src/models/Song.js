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
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "pop",
        "rock",
        "hiphop",
        "kpop",
        "rap",
        "indie",
        "alternativo",
        "funk",
        "mpb",
        "sertanejo",
        "jazz",
        "outro",
      ],
    },

    duration: {
      // duração em minutos e segundos
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
      required: true,
      trim: true,
    },

    externalId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Song", SongSchema);
