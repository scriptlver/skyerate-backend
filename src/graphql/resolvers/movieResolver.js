const movieController = require("../../controllers/movieController");

const movieResolver = {
  Query: {
    movies: async () => {
      return await movieController.getAllMovie();
    },

    movie: async (_, { id }) => {
      return await movieController.getMovieById(id);
    },

    moviesByGenre: async (_, { genre }) => {
      return await movieController.getMovieByGenre(genre);
    },
    moviesByIds: async (_, { ids }) => {
              return await movieResolver.getMoviesByIds(ids);
            },
  },

  Mutation: {
    createMovie: async (_, { data }) => {
      return await movieController.createMovie(data);
    },

    updateMovie: async (_, { id, data }) => {
      return await movieController.updateMovie(id, data);
    },

    deleteMovie: async (_, { id }) => {
      return await movieController.deleteMovie(id);
    },
  },
};

module.exports = movieResolver;