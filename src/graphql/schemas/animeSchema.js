const { gql } = require("apollo-server-express");

const animeSchema = gql`

type Anime {
    title: String
    originalTitle: String
    synopsis: String
    studio: String
    cover: String
    releaseYear: Int
    status: [String]
    genres: [String]
    seasons: [Seasons]
    createdAt: String
    updatedAt: String
}


`