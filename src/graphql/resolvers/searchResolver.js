const searchController = require("../../controllers/searchController");

const searchResolver = {
  Query: {
    search: async (_, { query }) => {
      return await searchController.search(query);
    }
  }
};

module.exports = searchResolver;