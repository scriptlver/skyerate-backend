const Book = require("../models/Book");

async function createBook(input) {
  try {

   
    if (input.categories) {
      input.categories = input.categories.map((cat) => cat.toLowerCase());
    }

   
    const existingBook = await Book.findOne({ isbn: input.isbn });

    if (existingBook) {
      throw new Error("ISBN_ALREADY_EXISTS");
    }

    
    return await Book.create(input);

  } catch (error) {
    console.error(error);

    if (error.message === "ISBN_ALREADY_EXISTS") {
      throw error;
    }

    throw new Error("Erro ao criar livro");
  }
}

async function getAllBooks() {
  try {
    return await Book.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros");
  }
}

async function getBooksByCategory(category) {
  try {
    return await Book.find({
      categories: { $regex: new RegExp(category, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros por categoria");
  }
}

async function getBooksByAuthor(author) {
  try {
    return await Book.find({
      author: { $regex: new RegExp(author, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros por autor");
  }
}

async function getBooksByTitle(title) {
  try {
    return await Book.find({
      title: { $regex: new RegExp(title, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros por título");
  }
}

async function getBookByIsbn(isbn) {
  try {
    const book = await Book.findOne({ isbn });

    if (!book) {
      throw new Error("Livro não encontrado");
    }

    return book;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livro pelo ISBN");
  }
}

async function getBooksBySeries(seriesName) {
  try {
    return await Book.find({
      seriesName: { $regex: new RegExp(seriesName, "i") },
    }).sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros da série");
  }
}

async function getBooksByYear(publishYear) {
  try {
    return await Book.find({ publishYear }).sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros por ano");
  }
}

async function getTopRatedBooks() {
  try {
    return await Book.find()
      .sort({ "rating.average": -1 })
      .limit(10);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros mais bem avaliados");
  }
}

async function getBookById(id) {
  try {
    const book = await Book.findById(id);

    if (!book) {
      throw new Error("Livro não encontrado");
    }

    return book;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livro");
  }
}

async function updateBook(id, input) {
  try {
    const book = await Book.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new Error("Livro não encontrado para atualização");
    }

    return book;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar livro");
  }
}

async function deleteBook(id) {
  try {
    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      throw new Error("Livro não encontrado");
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao excluir livro");
  }
}

async function searchBooks(query) {
  try {
    return await Book.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { author: { $regex: new RegExp(query, "i") } },
        { seriesName: { $regex: new RegExp(query, "i") } },
        { categories: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(10);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros");
  }
}

async function getBooksByIds(ids) {
  try {

    const books = await Book.find({ _id: { $in: ids } });
    return books;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar livros por IDs");
  }
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
  searchBooks,
  getBooksByIds,
};