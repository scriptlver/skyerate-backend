const { gql } = require("apollo-server-express");

const figureSkatingSchema = gql`

    type FigureSkating {
        id: ID
        music: [String]
        skaters: [String]
        artist: [String]
        skaterCountry: String
        modality: String
        category: String
        event: String
        currentRanking: Int
        duration: Int
        technicalScore: Float
        programComponents: Float
        deductions: Float
        totalSegmentScore: Float
        createdAt: String
        updatedAt: String
    }

    type Query {
        performances: [FigureSkating]
        performance(id:ID!): FigureSkating
        performanceByName(skaters:String!): FigureSkating
        performanceByCountry(skaterCountry:String!): FigureSkating
        performanceByModality(modality:String!): FigureSkating
        performanceByCategory(category:String!): FigureSkating
        performanceByEvent(event:String!): FigureSkating
        performanceByRanking(currentRanking:Int!): FigureSkating
        performanceByMusic(music:String!): FigureSkating
        performanceByArtist(artist:String!): FigureSkating
        topRatedPerformances: [FigureSkating]
    }

    input CreateFigureSkating {
        music: [String]!
        skaters: [String]!
        artist: [String]!
        skaterCountry: String
        modality: String!
        category: String
        event: String
        currentRanking: Int
        duration: Int
        technicalScore: Float
        programComponents: Float
        deductions: Float
        totalSegmentScore: Float
    }

    input UpdateFigureSkating {
        music: [String]
        skaters: [String]
        artist: [String]
        skaterCountry: String
        modality: String
        category: String
        event: String
        currentRanking: Int
        duration: Int
        technicalScore: Float
        programComponents: Float
        deductions: Float
        totalSegmentScore: Float
    }

    type Mutation {
        createFigureSkating(input: CreateFigureSkating!): FigureSkating
        updateFigureSkating(id:ID!, input: UpdateFigureSkating!): FigureSkating
        deleteFigureSkating(id:ID!): String
    }
`;

module.exports = figureSkatingSchema;