const {
createMovieService,
getAllMovieService,
getMovieByGenreService,
getMovieByIdService,
updateMovieService,
deleteMovieService,
} = require("../services/movieService");

// criar filme 
async function createMovie(req,res,next) {
 try{
    const movie = await createMovieService(req.body);
    
    return res.status(201).json({
        message:"Filme criado com sucesso",
        movie,
    });
 }catch (err) {
    if (err.message === "MOVIE_ALREADY_EXISTS") {
      return res.status(409).json({ message: "Esse filme já foi cadastrado" });
    }

    next(err);
  }
}

// listar todas 
async function getAllMovie(req,res,next) {
    try{
        const movie = await getAllMovieService();

        return res.status(200).json({
            message:"Lista de filmes",
            movie,
        });
    }catch (err) {
    next(err);
    }  
}

// listar por gênero
async function getMovieByGenre(req,res,next) {
    try{
        const { genre } = req.params;
        const movie = await getMovieByGenreService(genre);
       
        return res.status(200).json({
            message:`Lista de filmes por gênero ${genre}`,
            movie,
        });
    }catch (err) {
    next(err);
    }    
}

// buscar por id
async function getMovieById(req, res, next) {
  try {
    const movie = await getMovieByIdService(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    return res.status(200).json({
      message: "Filme encontrado",
      movie,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "ID inválido" });
    }

    next(err);
  }
}

// atualizar
async function updateMovie (req,res,next) {
 try{
    const movie = await updateMovieService(req.params.id, req.body);

    return res.status(200).json({
        message: "Filme atualizado com sucesso",
        movie,
    });

 }catch (err) {
    if(err.message === "MOVIE_NOT_FOUND"){
        return res.status(404).json({ message: "Filme não encontrado"});
    }

    if(err.message === "CANNOT_SET_BOOKNAME_IF_NOT_BOOK"){
        return res.status(400).json({message: "Não é possivel definir um nome de um filme,para um filme que não pertence ao um livro"});
    }

    if(err.message === "CANNOT_SET_SAGANAME_IF_NOT_SAGA"){
        return res.status(400).json({message: "Não é possivel definir um nome de um filme,para um filme que não pertence a uma saga"});
    }

    next(err);
 }
    
}

// deletar
async function deleteMovie(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await deleteMovieService(id);

    return res.status(200).json(movie);
  } catch (err) {
    if (err.message === "MOVIE_NOT_FOUND") {
      return res.status(404).json({
        message: "Filme não encontrado.",
      });
    }

    next(err);
  }
}
