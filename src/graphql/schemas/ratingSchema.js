const { gql } = require("apollo-server-express");

const ratingSchema = gql`

union ItemUnion = Book | Song

  type Rating {
    id: ID
    itemId: String
    itemType: String
    item: ItemUnion
    user: User!
    subRatings: [SubRating]
    finalScore: Float
    comment: String
    image: String
    gif: String
    isFavorite: Boolean
    isSpoiler: Boolean
    createdAt: String
    updatedAt: String
  }

  type SubRating {
    category: String!
    score: Float!
  }

  type Query {
    ratings: [Rating]
    rating(id: ID!): Rating
    ratingsByUser(userId: ID!): [Rating]
    ratingsByItem(itemId: ID!): [Rating]
    ratingsByType(itemType: String!): [Rating]
    topRatedRatings(limit: Int = 10): [Rating]
    recentRatings(limit: Int = 10): [Rating]
    trendingRatings(limit: Int = 10): [Rating]
  }

  input SubRatingInput {
    category: String!
    score: Float!
  }

  input CreateRatingInput {
    itemId: String!
    itemType: String!
    user: ID!
    subRatings: [SubRatingInput]
    finalScore: Float
    comment: String
    image: String
    gif: String
    isFavorite: Boolean
    isSpoiler: Boolean
  }

  input UpdateRatingInput {
    subRatings: [SubRatingInput]
    finalScore: Float
    comment: String
    image: String
    gif: String
    isFavorite: Boolean
    isSpoiler: Boolean
  }

  type Mutation {
    createRating(input: CreateRatingInput!): Rating
    updateRating(id: ID!, input: UpdateRatingInput!): Rating
    deleteRating(id: ID!): String
  }
`;

module.exports = ratingSchema;
