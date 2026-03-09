const Anime = require("../models/Anime");
const Rating = require("../models/Rating");

async function getAllAnimes() {
  return Anime.find().sort({ createdAt: -1 }).lean();
}

async function getAnimeById(id) {
  return Anime.findById(id).lean();
}

async function getRecentAnimes(limit = 10) {
  return Anime.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

async function getAnimesByGenre(genre, limit = 10) {
  return Anime.find({
    genres: { $regex: new RegExp(genre, "i") }
  })
    .limit(limit)
    .lean();
}

async function getAnimesByStudio(studio, limit = 10) {
  return Anime.find({
    studio: { $regex: new RegExp(studio, "i") }
  })
    .limit(limit)
    .lean();
}

async function createAnime(input) {
  return Anime.create(input);
}

async function updateAnime(id, input) {
  return Anime.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true
  });
}

async function deleteAnime(id) {
  const anime = await Anime.findByIdAndDelete(id);
  if (!anime) throw new Error("Anime não encontrado");
  return "Anime excluído com sucesso";
}

async function getTopRatedAnimes(limit = 10) {

  return Rating.aggregate([
    { $match: { itemType: "Anime" } },

    {
      $group: {
        _id: "$itemId",
        averageScore: { $avg: "$finalScore" },
        ratingCount: { $sum: 1 }
      }
    },

    { $sort: { averageScore: -1 } },

    { $limit: limit },

    {
      $lookup: {
        from: "animes",
        localField: "_id",
        foreignField: "_id",
        as: "anime"
      }
    },

    { $unwind: "$anime" },

    {
      $project: {
        id: "$anime._id",
        title: "$anime.title",
        cover: "$anime.cover",
        releaseYear: "$anime.releaseYear",
        averageScore: 1,
        ratingCount: 1
      }
    }
  ]);
}

async function getMostPopularAnimes(limit = 10) {

  return Rating.aggregate([
    { $match: { itemType: "Anime" } },

    {
      $group: {
        _id: "$itemId",
        ratingCount: { $sum: 1 },
        averageScore: { $avg: "$finalScore" }
      }
    },

    { $sort: { ratingCount: -1 } },

    { $limit: limit },

    {
      $lookup: {
        from: "animes",
        localField: "_id",
        foreignField: "_id",
        as: "anime"
      }
    },

    { $unwind: "$anime" },

    {
      $project: {
        id: "$anime._id",
        title: "$anime.title",
        cover: "$anime.cover",
        releaseYear: "$anime.releaseYear",
        ratingCount: 1,
        averageScore: 1
      }
    }
  ]);
}

module.exports = {
  getAllAnimes,
  getAnimeById,
  getRecentAnimes,
  getAnimesByGenre,
  getAnimesByStudio,
  getTopRatedAnimes,
  getMostPopularAnimes,
  createAnime,
  updateAnime,
  deleteAnime
};