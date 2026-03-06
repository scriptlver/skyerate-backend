const Book = require("../models/Book");

async function createBook(data) {
  try {
    const book = await Book.create(data);
    return book;
  } catch (err) {
    throw err;
  }
}

async function getAllBooks() {
  return await Book.find().sort({ createdAt: -1 });
}

async function getBooksByCategory(category) {
  return await Book.find({
    categories: category.toLowerCase(),
  }).sort({ createdAt: -1 });
}

async function getBooksByAuthor(author) {
  return await Book.find({
    author: { $regex: new RegExp(`^${author}$`, "i") },
  }).sort({ createdAt: -1 });
}

async function getBooksByTitle(title) {
  return await Book.find({
    title: { $regex: new RegExp(title, "i") },
  }).sort({ createdAt: -1 });
}

async function getBookByIsbn(isbn) {
  return await Book.findOne({ isbn });
}

async function getBooksBySeries(seriesName) {
  return await Book.find({
    seriesName: { $regex: new RegExp(seriesName, "i") },
  }).sort({ createdAt: -1 });
}

async function getBooksByYear(publishYear) {
  return await Book.find({ publishYear }).sort({ createdAt: -1 });
}

async function getTopRatedBooks() {
  return await Book.find().sort({ "rating.average": -1 }).limit(10);
}

async function getBookById(id) {
  return await Book.findById(id);
}

async function updateBook(id, data) {
  return await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteBook(id) {
  await Book.findByIdAndDelete(id);
  return "Livro excluído com sucesso";
}

module.exports = {
  createBook,
  getAllBooks,
  getBooksByCategory,
  getBooksByAuthor,
  getBooksByTitle,
  getBookByIsbn,
  getBooksBySeries,
  getBooksByYear,
  getTopRatedBooks,
  getBookById,
  updateBook,
  deleteBook,
};
