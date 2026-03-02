const {
  createBookService,
  getBooksService,
  deleteBookService,
} = require("../services/bookService");


async function createBook(req, res, next) {
  try {
    const book = await createBookService(req.body);

    return res.status(201).json({
      message: "Livro cadastrado com sucesso.",
      book,
    });
  } catch (err) {
    if (err.message === "BOOK_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Já existe um livro com esse ISBN.",
      });
    }

    if (err.message === "AUDIOBOOK_REQUIRES_DURATION") {
      return res.status(400).json({
        message: "Audiobook precisa ter duração.",
      });
    }

    next(err);
  }
}


async function getBooks(req, res, next) {
  try {
    const books = await getBooksService();

    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
}


async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;

    const result = await deleteBookService(id);

    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livro não encontrado.",
      });
    }

    next(err);
  }
}

module.exports = {
  createBook,
  getBooks,
  deleteBook,
};
