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

  type AuthPayload {
    token: String!
    user: User!
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
    ): User

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