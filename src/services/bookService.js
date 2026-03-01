const Book = require("../models/Book");

async function createBookService(data) {
  const {
    title,
    author,
    isbn,
    pages,
    cover,
    description,
    categories,
    publishYear,
    publisher,
    editionNumber,
    isSeries,
    seriesName,
    volume,
    format,
    duration,
  } = data;

  const bookExists = await Book.findOne({ isbn });

  if (bookExists) {
    throw new Error("BOOK_ALREADY_EXISTS");
  }

  if (format === "audiobook" && !duration) {
    throw new Error("AUDIOBOOK_REQUIRES_DURATION");
  }

  const book = await Book.create({
    title,
    author,
    isbn,
    pages,
    cover,
    description,
    categories,
    publishYear,
    publisher,
    editionNumber,
    isSeries,
    seriesName: isSeries ? seriesName : null,
    volume: isSeries ? volume : null,
    format,
    duration: format === "audiobook" ? duration : null,
  });

  return book;
}


async function getBooksService() {
  const books = await Book.find().sort({ createdAt: -1 });
  return books;
}


async function deleteBookService(id) {
  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return { message: "Livro excluído com sucesso." };
}

module.exports = {
  createBookService,
  getBooksService,
  deleteBookService,
};
