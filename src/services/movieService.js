const Movie = require("../models/Movie");


async function createMovieService(data) {
    const{
        name,
        director,
        genre,
        duration,
        platform,
        releaseYear,
        isBook,
        bookName,
        isSaga,
        sagaName,
        description,
        externalLinks,
        externalId,

    }=data;

    if (externalId) {
      const movieExists = await Movie.findOne({ externalId });
   if (movieExists) {
    throw new Error("MOVIE_ALREADY_EXISTS");
   }
  }


    const movie = await Movie.create({
        name,
        director,
        genre,
        duration,
        platform,
        releaseYear,
        isBook,
        bookName:isBook? bookName:null,
        isSaga,
        sagaName:isSaga? sagaName:null,
        description,
        externalLinks,
        externalId,

    });
    return movie;
}

async function getAllMovieService() {
    return await Movie.find().sort({ createdAt: -1 }).lean();
}

async function getMovieByGenreService(genre){
    return await Movie.find({
    genre: genre.toLowerCase(),
  })
    .sort({ createdAt: -1 })
    .lean();
}

async function getMovieByIdService(id) {
  return await Movie.findById(id).lean();
}

async function updateMovieService(id,data) {
    const movieExists = await Movie.findById(id);
    if (!movieExists) {
    throw new Error("MOVIE_NOT_FOUND");
  }
   
  const updateData = {};
   
   const allowedFields = [
    "name",
    "director",
    "genre",
    "duration",
    "platform",
    "releaseYear",
    "coverImage",
    "description",
    "externalLinks",
    "externalId"
  ];

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  }

  const existsBook = 
  data.isBook !== undefined ? data.isBook : movieExists.isBook;

   if (data.isBook !== undefined) {
    updateData.isBook = data.isBook;
  }

  if (data.bookName !== undefined) {
    if (!existsBook) {
      throw new Error("CANNOT_SET_BOOKNAME_IF_NOT_BOOK");
    }
    updateData.bookName = data.bookName;
  }

  if (!existsBook) {
    updateData.bookName = null;
  }

  const existsSaga =
    data.isSaga !== undefined ? data.isSaga : movieExists.isSaga;

  if (data.isSaga !== undefined) {
    updateData.isSaga = data.isSaga;
  }

  if (data.sagaName !== undefined) {
    if (!existsSaga) {
      throw new Error("CANNOT_SET_SAGANAME_IF_NOT_SAGA");
    }
    updateData.sagaName = data.sagaName;
  }

  if (!existsSaga) {
    updateData.sagaName = null;
  }

  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    updateData,
    { 
        new: true, 
        runValidators: true 
    });

     return updatedMovie;
}

async function deleteMovieService(id) {
  return await Movie.findByIdAndDelete(id).lean();
}

module.exports = {
  createMovieService,
  getAllMovieService,
  getMovieByGenreService,
  updateMovieService,
  deleteMovieService,
};