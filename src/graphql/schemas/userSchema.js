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

    deleteUser(
      id: ID!
      reason: String
    ): User
  }
`;

module.exports = userSchema;