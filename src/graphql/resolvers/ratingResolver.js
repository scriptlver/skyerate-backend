const ratingController = require("../../controllers/ratingController");

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
  },
};

module.exports = ratingResolver;