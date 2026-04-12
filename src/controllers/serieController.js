const Serie = require("../models/Serie");

// criar série
async function createSerie(data) {
  try {
    return await Serie.create(data);
  } catch (error) {
    throw new Error("Erro ao criar série");
  }
}

// listar todas
async function getAllSeries() {
  try {
    return await Serie.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Erro ao buscar séries");
  }
}

// listar por gênero
async function getSeriesByGenre(genre) {
  try {
    return await Serie.find({
      genre: { $regex: new RegExp(genre, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Erro ao buscar séries por gênero");
  }
}

// buscar por id
async function getSerieById(id) {
  try {
    const serie = await Serie.findById(id);

    if (!serie) {
      throw new Error("Série não encontrada");
    }

    return serie;
  } catch (error) {
    console.error("ERRO REAL AO BUSCAR SÉRIE:", error);
    throw new Error("Erro ao buscar série");
  }
}

// atualizar
async function updateSerie(id, data) {
  try {
    const serie = await Serie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!serie) {
      throw new Error("Série não encontrada");
    }

    return serie;
  } catch (error) {
    throw new Error("Erro ao atualizar série");
  }
}

// deletar
async function deleteSerie(id) {
  try {
    const deleted = await Serie.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error("Série não encontrada");
    }

    return "Série removida com sucesso";
  } catch (error) {
    throw new Error("Erro ao deletar série");
  }
}

// buscar várias séries por ids
async function getSeriesById(ids) {
  try {
    const series = await Serie.find({
      _id: { $in: ids },
    });

    return series;
  } catch (error) {
    console.error("Erro real ao buscar séries:", error);
    throw new Error("Erro ao buscar séries");
  }
}

module.exports = {
  createSerie,
  getAllSeries,
  getSeriesByGenre,
  getSerieById,
  updateSerie,
  deleteSerie,
  getSeriesById,
};