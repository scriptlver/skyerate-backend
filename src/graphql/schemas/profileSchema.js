const { gql } = require("apollo-server-express");

const profileSchema = gql`
  type FavoriteItem {
    id: ID!
    itemType: String!
    item: Item
    addedAt: String
  }

  type Profile {
    id: ID!
    user: User!
    username: String
    bio: String
    isPrivate: Boolean
    favorites: [FavoriteItem]
    favoriteOfMonth: Item
    followers: [User]
    following: [User]
    createdAt: String
    updatedAt: String
  }

  input FavoriteItemInput {
    itemId: ID!
    itemType: String!
  }

  input UpdateProfileInput {
    username: String
    bio: String
    isPrivate: Boolean
  }

  type Query {
    getProfile(userId: ID!): Profile
    getFollowers(userId: ID!): [User]
    getFollowing(userId: ID!): [User]
  }

  type Mutation {
    updateProfile(userId: ID!, input: UpdateProfileInput!): Profile
    addFavorite(userId: ID!, input: FavoriteItemInput!): Profile
    removeFavorite(userId: ID!, itemId: ID!): Profile
    setFavoriteOfMonth(userId: ID!, itemId: ID!): Profile
    followUser(userId: ID!, followId: ID!): Profile
    unfollowUser(userId: ID!, unfollowId: ID!): Profile
  }
`;

module.exports = profileSchema;
