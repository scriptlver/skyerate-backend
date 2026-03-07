const ratingService = require("../services/ratingService");

const ratingResolver = {
  Query: {
    ratings: async () => {
      return await ratingService.getAllRatings();
    },

    rating: async (_, { id }) => {
      return await ratingService.getRatingById(id);
    },

    ratingsByUser: async (_, { userId }) => {
      return await ratingService.getRatingsByUser(userId);
    },

    ratingsByItem: async (_, { itemId }) => {
      return await ratingService.getRatingsByItem(itemId);
    },

    ratingsByType: async (_, { itemType }) => {
      return await ratingService.getRatingsByType(itemType);
    },

    topRatedRatings: async (_, { limit = 10 }) => {
      return await ratingService.getTopRatings(limit);
    },

    recentRatings: async (_, { limit = 10 }) => {
      return await ratingService.getRecentRatings(limit);
    },

    trendingRatings: async (_, { limit = 10 }) => {
      return await ratingService.getTrendingRatings(limit);
    },
  },

  Mutation: {
    createRating: async (_, { input }) => {
      return await ratingService.createRating(input);
    },

    updateRating: async (_, { id, input }) => {
      return await ratingService.updateRating(id, input);
    },
    
    deleteRating: async (_, { id }) => {
      return await ratingService.deleteRating(id);
    },
  },
};

module.exports = ratingResolver;