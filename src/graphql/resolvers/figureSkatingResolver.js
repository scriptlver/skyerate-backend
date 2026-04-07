const skatingController = require("../../controllers/figureSkatingController");

const figureSkatingResolver = {
  Query: {
    //Retorna todas as performances
    performances: async () => {
      return await skatingController.getAllPerformances();
    },

    //Busca uma performance específica por ID
    performance: async (_, { id }) => {
      return await skatingController.getPerformanceById(id);
    },

    //Busca por nome do(s) patinador(es)
    performanceByName: async (_, { skaters }) => {
      return await skatingController.getPerformancesBySkater(skaters);
    },

    //Busca pelo país
    performanceByCountry: async (_, { skaterCountry }) => {
      return await skatingController.getPerformancesByCountry(skaterCountry);
    },

    //Busca pela modalidade
    performanceByModality: async (_, { modality }) => {
      return await skatingController.getPerformancesByModality(modality);
    },

    //Busca pela categoria
    performanceByCategory: async (_, { category }) => {
      return await skatingController.getPerformancesByCategory(category);
    },

    //Busca pelo evento
    performanceByEvent: async (_, { event }) => {
      return await skatingController.getPerformancesByEvent(event);
    },

    //Busca por colocação no ranking
    performanceByRanking: async (_, { currentRanking }) => {
      return await skatingController.getPerformancesByRanking(currentRanking);
    },

    //Busca pela música utilizada
    performanceByMusic: async (_, { music }) => {
      return await skatingController.getPerformancesByMusic(music);
    },

    //Busca pelo artista da música
    performanceByArtist: async (_, { artist }) => {
      return await skatingController.getPerformancesByArtist(artist);
    },

    //Retorna as 10 melhores pontuações
    topRatedPerformances: async () => {
      return await skatingController.getTopRatedPerformances();
    },

    searchPerformances: async (_, { query }) => {
      return await skatingController.searchPerformances(query);
    },
    performancesByIds: async (_, { ids }) => {
          return await skatingController.getPerformancesByIds(ids);
        },
  },

  Mutation: {
    //Cria um novo registro de performance
    createFigureSkating: async (_, { input }) => {
      return await skatingController.createPerformance(input);
    },

    //Atualiza dados de uma performance existente
    updateFigureSkating: async (_, { id, input }) => {
      return await skatingController.updatePerformance(id, input);
    },

    //Remove uma performance
    deleteFigureSkating: async (_, { id }) => {
      const deleted = await skatingController.deletePerformance(id);
      return deleted 
        ? "Performance deletada com sucesso" 
        : "Performance não encontrada ou já removida";
    },
  },
};

module.exports = figureSkatingResolver;