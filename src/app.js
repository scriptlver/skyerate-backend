require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { ApolloServer } = require("apollo-server-express");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const songSchema = require("./graphql/schemas/songSchema");
const songResolvers = require("./graphql/resolvers/songResolver");

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

async function startApollo() {
  const server = new ApolloServer({
    typeDefs: songSchema,
    resolvers: songResolvers,
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