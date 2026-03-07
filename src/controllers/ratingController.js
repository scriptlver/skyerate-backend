const Rating = require("../models/Rating");
const User = require("../models/User");

async function createRating(data) {
  try {
    if (data.subRatings && data.subRatings.length > 0) {
      const total = data.subRatings.reduce((acc, r) => acc + r.score, 0);
      data.finalScore = total / data.subRatings.length;
    }

    const rating = await Rating.create(data);
    return await rating.populate("user");
  } catch (err) {
    throw err;
  }
}

async function getAllRatings() {
  return Rating.find().sort({ createdAt: -1 }).populate("user");
}

async function getRatingsByUser(userId) {
  return Rating.find({ user: userId }).sort({ createdAt: -1 }).populate("user");
}

async function getRatingsByItem(itemId) {
  return Rating.find({ itemId }).sort({ createdAt: -1 }).populate("user");
}

async function getRatingsByType(itemType) {
  return Rating.find({ itemType }).sort({ createdAt: -1 }).populate("user");
}

async function getRatingById(id) {
  return Rating.findById(id).populate("user");
}

async function getTopRatings(limit = 10) {
  return Rating.find().sort({ finalScore: -1 }).limit(limit).populate("user");
}

async function getRecentRatings(limit = 10) {
  return Rating.find().sort({ createdAt: -1 }).limit(limit).populate("user");
}

async function getTrendingRatings(limit = 10) {
  return Rating.find()
    .sort({ finalScore: -1, createdAt: -1 })
    .limit(limit)
    .populate("user");
}

async function deleteRating(id) {
  const deleted = await Rating.findByIdAndDelete(id);
  return !!deleted;
}

async function updateRating(id, data) {
  try {
    if (data.subRatings && data.subRatings.length > 0) {
      const total = data.subRatings.reduce((acc, r) => acc + r.score, 0);
      data.finalScore = total / data.subRatings.length;
    }

    const updated = await Rating.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("user");

    return updated;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createRating,
  getAllRatings,
  getRatingsByUser,
  getRatingsByItem,
  getRatingById,
  getRatingsByType,
  getRecentRatings,
  getTopRatings,
  getTrendingRatings,
  deleteRating,
  updateRating,
};
