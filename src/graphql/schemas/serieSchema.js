const { gql } = require("apollo-server-express");

module.exports = gql`
  type Serie {
    _id: ID
    title: String
    genre: [String]
    seasons: Int
    releaseYear: Int
    description: String
    coverImage: String
  }

  input SerieInput {
    title: String!
    director: String
    genre: [String]!
    seasons: Int
    episodes: Int
    duration: String
    platform: String
    releaseYear: Int
    description: String
    coverImage: String
    isBook: Boolean
    bookName: String
  }
  input UpdateSerieInput {
    title: String
    genre: [String]
    seasons: Int
    releaseYear: Int
    description: String
    imagem: String
  }

  type Query {
    series: [Serie]
    serie(id: ID!): Serie
    seriesByGenre(genre: String!): [Serie]
  }

  type Mutation {
    createSerie(data: SerieInput!): Serie
    updateSerie(id: ID!, data: UpdateSerieInput!): Serie
    deleteSerie(id: ID!): String
  }
`;
