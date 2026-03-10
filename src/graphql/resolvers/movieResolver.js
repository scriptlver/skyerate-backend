const movieController = require("../../controllers/movieController");

const movieResolver = {
    Query:{
        movie: async () => {
            return await movieController.getAllMovie();
        },

        movie: async (_,{id}) => {
            return await movieController.getMovieById(id);
        },

        movie: async (_,{genre}) => {
             return await movieController.getMovieByGenre(genre);
        },
    },

    Mutation:{
        createMovie: async (_,{data}) => {
            return await movieController.createMovie(data);
        },

        updateMovie: async (_,{id,data}) => {
            return await movieController.updateMovie(id,data);
        },

        deleteMovie: async (_, {id}) => {
            return await movieController.deleteMovie(id);
        },
    },
};

module.exports = movieResolver;
