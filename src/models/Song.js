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
      type: [String],
      required: true,
      lowercase: true,
      enum: [
        "pop",
        "kpop",
        "rock",
        "hiphop",
        "rap",
        "trap",
        "indie",
        "eletrônico",
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
    },

    songwriters: {
      type: [String],
      required: true,
    },

    producers: {
      type: [String],
      required: true,
    },

    externalLinks: [
      {
        platform: {
          type: String,
          enum: ["spotify", "youtube", "apple", "amazon", "deezer", "outro"],
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

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", SongSchema);