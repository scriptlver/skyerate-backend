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

    synopsis: {
      type: String,
      trim: true,
    },

    studio: {
      type: String,
      trim: true,
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
        ],
      },
    ],

    seasons: [
      {
        seasonNumber: Number,
        episodes: Number,
        cover: String,
        releaseYear: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", animeSchema);