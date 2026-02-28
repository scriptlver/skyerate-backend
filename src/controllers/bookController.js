const { createBookService } = require("../services/bookService");

async function createBook(req, res, next) {
  try {
    const book = await createBookService(req.body);

    return res.status(201).json({
      message: "Livro cadastrado com sucesso",
      book,
    });
  } catch (err) {
    if (err.message === "BOOK_ALREADY_EXISTS") {
      return res.status(409).json({ message: "Livro já existe" });
    }

    if (err.message === "AUDIOBOOK_REQUIRES_DURATION") {
      return res.status(400).json({
        message: "Audiobook precisa ter duração",
      });
    }

    next(err);
  }
}

module.exports = {
  createBook,
};
