const Song = require("../models/Song");

// criar música
async function createSong(data) {
  try {
    const song = await Song.create(data);
    return song;
  } catch (error) {
    throw new Error("Erro ao criar música");
  }
}

// listar todas
async function getAllSongs() {
  try {
    return await Song.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Erro ao buscar músicas");
  }
}

// listar por gênero
async function getSongsByGenre(genre) {
  try {
    const songs = await Song.find({
      genre: genre.toLowerCase(),
    }).sort({ createdAt: -1 });

    if (!songs || songs.length === 0) {
      throw new Error("Nenhuma música encontrada para esse gênero");
    }

    return songs;
  } catch (error) {
    throw new Error("Erro ao buscar músicas por gênero");
  }
}

// listar por artista
async function getSongsByArtist(artist) {
  try {
    const songs = await Song.find({
      artist: { $regex: new RegExp(`^${artist}$`, "i") },
    }).sort({ createdAt: -1 });

    if (!songs || songs.length === 0) {
      throw new Error("Nenhuma música encontrada para esse artista");
    }

    return songs;
  } catch (error) {
    throw new Error("Erro ao buscar músicas por artista");
  }
}

// buscar por id
async function getSongById(id) {
  try {
    const song = await Song.findById(id);

    if (!song) {
      throw new Error("Música não encontrada");
    }

    return song;
  } catch (error) {
    throw new Error("Erro ao buscar música");
  }
}

// atualizar
async function updateSong(id, data) {
  try {
    const song = await Song.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      throw new Error("Música não encontrada");
    }

    return song;
  } catch (error) {
    throw new Error("Erro ao atualizar música");
  }
}

// deletar
async function deleteSong(id) {
  try {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      throw new Error("Música não encontrada");
    }

    return "Música deletada com sucesso";
  } catch (error) {
    throw new Error("Erro ao deletar música");
  }
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