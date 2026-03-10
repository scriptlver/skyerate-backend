const FigureSkating = require("../models/FigureSkating");

async function createPerformance(input) {
  if (input.modality) {
    input.modality = input.modality.toLowerCase();
  }
  
  return FigureSkating.create(input);
}

async function getAllPerformances() {
  return FigureSkating.find().sort({ createdAt: -1 });
}

async function getPerformanceById(id) {
  return FigureSkating.findById(id);
}

async function getPerformancesBySkater(skaterName) {
  return FigureSkating.find({
    skaters: { $regex: new RegExp(skaterName, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByCountry(country) {
  return FigureSkating.find({
    skaterCountry: { $regex: new RegExp(country, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByModality(modality) {
  return FigureSkating.find({
    modality: { $regex: new RegExp(modality, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByCategory(category) {
  return FigureSkating.find({
    category: { $regex: new RegExp(category, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByEvent(event) {
  return FigureSkating.find({
    event: { $regex: new RegExp(event, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByRanking(ranking) {
  return FigureSkating.find({ currentRanking: ranking }).sort({ createdAt: -1 });
}

async function getPerformancesByMusic(music) {
  return FigureSkating.find({
    music: { $regex: new RegExp(music, "i") },
  }).sort({ createdAt: -1 });
}

async function getPerformancesByArtist(artist) {
  return FigureSkating.find({
    artist: { $regex: new RegExp(artist, "i") },
  }).sort({ createdAt: -1 });
}

async function getTopRatedPerformances() {
  return FigureSkating.find().sort({ totalSegmentScore: -1 }).limit(10);
}

async function updatePerformance(id, input) {
  return FigureSkating.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
}

async function deletePerformance(id) {
  const deleted = await FigureSkating.findByIdAndDelete(id);
  return !!deleted;
}

module.exports = {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  getPerformancesBySkater,
  getPerformancesByCountry,
  getPerformancesByModality,
  getPerformancesByCategory,
  getPerformancesByEvent,
  getPerformancesByRanking,
  getPerformancesByMusic,
  getPerformancesByArtist,
  getTopRatedPerformances,
  updatePerformance,
  deletePerformance,
};