const Song = require("../models/Song");

// criar música
async function createSong(data) {
  try {
    const formattedData = {
      ...data,
      releaseDate: data.releaseDate
        ? new Date(data.releaseDate)
        : null,
    };

    const song = await Song.create(formattedData);

    return {
      ...song._doc,
      releaseDate: song.releaseDate
        ? song.releaseDate.toISOString()
        : null,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

// listar todas
async function getAllSongs() {
  const songs = await Song.find();

  return songs.map((song) => ({
    ...song._doc,
    releaseDate: song.releaseDate
      ? song.releaseDate.toISOString()
      : null,
  }));
}

// listar por gênero 
async function getSongsByGenre(genre) {
  try {
    const songs = await Song.find({
      genre: { $in: [genre.toLowerCase()] },
    }).sort({ createdAt: -1 });

    if (!songs || songs.length === 0) {
      throw new Error("Nenhuma música encontrada para esse gênero");
    }

    return songs;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
    console.error(error);
    throw new Error(error.message);
  }
}

// buscar por id
async function getSongById(id) {
  const song = await Song.findById(id);

  if (!song) return null;

  return {
    ...song._doc,
    releaseDate: song.releaseDate
      ? song.releaseDate.toISOString()
      : null,
  };
}


// atualizar
async function updateSong(id, data) {
  try {
    const formattedData = {
      ...data,
      releaseDate: data.releaseDate
        ? new Date(data.releaseDate)
        : null,
    };

    const song = await Song.findByIdAndUpdate(id, formattedData, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      throw new Error("Música não encontrada");
    }

    return song;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
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
    console.error(error);
    throw new Error(error.message);
  }
}

async function searchSongs(query) {
  try {
    return await Song.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { artist: { $regex: new RegExp(query, "i") } },
        { album: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(10);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
async function getSongsByIds(ids) {
  try {

    const songs = await Song.find({ _id: { $in: ids } });
    return songs;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar músicas por IDs");
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
  searchSongs,
  getSongsByIds,
};
