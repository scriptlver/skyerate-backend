const Book = require("../models/Book");
const Song = require("../models/Song");

async function search(query) {
  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { author: { $regex: new RegExp(query, "i") } },
        { seriesName: { $regex: new RegExp(query, "i") } }
      ]
    }).limit(5);

    const songs = await Song.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { artist: { $regex: new RegExp(query, "i") } },
        { album: { $regex: new RegExp(query, "i") } }
      ]
    }).limit(5);

    return {
      books,
      songs
    };

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao fazer busca global");
  }
}

module.exports = {
  search
};