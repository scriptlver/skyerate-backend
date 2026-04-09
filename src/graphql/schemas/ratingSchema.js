const { gql } = require("apollo-server-express");

const ratingSchema = gql`
  union ItemUnion = Book | Song | Movie | Anime | Serie | FigureSkating

  type Comment {
    id: ID
    user: User!
    text: String!
    createdAt: String
  }

  type SubRating {
    category: String!
    score: Float!
  }

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
    isFavoriteOfMonth: Boolean

    likes: [User]
    likesCount: Int

    comments: [Comment]

    createdAt: String
    updatedAt: String
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
    favoriteOfMonth(userId: ID!): Rating
  }

  input SubRatingInput {
    category: String!
    score: Float!
  }

  input CreateCommentInput {
    ratingId: ID!
    userId: ID!
    text: String!
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
    isFavoriteOfMonth: Boolean
  }

  input UpdateRatingInput {
    subRatings: [SubRatingInput]
    finalScore: Float
    comment: String
    image: String
    gif: String
    isFavorite: Boolean
    isSpoiler: Boolean
    isFavoriteOfMonth: Boolean
  }

  type Mutation {
    createRating(input: CreateRatingInput!): Rating
    updateRating(id: ID!, input: UpdateRatingInput!): Rating
    deleteRating(id: ID!): String

    likeRating(ratingId: ID!, userId: ID!): Rating
    unlikeRating(ratingId: ID!, userId: ID!): Rating

    addComment(input: CreateCommentInput!): Rating
    deleteComment(ratingId: ID!, commentId: ID!): Rating
  }
`;

module.exports = ratingSchema;
