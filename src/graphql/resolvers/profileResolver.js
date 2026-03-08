const profileController = require("../../controllers/profileController");

const profileResolver = {
  Query: {
    getProfile: async (_, { userId }) => {
      return await profileController.getProfile(userId);
    },

    getFollowers: async (_, { userId }) => {
      return await profileController.getFollowers(userId);
    },

    getFollowing: async (_, { userId }) => {
      return await profileController.getFollowing(userId);
    },
  },

  Mutation: {
    updateProfile: async (_, { userId, input }) => {
      return await profileController.updateProfile(userId, input);
    },

    addFavorite: async (_, { userId, input }) => {
      return await profileController.addFavorite(userId, input);
    },

    removeFavorite: async (_, { userId, itemId }) => {
      return await profileController.removeFavorite(userId, itemId);
    },

    setFavoriteOfMonth: async (_, { userId, itemId }) => {
      return await profileController.setFavoriteOfMonth(userId, itemId);
    },

    followUser: async (_, { userId, followId }) => {
      return await profileController.followUser(userId, followId);
    },

    unfollowUser: async (_, { userId, unfollowId }) => {
      return await profileController.unfollowUser(userId, unfollowId);
    },
  },
};

module.exports = profileResolver;