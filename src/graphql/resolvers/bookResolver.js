const bookController = require("../../controllers/bookController");

const bookResolver = {
  Query: {
    books: async () => {
      return await bookController.getAllBooks();
    },

    book: async (_, { id }) => {
      return await bookController.getBookById(id);
    },

    booksByCategory: async (_, { category }) => {
      return await bookController.getBooksByCategory(category);
    },

    booksByAuthor: async (_, { author }) => {
      return await bookController.getBooksByAuthor(author);
    },

    booksByTitle: async (_, { title }) => {
      return await bookController.getBooksByTitle(title);
    },

    bookByIsbn: async (_, { isbn }) => {
      return await bookController.getBookByIsbn(isbn);
    },

    booksBySeries: async (_, { seriesName }) => {
      return await bookController.getBooksBySeries(seriesName);
    },

    booksByYear: async (_, { publishYear }) => {
      return await bookController.getBooksByYear(publishYear);
    },

    topRatedBooks: async () => {
      return await bookController.getTopRatedBooks();
    },
  },

  Mutation: {
    createBook: async (_, { data }) => {
      return await bookController.createBook(data);
    },

    updateBook: async (_, { id, data }) => {
      return await bookController.updateBook(id, data);
    },

    deleteBook: async (_, { id }) => {
      return await bookController.deleteBook(id);
    },
  },
};

module.exports = bookResolver;