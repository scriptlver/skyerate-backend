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

  Rating: {
    item: async (rating) => {
      const typeMap = {
        Book: require("../../models/Book"),
        Song: require("../../models/Song"),
      };
      const Model = typeMap[rating.itemType];
      if (!Model) return null;
      return await Model.findById(rating.itemId);
    },
  },

  ItemUnion: {
    __resolveType: (obj) => {
      if (obj.pages !== undefined) return "Book";
      if (obj.album !== undefined) return "Song";
      return null;
    },
  },
};

module.exports = ratingResolver;