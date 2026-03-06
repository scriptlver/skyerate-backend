const bookController = require("../../controllers/bookController");

const formatDates = (book) => {
  if (!book) return book;

  return {
    ...book._doc,
    createdAt: new Date(book.createdAt).toLocaleString("pt-BR"),
    updatedAt: new Date(book.updatedAt).toLocaleString("pt-BR"),
  };
};

const bookResolver = {
  Query: {
    books: async () => {
      const books = await bookController.getAllBooks();
      return books.map(formatDates);
    },

    book: async (_, { id }) => {
      const book = await bookController.getBookById(id);
      return formatDates(book);
    },

    booksByCategory: async (_, { category }) => {
      const books = await bookController.getBooksByCategory(category);
      return books.map(formatDates);
    },

    booksByAuthor: async (_, { author }) => {
      const books = await bookController.getBooksByAuthor(author);
      return books.map(formatDates);
    },

    booksByTitle: async (_, { title }) => {
      const books = await bookController.getBooksByTitle(title);
      return books.map(formatDates);
    },

    bookByIsbn: async (_, { isbn }) => {
      const book = await bookController.getBookByIsbn(isbn);
      return formatDates(book);
    },

    booksBySeries: async (_, { seriesName }) => {
      const books = await bookController.getBooksBySeries(seriesName);
      return books.map(formatDates);
    },

    booksByYear: async (_, { publishYear }) => {
      const books = await bookController.getBooksByYear(publishYear);
      return books.map(formatDates);
    },

    topRatedBooks: async () => {
      const books = await bookController.getTopRatedBooks();
      return books.map(formatDates);
    },
  },

  Mutation: {
    createBook: async (_, { input }) => {
      const book = await bookController.createBook(input);
      return formatDates(book);
    },

    updateBook: async (_, { id, input }) => {
      const book = await bookController.updateBook(id, input);
      return formatDates(book);
    },

    deleteBook: async (_, { id }) => {
      return await bookController.deleteBook(id);
    },
  },
};

module.exports = bookResolver;