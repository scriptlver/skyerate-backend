const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`

type Book {

    _id: ID
    title: String

}



`

module.exports = { typeDefs };