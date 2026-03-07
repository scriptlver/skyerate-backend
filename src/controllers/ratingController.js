const Rating = require("../models/Rating");
const User = require("../models/User");
const Book = require("../models/Book");
const Song = require("../models/Song");



async function populateItem(rating) {
  if (!rating) return rating;

  const typeMap = {
    Book,
    Song,
  };

  const Model = typeMap[rating.itemType];
  if (!Model) return rating;

  const item = await Model.findById(rating.itemId);
  rating.item = item; 
  return rating;
}


async function createRating(data) {
  try {
    if (data.subRatings && data.subRatings.length > 0) {
      const total = data.subRatings.reduce((acc, r) => acc + r.score, 0);
      data.finalScore = Math.round((total / data.subRatings.length) * 100) / 100;
    } else if (data.finalScore !== undefined && data.finalScore !== null) {
      data.finalScore = Math.round(data.finalScore * 100) / 100;
    }

    const rating = await Rating.create(data);
    await rating.populate("user");
    return await populateItem(rating);
  } catch (err) {
    throw err;
  }
}


async function updateRating(id, data) {
  try {
    if (data.subRatings && data.subRatings.length > 0) {
      const total = data.subRatings.reduce((acc, r) => acc + r.score, 0);
      data.finalScore = Math.round((total / data.subRatings.length) * 100) / 100;
    } else if (data.finalScore !== undefined && data.finalScore !== null) {
      data.finalScore = Math.round(data.finalScore * 100) / 100;
    }

    const updated = await Rating.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("user");

    return await populateItem(updated);
  } catch (err) {
    throw err;
  }
}


async function getAllRatings() {
  const ratings = await Rating.find().sort({ createdAt: -1 }).populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getRatingsByUser(userId) {
  const ratings = await Rating.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getRatingsByItem(itemId) {
  const ratings = await Rating.find({ itemId })
    .sort({ createdAt: -1 })
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getRatingsByType(itemType) {
  const ratings = await Rating.find({ itemType })
    .sort({ createdAt: -1 })
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getRatingById(id) {
  const rating = await Rating.findById(id).populate("user");
  return await populateItem(rating);
}


async function getTopRatings(limit = 10) {
  const ratings = await Rating.find()
    .sort({ finalScore: -1 })
    .limit(limit)
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getRecentRatings(limit = 10) {
  const ratings = await Rating.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function getTrendingRatings(limit = 10) {
  const ratings = await Rating.find()
    .sort({ finalScore: -1, createdAt: -1 })
    .limit(limit)
    .populate("user");
  return await Promise.all(ratings.map(populateItem));
}


async function deleteRating(id) {
  const deleted = await Rating.findByIdAndDelete(id);
  return !!deleted;
}

module.exports = {
  createRating,
  updateRating,
  getAllRatings,
  getRatingsByUser,
  getRatingsByItem,
  getRatingsByType,
  getRatingById,
  getTopRatings,
  getRecentRatings,
  getTrendingRatings,
  deleteRating,
};