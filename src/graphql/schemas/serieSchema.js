const { gql } = require("apollo-server-express");

module.exports = gql`
  type Serie {
    _id: ID!
    title: String!
    director: String
    genre: [String]
    seasons: Int
    episodes: Int
    duration: String
    platform: String
    releaseYear: Int
    coverImage: String
    description: String
    isBook: Boolean
    bookName: String
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
    coverImage: String
    description: String
    isBook: Boolean
    bookName: String
  }

  input UpdateSerieInput {
    title: String
    director: String
    genre: [String]
    seasons: Int
    episodes: Int
    duration: String
    platform: String
    releaseYear: Int
    coverImage: String
    description: String
    isBook: Boolean
    bookName: String
  }

  type Query {
    series: [Serie]
    serie(id: ID!): Serie
    seriesByGenre(genre: String!): [Serie]
    searchSeries(query: String!): [Serie]
    seriesById(ids: [ID!]!): [Serie]
  }

  type Mutation {
    createSerie(data: SerieInput!): Serie
    updateSerie(id: ID!, data: UpdateSerieInput!): Serie
    deleteSerie(id: ID!): String
  }
`;