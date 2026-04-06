const { gql } = require("apollo-server-express");

module.exports = gql`
  type Duration {
    minutes: Int
    seconds: Int
  }

  input DurationInput {
    minutes: Int!
    seconds: Int!
  }

  type ExternalLink {
    platform: String
    url: String
  }

  input ExternalLinkInput {
    platform: String
    url: String
  }

  type Song {
    _id: ID
    title: String
    artist: String
    album: String
    genre: [String]
    duration: Duration
    releaseDate: String
    coverImage: String
    featuring: [String]
    songwriters: [String]
    producers: [String]
    externalLinks: [ExternalLink]
    externalId: String
    description: String
  }

  input SongInput {
    title: String!
    artist: String!
    album: String
    genre: [String]!
    description: String!
    coverImage: String!
    songwriters: [String]!
    producers: [String]!
    duration: DurationInput!
    releaseDate: String
    featuring: [String]
    externalId: String
    externalLinks: [ExternalLinkInput]
  }

  input UpdateSongInput {
    title: String
    artist: String
    album: String
    genre: [String]
    description: String
    coverImage: String
    songwriters: [String]
    producers: [String]
    duration: DurationInput
    releaseDate: String
    featuring: [String]
    externalId: String
    externalLinks: [ExternalLinkInput]
  }

  type Query {
    songs: [Song]
    song(id: ID!): Song
    songsByGenre(genre: String!): [Song]
    songsByArtist(artist: String!): [Song]
    searchSongs(query: String!): [Song]
  }

  type Mutation {
    createSong(data: SongInput!): Song
    updateSong(id: ID!, data: UpdateSongInput!): Song
    deleteSong(id: ID!): String
  }
`;