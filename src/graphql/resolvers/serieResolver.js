const serieController = require("../../controllers/serieController");

module.exports = {
  Query: {
    series: () => serieController.getAllSeries(),
    serie: (_, { id }) => serieController.getSerieById(id),
    seriesByGenre: (_, { genre }) => serieController.getSeriesByGenre(genre),
  },

  Mutation: {
    createSerie: (_, { data }) => serieController.createSerie(data),
    updateSerie: (_, { id, data }) => serieController.updateSerie(id, data),
    deleteSerie: (_, { id }) => serieController.deleteSerie(id),
  },

  addReview: async (_, { serieId, review }) => {
    const serie = await Serie.findById(serieId);

    if (!serie) throw new Error("Série não encontrada");

    serie.reviews.push(review);

    await serie.save();

    return serie;
  },
};
