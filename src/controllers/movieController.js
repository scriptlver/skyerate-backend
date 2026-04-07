const Movie= require("../models/Movie");

// criar filme 
async function createMovie(data) {
 try{
    const movie = await Movie.create(data);
    return movie;
 }catch (err) {
    throw new Error("Erro ao criar filme");  
  }
}

// listar todas 
async function getAllMovie() {
  try{
     return await Movie.find().sort({ createdAt: -1 }); 
  }catch (err){
     throw new Error("Erro ao buscar filme");
  }
   
}

// listar por 
async function getMovieByGenre(genre) {
  try {
    const movie = await Movie.find({
      genre: genre.toLowerCase(),
    }).sort({ createdAt: -1 });

    if (!movie || movie.length === 0) {
      throw new Error("Nenhum filme encontrado para esse gênero");
    }

    return movie;

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar filmes por gênero");
  }
}
// buscar por id
async function getMovieById(id) {
  try{
    const movie = await Movie.findById(id);

    if (!movie) {
      throw new Error("Filme não encontrada");
    }

    return movie;

 }catch (error) {
    throw new Error("Erro ao buscar filme");
  } 
}

// atualizar
async function updateMovie (id,data) {
  try{
    const movie =await Movie.findByIdAndUpdate(id, data, {
     new: true,
     runValidators: true,
   }); 

   if (!movie){
     throw new Error("Filme não encontrado");
   }
   return movie

  }catch (error){
     throw new Error("Erro ao atualizar filme");
  }
}

// deletar
async function deleteMovie(id) {
  try{
    const movie = await Movie.findByIdAndDelete(id);

    if(!movie){
      throw new Error("Filme não encontrado");
    }

    return "Filme deletado com sucesso"
    
  }catch (error) {
    throw new Error("Erro ao deletar filme");
  }
}

async function getMoviesByIds(ids) {
  try {

    const movies = await Movie.find({ _id: { $in: ids } });
    return movies;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar filmes por IDs");
  }
}

module.exports = {
  createMovie,
  getAllMovie,
  getMovieByGenre,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMoviesByIds,
};