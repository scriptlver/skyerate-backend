const Song = require("../models/Song");

async function createSongService(data) {
  return await Song.create(data);
}

async function getAllSongsService() {
  return await Song.find()
    .sort({ createdAt: -1 })
    .lean();
}

async function getSongsByGenreService(genre) {
  return await Song.find({
    genre: genre.toLowerCase(),
  })
    .sort({ createdAt: -1 })
    .lean();
}

async function getSongByIdService(id) {
  return await Song.findById(id).lean();
}

async function updateSongService(id, data) {
  const allowedFields = [
    "title",
    "artist",
    "album",
    "genre",
    "duration",
    "releaseDate",
    "coverImage",
    "featuring",
    "songwriters",
    "producers",
    "externalLinks",
    "externalId",
    "description",
  ];

  const updateData = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  return await Song.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    lean: true,
  });
}

async function deleteSongService(id) {
  return await Song.findByIdAndDelete(id).lean();
}

module.exports = {
  createSongService,
  getAllSongsService,
  getSongsByGenreService,
  getSongByIdService,
  updateSongService,
  deleteSongService,
};