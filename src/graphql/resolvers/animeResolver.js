const animeController = require("../../controllers/animeController");

const animeResolver = {
  Query: {

    animes: async () => {
      return await animeController.getAllAnimes();
    },

    anime: async (_, { id }) => {
      return await animeController.getAnimeById(id);
    },

    recentAnimes: async (_, { limit }) => {
      return await animeController.getRecentAnimes(limit);
    },

    animesByGenre: async (_, { genre, limit }) => {
      return await animeController.getAnimesByGenre(genre, limit);
    },

    animesByStudio: async (_, { studio, limit }) => {
      return await animeController.getAnimesByStudio(studio, limit);
    },

    topRatedAnimes: async (_, { limit }) => {
      return await animeController.getTopRatedAnimes(limit);
    },

    mostPopularAnimes: async (_, { limit }) => {
      return await animeController.getMostPopularAnimes(limit);
    },
  },

  Mutation: {

    createAnime: async (_, { input }) => {
      return await animeController.createAnime(input);
    },

    updateAnime: async (_, { id, input }) => {
      return await animeController.updateAnime(id, input);
    },

    deleteAnime: async (_, { id }) => {
      return await animeController.deleteAnime(id);
    },

  },

  Anime: {
    id: (anime) => anime._id
  }
};

module.exports = animeResolver;