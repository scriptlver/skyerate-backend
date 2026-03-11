const { gql } = require("apollo-server-express");

module.exports = gql`
  type Serie {
    _id: ID
    title: String
    genre: [String]
    seasons: Int
    releaseYear: Int
    description: String
  }

  input SerieInput {
    title: String!
    genre: [String]!
    seasons: Int
    releaseYear: Int
    description: String
  }

  input UpdateSerieInput {
    title: String
    genre: [String]
    seasons: Int
    releaseYear: Int
    description: String
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