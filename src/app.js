require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path"); 
const { ApolloServer } = require("apollo-server-express");

const authMiddleware = require("./middlewares/authMiddleware");

const connectDB = require("./config/db");

const userSchema = require("./graphql/schemas/userSchema");
const userResolvers = require("./graphql/resolvers/userResolver");

const bookSchema = require("./graphql/schemas/bookSchema");
const bookResolvers = require("./graphql/resolvers/bookResolver");

const songSchema = require("./graphql/schemas/songSchema");
const songResolvers = require("./graphql/resolvers/songResolver");

const ratingSchema = require("./graphql/schemas/ratingSchema");
const ratingResolver = require("./graphql/resolvers/ratingResolver");

const profileSchema = require("./graphql/schemas/profileSchema");
const profileResolver = require("./graphql/resolvers/profileResolver");

const animeSchema = require("./graphql/schemas/animeSchema");
const animeResolver = require("./graphql/resolvers/animeResolver");

const figureSkatingSchema = require("./graphql/schemas/figureSkatingSchema");
const figureSkatingResolver = require("./graphql/resolvers/figureSkatingResolver");

const movieSchema = require("./graphql/schemas/movieSchema");
const movieResolver = require("./graphql/resolvers/movieResolver");

const serieSchema = require("./graphql/schemas/serieSchema");
const serieResolver = require("./graphql/resolvers/serieResolver");

const searchSchema = require("./graphql/schemas/searchSchema");
const searchResolver = require("./graphql/resolvers/searchResolver");

const upload = require ("./middlewares/upload.js");


const app = express();

connectDB();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    url: `/uploads/reviews/${req.file.filename}`,
  });
});



async function startApollo() {
  const server = new ApolloServer({
    typeDefs: [
      songSchema,
      userSchema,
      bookSchema,
      ratingSchema,
      profileSchema,
      animeSchema,
      figureSkatingSchema,
      movieSchema,
      serieSchema,
      searchSchema,
    ],

    resolvers: [
      songResolvers,
      userResolvers,
      bookResolvers,
      ratingResolver,
      profileResolver,
      animeResolver,
      figureSkatingResolver,
      movieResolver,
      serieResolver,
      searchResolver,
    ],

    context: ({ req }) => {
      const authHeader = req.headers.authorization;
      const user = authMiddleware(authHeader);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

startApollo();

app.use((err, req, res, next) => {
  console.error("ERRO NO BACKEND:");
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Erro interno no servidor",
  });
});

module.exports = app;
