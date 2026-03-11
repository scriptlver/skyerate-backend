const { gql } = require("apollo-server-express");

const figureSkatingSchema = gql`

    #Cookie Jar#

    #O Schema é o guia. Se tentar fazer um cadastro (Mutation/Debut)
    #e enviar um dado que não está definido aqui, ou esquecer um campo obrigatório,
    #o GraphQL vai retornar um erro de validação.
    #Isso garante que o banco de dados nunca receba informações erradas ou incompletas.

    #Profile dos idols, lista tudo que cada performance deve ter.
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

    #Define tudo que o público(fandom) pode visualizar/Modo apenas leitura
    #A empresa filtra apenas os idols para aquele pedido específico.
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

    #Formulário que você preenche no Postman.
    #Formulário de audição pra empresa,
    #você não consegue botar a idade no nome por exemplo.
    #A ! significa que é obrigatório preencher a informação.
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

    #Sem !, sem obrigatoriedade.
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

    #É onde as coisas mudam no banco de dados.
    #Create = Debut, Update = Comeback, Delete = Disband.
    type Mutation {
        createFigureSkating(input: CreateFigureSkating!): FigureSkating
        updateFigureSkating(id:ID!, input: UpdateFigureSkating!): FigureSkating
        deleteFigureSkating(id:ID!): String
    }
`;

module.exports = figureSkatingSchema;