const Song = require("../models/Song");

async function createSongService(data) {
  const { title, artist, album, coverImage, duration, genre, releaseDate, externalId } = data;

  const songExists = await Song.findOne({ title, artist });

  if (songExists) {
    throw new Error("SONG_ALREADY_EXISTS");
  }

  const song = await Song.create({
    title,
    artist,
    album,
    coverImage,  
    duration,
    genre,
    releaseDate,
    externalId,
  });

  return song.toObject();
}

async function getAllSongsService() {
  return await Song.find();
}

async function getSongByIdService(id) {
  return await Song.findById(id);
}

async function updateSongService(id, data) {
  const song = await Song.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true, 
    }
  );

  return song;
}

async function deleteSongService(id) {
  return await Song.findByIdAndDelete(id);
}

module.exports = {
  createSongService,
  getAllSongsService,
  getSongByIdService,
  updateSongService,
  deleteSongService,
};