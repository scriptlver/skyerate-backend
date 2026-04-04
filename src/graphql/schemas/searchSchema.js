const { gql } = require("apollo-server-express");

const searchSchema = gql`
  type SearchResult {
    books: [Book]
    songs: [Song]
    animes: [Anime]
  }

  extend type Query {
    search(query: String!): SearchResult
  }
`;

module.exports = searchSchema;