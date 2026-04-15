const Book = require("../models/Book");
const Song = require("../models/Song");
const Anime = require("../models/Anime"); // importar o model de Anime
const Movie = require("../models/Movie");


async function search(query) {
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { author: { $regex: new RegExp(query, "i") } },
        { seriesName: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    const songs = await Song.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { artist: { $regex: new RegExp(query, "i") } },
        { album: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    const animes = await Anime.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { originalTitle: { $regex: new RegExp(query, "i") } },
        { studio: { $regex: new RegExp(query, "i") } },
        { genres: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    const performances = await FigureSkating.find({
      $or: [
        { skaters: { $regex: new RegExp(query, "i") } },
        { music: { $regex: new RegExp(query, "i") } },
        { artist: { $regex: new RegExp(query, "i") } },
        { modality: { $regex: new RegExp(query, "i") } },
        { category: { $regex: new RegExp(query, "i") } },
        { event: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    const movies = await Movie.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { director: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    const series = await Serie.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { director: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(5);

    return {
      books,
      songs,
      animes,
      performances,
      movies,
      series,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao fazer busca global");
  }
}

module.exports = {
  search,
};