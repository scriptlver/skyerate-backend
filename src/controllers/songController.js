const Song = require("../models/Song");

// criar música
async function createSong(data) {
  try {
    const song = await Song.create(data);
    return song;
  } catch (err) {
    throw err;
  }
}

// listar todas
async function getAllSongs() {
  return await Song.find().sort({ createdAt: -1 });
}

// listar por gênero
async function getSongsByGenre(genre) {
  return await Song.find({
    genre: genre.toLowerCase(),
  }).sort({ createdAt: -1 });
}

// listar por artista
async function getSongsByArtist(artist) {
  return await Song.find({
    artist: { $regex: new RegExp(`^${artist}$`, "i") },
  }).sort({ createdAt: -1 });
}

// buscar por id
async function getSongById(id) {
  return await Song.findById(id);
}

// atualizar
async function updateSong(id, data) {
  return await Song.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

// deletar
async function deleteSong(id) {
  await Song.findByIdAndDelete(id);
  return "Música deletada com sucesso";
}

module.exports = {
  createSong,
  getAllSongs,
  getSongsByGenre,
  getSongsByArtist,
  getSongById,
  updateSong,
  deleteSong,
};