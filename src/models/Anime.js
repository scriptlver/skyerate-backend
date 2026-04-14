const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    originalTitle: {
      type: String,
      trim: true,
    },

    author: {
      type: String,
      trim: true,
    },

    synopsis: {
      type: String,
      trim: true,
    },

    studio: {
      type: String,
      trim: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["em andamento", "finalizado", "anunciado"],
      default: "finalizado",
    },

    genres: [
      {
        type: String,
        enum: [
          "ação",
          "aventura",
          "comédia",
          "drama",
          "fantasia",
          "terror",
          "mistério",
          "romance",
          "ficção científica",
          "slice of life",
          "esporte",
          "sobrenatural",
          "suspense",
          "shounen",
        ],
      },
    ],

    seasons: [
      {
        seasonNumber: Number,
        episodes: Number,
        releaseYear: Number,
      },
    ],
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

  { timestamps: true },
);

module.exports = mongoose.model("Anime", animeSchema);
