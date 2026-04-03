const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    cpf: String!
    role: String
    password: String!
    deletedAt: String
    deleteReason: String
    createdAt: String
    updatedAt: String
  }

  type Profile {
    id: ID!
    user: User!
    username: String
    bio: String
    profileImage: String
    isPrivate: Boolean
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
    profile: Profile
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      cpf: String!
      password: String!
    ): AuthPayload

    loginUser(
      email: String!
      password: String!
    ): AuthPayload

    deleteUser(
      id: ID!
      reason: String
    ): User
  }
`;

module.exports = userSchema;