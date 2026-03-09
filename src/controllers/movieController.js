const Movie= require("../models/Movie");

// criar filme 
async function createMovie(data) {
 try{
    const movie = await Movie.create(data);
    return movie;
 }catch (err) {
    throw err; 
  }
}

// listar todas 
async function getAllMovie() {
  return await Movie.find().sort({ createdAt: -1 });  
}

// listar por gênero
async function getMovieByGenre(genre) {
    return await Movie.find({
        genre: genre.toLowerCase(),
      }).sort({ createdAt: -1 });
}

// buscar por id
async function getMovieById(id) {
   return await Movie.findById(id);
}

// atualizar
async function updateMovie (id,data) {
 return await Movie.findByIdAndUpdate(id, data, {
     new: true,
     runValidators: true,
   }); 
}

// deletar
async function deleteMovie(id) {
  await Movie.findByIdAndDelete(id);
    return "Filme deletado com sucesso";
}

module.exports = {
  createMovie,
  getAllMovie,
  getMovieByGenre,
  getMovieById,
  updateMovie,
  deleteMovie,
};