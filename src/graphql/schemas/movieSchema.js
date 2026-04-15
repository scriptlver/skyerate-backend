const { gql } = require("apollo-server-express");

module.exports = gql`

  type ExternalLink {
    platform: String
    url: String
  }

  input ExternalLinkInput {
    platform: String
    url: String
  }

  type Movie{
     _id: ID
    name: String
    director: String
    genre: [String]
    duration: Int
    platform: String
    releaseYear: Int
    coverImage: String
    description: String
    isBook: Boolean
    bookName: String
    isSaga: Boolean
    sagaName: String
    externalLinks: [ExternalLink]
    externalId: String
  }

  input MovieInput{
    name: String!
    director: String!
    genre: [String]!
    duration: Int!
    platform: String
    releaseYear: Int
    coverImage: String
    description: String!
    isBook: Boolean
    bookName: String
    isSaga: Boolean
    sagaName: String
    externalLinks: [ExternalLinkInput]
    externalId: String
  }

  input UpdateMovieInput{
    name: String
    director: String
    genre: [String]
    duration: Int
    platform: String
    releaseYear: Int
    coverImage: String
    description: String
    isBook: Boolean
    bookName: String
    isSaga: Boolean
    sagaName: String
    externalLinks: [ExternalLinkInput]
    externalId: String
  }

   type Query {
    movies(search: String): [Movie]
    movie(id: ID!): Movie
    moviesByGenre(genre: String!): [Movie]
    moviesByIds(ids: [ID!]!): [Movie]
  }

   type Mutation {
    createMovie(data: MovieInput!): Movie
    updateMovie(id: ID!, data: UpdateMovieInput!): Movie
    deleteMovie(id: ID!): String
  }

`;
