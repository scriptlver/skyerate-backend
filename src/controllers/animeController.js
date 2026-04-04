const Anime = require("../models/Anime");
const Rating = require("../models/Rating");

async function getAllAnimes() {
  try {
    return await Anime.aggregate([
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "itemId",
          as: "ratings"
        }
      },
      {
        $addFields: {
          averageScore: { $avg: "$ratings.finalScore" },
          ratingCount: { $size: "$ratings" }
        }
      },
      {
        $project: {
          id: "$_id",
          title: 1,
          cover: 1,
          genres: 1,
          releaseYear: 1,
          studio: 1,
          status: 1,
          synopsis: 1,
          createdAt: 1,
          averageScore: 1,
          ratingCount: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);
  } catch (error) {
    throw new Error("Erro ao buscar animes");
  }
}

async function getAnimeById(id) {
  try {
    const anime = await Anime.findById(id).lean();

    if (!anime) {
      throw new Error("Anime não encontrado");
    }

    return anime;
  } catch (error) {
    throw new Error("Erro ao buscar anime");
  }
}

async function getRecentAnimes(limit = 10) {
  try {
    return await Anime.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  } catch (error) {
    throw new Error("Erro ao buscar animes recentes");
  }
}

async function getAnimesByGenre(genre, limit = 10) {
  try {
    return await Anime.find({
      genres: { $regex: new RegExp(genre, "i") }
    })
      .limit(limit)
      .lean();
  } catch (error) {
    throw new Error("Erro ao buscar animes por gênero");
  }
}

async function getAnimesByStudio(studio, limit = 10) {
  try {
    return await Anime.find({
      studio: { $regex: new RegExp(studio, "i") }
    })
      .limit(limit)
      .lean();
  } catch (error) {
    throw new Error("Erro ao buscar animes por estúdio");
  }
}

async function createAnime(input) {
  try {
    const anime = await Anime.create(input);
    return anime;
  } catch (error) {
    throw new Error("Erro ao criar anime");
  }
}

async function updateAnime(id, input) {
  try {
    const anime = await Anime.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true
    });

    if (!anime) {
      throw new Error("Anime não encontrado para atualização");
    }

    return anime;
  } catch (error) {
    throw new Error("Erro ao atualizar anime");
  }
}

async function deleteAnime(id) {
  try {
    const anime = await Anime.findByIdAndDelete(id);

    if (!anime) {
      throw new Error("Anime não encontrado");
    }

    return "Anime excluído com sucesso";
  } catch (error) {
    throw new Error("Erro ao excluir anime");
  }
}

async function getTopRatedAnimes(limit = 10) {
  try {
    return await Rating.aggregate([
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
  } catch (error) {
    throw new Error("Erro ao buscar animes mais bem avaliados");
  }
}

async function getMostPopularAnimes(limit = 10) {
  try {
    return await Rating.aggregate([
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
  } catch (error) {
    throw new Error("Erro ao buscar animes mais populares");
  }
}

async function searchAnimes(query) {
  try {
    return await Anime.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },         
        { originalTitle: { $regex: new RegExp(query, "i") } }, 
        { studio: { $regex: new RegExp(query, "i") } },        
        { genres: { $regex: new RegExp(query, "i") } },        
      ],
    })
      .limit(10) 
      .sort({ createdAt: -1 }); 
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar animes");
  }
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
  deleteAnime,
  searchAnimes,
};