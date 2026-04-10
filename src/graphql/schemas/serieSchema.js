const { gql } = require("apollo-server-express");

module.exports = gql`
  type SubRating {
    category: String
    score: Float
  }

  type Review {
    userName: String
    rating: Float
    comment: String
    date: String
    subRatings: [SubRating]
  }

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
    reviews: [Review] 
  }

  input SubRatingInput {
    category: String
    score: Float
  }

  input ReviewInput {
    userName: String
    rating: Float
    comment: String
    date: String
    subRatings: [SubRatingInput]
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
  }

  type Mutation {
    createSerie(data: SerieInput!): Serie
    updateSerie(id: ID!, data: UpdateSerieInput!): Serie
    deleteSerie(id: ID!): String

    addReview(serieId: ID!, review: ReviewInput!): Serie
  }

  type SubRating {
  category: String
  score: Float
}

type Review {
  userName: String
  rating: Float
  comment: String
  date: String
  subRatings: [SubRating]
}

type Serie {
  _id: ID!
  title: String
  director: String
  ...
  reviews: [Review] 
}
`;
