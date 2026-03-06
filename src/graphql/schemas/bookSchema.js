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

`;

module.exports = { typeBook };