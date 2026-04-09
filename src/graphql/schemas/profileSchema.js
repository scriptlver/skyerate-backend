const { gql } = require("apollo-server-express");

const profileSchema = gql`

union ItemUnion = Book | Song

type FavoriteItem {
  id: ID!
  itemId: ID!
  item: ItemUnion
  addedAt: String
}

type Profile {
  id: ID!
  user: User!
  username: String
  bio: String
  profileImage: String
  isPrivate: Boolean
  favorites: [FavoriteItem]
  favoriteOfMonthId: ID
  favoriteOfMonthType: String
  favoriteOfMonth: ItemUnion
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
  profileImage: String
}

type Query {
  getProfile(userId: ID!): Profile
  getFollowers(userId: ID!): [User]
  getFollowing(userId: ID!): [User]
  getProfiles: [Profile]   
 
}

type Mutation {
  updateProfile(userId: ID!, input: UpdateProfileInput!): Profile
  addFavorite(userId: ID!, input: FavoriteItemInput!): Profile
  removeFavorite(userId: ID!, itemId: ID!): Profile
  followUser(userId: ID!, followId: ID!): Profile
  unfollowUser(userId: ID!, unfollowId: ID!): Profile
  deleteProfile(userId: ID!): String
  setFavoriteOfMonth(userId: ID!, category: String!, image: String!): Profile
}
`;

module.exports = profileSchema;