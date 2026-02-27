const Song = require("../models/Song");

async function createSongService(data) {
  const { title, artist, album, imageUrl, duration, genre } = data;

  const songExists = await Song.findOne({
    title,
    artist,
  });

  if (songExists) {
    throw new Error("SONG_ALREADY_EXISTS");
  }

  const song = await Song.create({
    title,
    artist,
    album,
    imageUrl,
    duration,
    genre,
  });

  const songObject = song.toObject();

  return songObject;
}

async function getAllSongsService() {
  const songs = await Song.find();
  return songs;
}

async function getSongByIdService(id) {
  const song = await Song.findById(id);
  return song;
}

async function updateSongService(id, data) {
  const song = await Song.findByIdAndUpdate(id, data, {
    new: true,
  });

  return song;
}

async function deleteSongService(id) {
  const song = await Song.findByIdAndDelete(id);
  return song;
}

module.exports = {
  createSongService,
  getAllSongsService,
  getSongByIdService,
  updateSongService,
  deleteSongService,
};