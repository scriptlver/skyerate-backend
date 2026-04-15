const serieController = require("../../controllers/serieController");

module.exports = {
  Query: {
    series: (_, {search}) => serieController.getAllSeries(search),
    searchSeries: (_, { query }) => serieController.getAllSeries(query),
    serie: (_, { id }) => serieController.getSerieById(id),
    seriesByGenre: (_, { genre }) => serieController.getSeriesByGenre(genre),
    seriesById: async (_, { ids }) => {
      return await serieController.getSeriesById(ids);
    },

  },

  Mutation: {
    createSerie: (_, { data }) => serieController.createSerie(data),
    updateSerie: (_, { id, data }) => serieController.updateSerie(id, data),
    deleteSerie: (_, { id }) => serieController.deleteSerie(id),
  },

};
