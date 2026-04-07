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

  input UpdateUserInput {
    name: String
    email: String
    currentPassword: String
    newPassword: String
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

    loginUser(email: String!, password: String!): AuthPayload

    updateUser(id: ID!, input: UpdateUserInput!): User

    deleteUser(id: ID!, reason: String): User
  }
`;

module.exports = userSchema;
