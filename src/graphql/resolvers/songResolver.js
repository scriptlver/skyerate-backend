const songController = require("../../controllers/songController");

const songResolver = {
  Query: {
    songs: () => songController.getAllSongs(),

    song: (_, { id }) => songController.getSongById(id),

    songsByGenre: (_, { genre }) => songController.getSongsByGenre(genre),

    songsByArtist: (_, { artist }) => songController.getSongsByArtist(artist),

    searchSongs: (_, { query }) => songController.searchSongs(query),

    songsByIds: async (_, { ids }) => {
          return await songController.getSongsByIds(ids);
        },
  },

  Mutation: {
    createSong: (_, { data }) => songController.createSong(data),

    updateSong: (_, { id, data }) => songController.updateSong(id, data),

    deleteSong: (_, { id }) => songController.deleteSong(id),
  },
};

module.exports = songResolver;
