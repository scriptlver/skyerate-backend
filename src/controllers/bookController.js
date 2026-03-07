const Book = require("../models/Book");

async function createBook(input) {
  if (input.categories) {
    input.categories = input.categories.map(cat => cat.toLowerCase());
  }

  return Book.create(input);
}

async function getAllBooks() {
  return Book.find().sort({ createdAt: -1 });
}

async function getBooksByCategory(category) {
  return Book.find({
    categories: { $regex: new RegExp(category, "i") },
  }).sort({ createdAt: -1 });
}

async function getBooksByAuthor(author) {
  return Book.find({
    author: { $regex: new RegExp(author, "i") },
  }).sort({ createdAt: -1 });
}

async function getBooksByTitle(title) {
  return Book.find({
    title: { $regex: new RegExp(title, "i") },
  }).sort({ createdAt: -1 });
}

async function getBookByIsbn(isbn) {
  return Book.findOne({ isbn });
}

async function getBooksBySeries(seriesName) {
  return Book.find({
    seriesName: { $regex: new RegExp(seriesName, "i") },
  }).sort({ createdAt: -1 });
}

async function getBooksByYear(publishYear) {
  return Book.find({ publishYear }).sort({ createdAt: -1 });
}

async function getTopRatedBooks() {
  return Book.find().sort({ "rating.average": -1 }).limit(10);
}

async function getBookById(id) {
  return Book.findById(id);
}

async function updateBook(id, input) {
  return Book.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
}

async function deleteBook(id) {
  const deleted = await Book.findByIdAndDelete(id);
  return !!deleted;
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