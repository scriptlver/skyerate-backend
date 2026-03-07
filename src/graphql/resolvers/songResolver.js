const songController = require("../../controllers/songController");

const songResolver = {
  Query: {
    songs: async () => {
      return await songController.getAllSongs();
    },

    song: async (_, { id }) => {
      return await songController.getSongById(id);
    },

    songsByGenre: async (_, { genre }) => {
      return await songController.getSongsByGenre(genre);
    },

    songsByArtist: async (_, { artist }) => {
      return await songController.getSongsByArtist(artist);
    },
  },

  Mutation: {
    createSong: async (_, { data }) => {
      return await songController.createSong(data);
    },

    updateSong: async (_, { id, data }) => {
      return await songController.updateSong(id, data);
    },

    deleteSong: async (_, { id }) => {
      return await songController.deleteSong(id);
    },
  },
};

module.exports = songResolver;
