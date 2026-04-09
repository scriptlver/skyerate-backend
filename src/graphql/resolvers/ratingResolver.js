const ratingController = require("../../controllers/ratingController");
const Book = require("../../models/Book");
const Song = require("../../models/Song");
const Movie = require("../../models/Movie");
const Anime = require("../../models/Anime");
const Series = require("../../models/Serie");
const FigureSkating = require("../../models/FigureSkating");
const typeMap = { Book, Song, Movie, Anime, Series, FigureSkating };
const ratingResolver = {
  Query: {
    ratings: async () => {
      return await ratingController.getAllRatings();
    },
    rating: async (_, { id }) => {
      return await ratingController.getRatingById(id);
    },
    ratingsByUser: async (_, { userId }) => {
      return await ratingController.getRatingsByUser(userId);
    },
    ratingsByItem: async (_, { itemId }) => {
      return await ratingController.getRatingsByItem(itemId);
    },
    ratingsByType: async (_, { itemType }) => {
      return await ratingController.getRatingsByType(itemType);
    },
    topRatedRatings: async (_, { limit = 10 }) => {
      return await ratingController.getTopRatings(limit);
    },
    recentRatings: async (_, { limit = 10 }) => {
      return await ratingController.getRecentRatings(limit);
    },
    trendingRatings: async (_, { limit = 10 }) => {
      return await ratingController.getTrendingRatings(limit);
    },
    favoriteOfMonth: async (_, { userId }) => {
  return await ratingSController.getFavoriteOfMonth(userId);
}
  },
  Mutation: {
    createRating: async (_, { input }) => {
      return await ratingController.createRating(input);
    },
    updateRating: async (_, { id, input }) => {
      return await ratingController.updateRating(id, input);
    },
    deleteRating: async (_, { id }) => {
      return await ratingController.deleteRating(id);
    },
    likeRating: async (_, { ratingId, userId }) => {
      return await ratingController.likeRating(ratingId, userId);
    },
    unlikeRating: async (_, { ratingId, userId }) => {
      return await ratingController.unlikeRating(ratingId, userId);
    },
    addComment: async (_, { ratingId, userId, text }) => {
      return await ratingController.addComment(ratingId, userId, text);
    },
    deleteComment: async (_, { ratingId, commentId }) => {
      return await ratingController.deleteComment(ratingId, commentId);
    },
  },
  Rating: {
    item: async (rating) => {
      const Model = typeMap[rating.itemType];
      return Model ? await Model.findById(rating.itemId) : null;
    },
    likesCount: (rating) => rating.likes?.length || 0,
  },
  ItemUnion: { __resolveType: (obj) => obj.constructor.modelName },
};
module.exports = ratingResolver;
