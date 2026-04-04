const FigureSkating = require("../models/FigureSkating");

async function createPerformance(input) {
  try {
    if (input.modality) {
      input.modality = input.modality.toLowerCase();
    }
    //Validação do Schema, se faltar campo obrigatório,
    //o erro vai para o catch.
    return await FigureSkating.create(input);
  } catch (error) {
    throw new Error(`Erro ao criar performance: ${error.message}`);
  }
}

//Ações de leitura e filtros

//Busca tudo e ordena pelos mais recentes (createdAt: -1).
async function getAllPerformances() {
  try {
    return await FigureSkating.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Erro ao buscar todas as performances.");
  }
}

async function getPerformanceById(id) {
  try {
    const performance = await FigureSkating.findById(id);
    if (!performance) throw new Error("Performance não encontrada com este ID.");
    return performance;
  } catch (error) {
    throw new Error(error.message);
  }
}

//Filtros com Regex: Permitem busca parcial e ignoram 
//maiúsculas/minúsculas ("i").
async function getPerformancesBySkater(skaterName) {
  try {
    return await FigureSkating.find({
      skaters: { $regex: new RegExp(skaterName, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar por skater: ${skaterName}`);
  }
}

async function getPerformancesByCountry(country) {
  try {
    return await FigureSkating.find({
      skaterCountry: { $regex: new RegExp(country, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar performances do país: ${country}`);
  }
}

async function getPerformancesByModality(modality) {
  try {
    return await FigureSkating.find({
      modality: { $regex: new RegExp(modality, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar modalidade: ${modality}`);
  }
}

async function getPerformancesByCategory(category) {
  try {
    return await FigureSkating.find({
      category: { $regex: new RegExp(category, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar categoria: ${category}`);
  }
}

async function getPerformancesByEvent(event) {
  try {
    return await FigureSkating.find({
      event: { $regex: new RegExp(event, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar evento: ${event}`);
  }
}

//Busca exata por número (não usa Regex pois é inteiro).
async function getPerformancesByRanking(ranking) {
  try {
    return await FigureSkating.find({ currentRanking: ranking }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar pelo ranking: ${ranking}`);
  }
}

async function getPerformancesByMusic(music) {
  try {
    return await FigureSkating.find({
      music: { $regex: new RegExp(music, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar pela música: ${music}`);
  }
}

async function getPerformancesByArtist(artist) {
  try {
    return await FigureSkating.find({
      artist: { $regex: new RegExp(artist, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar pelo artista: ${artist}`);
  }
}

//Ranking top 10 melhores: Ordena pela maior pontuação técnica total.
async function getTopRatedPerformances() {
  try {
    return await FigureSkating.find().sort({ totalSegmentScore: -1 }).limit(10);
  } catch (error) {
    throw new Error("Erro ao buscar o ranking top 10.");
  }
}

//Atualiza o registro/Retorna o dado já atualizado.
async function updatePerformance(id, input) {
  try {
    const updated = await FigureSkating.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true, //Importante: força o Schema a validar os novos dados.
    });
    if (!updated) throw new Error("Não foi possível atualizar: ID não encontrado.");
    return updated;
  } catch (error) {
    throw new Error(`Erro no update: ${error.message}`);
  }
}

//Remove o registro do banco através do ID gerado pelo MongoDB.
async function deletePerformance(id) {
  try {
    const deleted = await FigureSkating.findByIdAndDelete(id);
    if (!deleted) throw new Error("Não foi possível deletar: ID não encontrado.");
    return "Performance removida com sucesso (Disband confirmado).";
  } catch (error) {
    throw new Error(`Erro ao deletar: ${error.message}`);
  }
}

async function searchPerformances(_, { query }) {
  try {
   
    const regex = new RegExp(query, "i");

    const performances = await FigureSkating.find({
      $or: [
        { skaters: { $elemMatch: { $regex: regex } } },
        { music: { $elemMatch: { $regex: regex } } },
        { artist: { $elemMatch: { $regex: regex } } },
        { modality: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    }).sort({ createdAt: -1 });

    return performances;
  } catch (err) {
    console.error("Erro no searchPerformances:", err);
    return [];
  }
}


//Exportação de todas as funções
//para serem usadas nos Resolvers do GraphQL.
module.exports = {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  getPerformancesBySkater,
  getPerformancesByCountry,
  getPerformancesByModality,
  getPerformancesByCategory,
  getPerformancesByEvent,
  getPerformancesByRanking,
  getPerformancesByMusic,
  getPerformancesByArtist,
  getTopRatedPerformances,
  updatePerformance,
  deletePerformance,
  searchPerformances,
};