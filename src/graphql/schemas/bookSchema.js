const { gql } = require("apollo-server-express");

const typeBook = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    isbn: String!
    pages: Int
    cover: String!
    categories: [String]
    publishYear: Int
    publisher: String
    editionNumber: Int
    isSeries: Boolean
    seriesName: String
    volume: Int
    format: String
    duration: Int
    rating: Rating
    externalId: String
    createdAt: String
    updatedAt: String
  }

  type Rating {
    average: Float
    count: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    booksByAuthor(author: String!): [Book]
    booksByCategory(category: String!): [Book]
    booksByTitle(title: String!): [Book]
    bookByIsbn(isbn: String!): Book
    booksBySeries(seriesName: String!): [Book]
    booksByYear(publishYear: Int!): [Book]
    topRatedBooks: [Book]
  }

  input CreateBookInput {
    title: String!
    author: String!
    description: String
    isbn: String!
    pages: Int
    cover: String!
    categories: [String]
    publishYear: Int
    publisher: String
    editionNumber: Int
    isSeries: Boolean
    seriesName: String
    volume: Int
    format: String
    duration: Int
  }

  input UpdateBookInput {
    title: String
    author: String
    description: String
    pages: Int
    cover: String
    categories: [String]
    publishYear: Int
    publisher: String
    editionNumber: Int
    isSeries: Boolean
    seriesName: String
    volume: Int
    format: String
    duration: Int
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = typeBook;
