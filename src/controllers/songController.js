const { createSongService, getAllSongsService, getSongByIdService, updateSongService, deleteSongService,} = require("../services/songService");

async function createSong(req, res, next) {
  try {
    const song = await createSongService(req.body);

    return res.status(201).json({
      message: "Música criada com sucesso",
      song,
    });
  } catch (err) {
    if (err.message === "SONG_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Música já existe",
      });
    }

    next(err);
  }
}

async function getAllSongs(req, res, next) {
  try {
    const songs = await getAllSongsService();

    return res.status(200).json({
      message: "Lista de músicas",
      songs,
    });
  } catch (err) {
    next(err);
  }
}

async function getSongById(req, res, next) {
  try {
    const song = await getSongByIdService(req.params.id);

    if (!song) {
      return res.status(404).json({
        message: "Música não encontrada",
      });
    }

    return res.status(200).json({
      message: "Música encontrada",
      song,
    });
  } catch (err) {
    next(err);
  }
}

async function updateSong(req, res, next) {
  try {
    const song = await updateSongService(req.params.id, req.body);

    if (!song) {
      return res.status(404).json({
        message: "Música não encontrada",
      });
    }

    return res.status(200).json({
      message: "Música atualizada com sucesso",
      song,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteSong(req, res, next) {
  try {
    const song = await deleteSongService(req.params.id);

    if (!song) {
      return res.status(404).json({
        message: "Música não encontrada",
      });
    }

    return res.status(200).json({
      message: "Música deletada com sucesso",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
};