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

    // permite multiplos gêneros
    genre: {
      type: [String],
      required: true,
      lowercase: true,
      enum: [
        "pop",
        "kpop",
        "rock",
        "hiphop",
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

    featuring: {
      type: [String],
      default: [],
      trim: true,
    },

    songwriters: {
      type: [String],
      required: true,
      trim: true,
    },

    producers: {
      type: [String],
      required: true,
      trim: true,
    },

    externalLinks: [
      {
        platform: {
          type: String,
          enum: ["spotify", "youtube", "applemusic"],
          lowercase: true,
        },
        url: {
          type: String,
          trim: true,
        },
      },
    ],

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
