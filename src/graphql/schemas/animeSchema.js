const { gql } = require("apollo-server-express");

const animeSchema = gql`
  type Season {
    seasonNumber: Int
    episodes: Int
    cover: String
    releaseYear: Int
  }

  type Anime {
    id: ID
    title: String
    originalTitle: String
    synopsis: String
    studio: String
    cover: String
    releaseYear: Int
    status: String
    genres: [String]
    seasons: [Season]
    createdAt: String
    updatedAt: String

    averageScore: Float
    ratingCount: Int
  }

  input SeasonInput {
    seasonNumber: Int
    episodes: Int
    cover: String
    releaseYear: Int
  }

  input CreateAnimeInput {
    title: String!
    originalTitle: String
    synopsis: String
    studio: String
    cover: String!
    releaseYear: Int!
    status: String
    genres: [String]
    seasons: [SeasonInput]
  }

  input UpdateAnimeInput {
    title: String
    originalTitle: String
    synopsis: String
    studio: String
    cover: String
    releaseYear: Int
    status: String
    genres: [String]
    seasons: [SeasonInput]
  }

  type Query {
    animes: [Anime]
    anime(id: ID!): Anime
    topRatedAnimes(limit: Int): [Anime]
    mostPopularAnimes(limit: Int): [Anime]
    recentAnimes(limit: Int): [Anime]
    animesByGenre(genre: String!, limit: Int): [Anime]
    animesByStudio(studio: String!, limit: Int): [Anime]
  }

  type Mutation {
    createAnime(input: CreateAnimeInput!): Anime
    updateAnime(id: ID!, input: UpdateAnimeInput!): Anime
    deleteAnime(id: ID!): String
  }
`;

module.exports = animeSchema;
