const Rating = require("../models/Rating");
const User = require("../models/User");

const Book = require("../models/Book");
const Song = require("../models/Song");
const Movie = require("../models/Movie");
const Anime = require("../models/Anime");
const Serie = require("../models/Serie");
const FigureSkating = require("../models/FigureSkating");
const typeMap = { Book, Song, Movie, Anime, Serie, FigureSkating };

async function populateItem(rating) {
  if (!rating) return rating;


  const Model = typeMap[rating.itemType];
  if (!Model) {
    rating.item = null;
    return rating;
  }

  try {
    const item = await Model.findById(rating.itemId);

    if (!item) {
     
      rating.item = {
        id: rating.itemId,
        title: "Desconhecido",
        cover: null,
        __typename: rating.itemType,
      };
      return rating;
    }

    const obj = item.toObject();
    rating.item = { ...obj, id: obj._id, __typename: rating.itemType };
    return rating;
  } catch (err) {
  
    rating.item = {
      id: rating.itemId,
      title: "Desconhecido",
      cover: null,
      __typename: rating.itemType,
    };
    return rating;
  }
}

function calculateFinalScore(data) {
  if (data.subRatings && data.subRatings.length > 0) {
    const total = data.subRatings.reduce((acc, r) => acc + r.score, 0);
    return Math.round((total / data.subRatings.length) * 100) / 100;
  }
  if (data.finalScore !== undefined && data.finalScore !== null) {
    return Math.round(data.finalScore * 100) / 100;
  }
  return null;
}

async function createRating(data) {
  try {
    if (!data.itemId || !data.itemType || !data.user) {
      throw new Error("itemId, itemType e user são obrigatórios.");
    }

    const existingRating = await Rating.findOne({
      itemId: data.itemId,
      itemType: data.itemType,
      user: data.user,
    });

    if (existingRating) {
      throw new Error("Você já avaliou este item.");
    }

    data.finalScore = calculateFinalScore(data);
    const rating = await Rating.create(data);
    await rating.populate("user");

    return await populateItem(rating);
  } catch (err) {
    throw new Error(`Erro ao criar avaliação: ${err.message}`);
  }
}

async function updateRating(id, data) {
  try {
    const rating = await Rating.findById(id);
    if (!rating) throw new Error("Avaliação não encontrada.");

    data.finalScore = calculateFinalScore(data);

    if (data.isFavoriteOfMonth === true) {
      await Rating.updateMany(
        { user: rating.user, _id: { $ne: id } },
        { isFavoriteOfMonth: false }
      );
    }

    const updated = await Rating.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("user");

    console.log(updated.isFavoriteOfMonth);

    return await populateItem(updated);
  } catch (err) {
    throw new Error(`Erro ao atualizar avaliação: ${err.message}`);
  }
}

async function getAllRatings() {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 }).populate("user");
    return await Promise.all(ratings.map(populateItem));
  } catch (err) {
    throw new Error("Erro ao buscar avaliações.");
  }
}

async function getRatingsByUser(userId) {
  try {
    const ratings = await Rating.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user");

    return await Promise.all(ratings.map(populateItem));
  } catch (err) {
    throw new Error("Erro ao buscar avaliações do usuário.");
  }
}

async function getRatingsByItem(itemId) {
  try {
    const ratings = await Rating.find({ itemId })
      .sort({ createdAt: -1 })
      .populate("user");

    return await Promise.all(ratings.map(populateItem));
  } catch (err) {
    throw new Error("Erro ao buscar avaliações do item.");
  }
}

async function getRatingsByType(itemType) {
  try {
    const ratings = await Rating.find({ itemType })
      .sort({ createdAt: -1 })
      .populate("user");

    return await Promise.all(ratings.map(populateItem));
  } catch (err) {
    throw new Error("Erro ao buscar avaliações por tipo.");
  }
}

async function getRatingById(id) {
  try {
    const rating = await Rating.findById(id).populate("user");
    if (!rating) throw new Error("Avaliação não encontrada.");
    return await populateItem(rating);
  } catch (err) {
    throw new Error(`Erro ao buscar avaliação: ${err.message}`);
  }
}

async function deleteRating(id) {
  try {
    const deleted = await Rating.findByIdAndDelete(id);
    if (!deleted) throw new Error("Avaliação não encontrada.");
    return true;
  } catch (err) {
    throw new Error(`Erro ao deletar avaliação: ${err.message}`);
  }
}

async function getFavoriteOfMonth(userId) {
  try {
    const rating = await Rating.findOne({
      user: userId,
      isFavoriteOfMonth: true,
    }).populate("user");

    if (!rating) return null;

    return await populateItem(rating.toObject());
  } catch (err) {
    throw new Error("Erro ao buscar favorito do mês.");
  }
}

async function likeRating(ratingId, userId) {
  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) throw new Error("Avaliação não encontrada");

    const alreadyLiked = rating.likes.some(
      (id) => id.toString() === userId
    );

    if (!alreadyLiked) {
      rating.likes.push(userId);
      await rating.save();
    }

    return await rating.populate("user");
  } catch (err) {
    throw new Error("Erro ao curtir avaliação");
  }
}

async function unlikeRating(ratingId, userId) {
  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) throw new Error("Avaliação não encontrada");

    rating.likes = rating.likes.filter(
      (id) => id.toString() !== userId
    );

    await rating.save();

    return rating.populate("user");
  } catch (err) {
    throw new Error("Erro ao remover curtida");
  }
}

module.exports = {
  createRating,
  updateRating,
  getAllRatings,
  getRatingsByUser,
  getRatingsByItem,
  getRatingsByType,
  getRatingById,
  deleteRating,
  getFavoriteOfMonth,
  likeRating,
  unlikeRating,
  // addComment,
  //deleteComment,


};