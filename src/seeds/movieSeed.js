require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const movie = {
  name: "Divergente",
  director: "Neil Burger",
  genre: "ação",
  duration: {
    minutes: 139,
    seconds: 0,
  },
  platform: "Prime Video",
  releaseYear: 2014,
  coverImage: "https://upload.wikimedia.org/wikipedia/pt/8/8e/Divergent.png",
  description:
    "Na futurística cidade de Chicago, ao completar 16 anos, Beatrice precisa escolher entre as diferentes facções.",
  isBook: true,
  bookName: "Divergente",
  isSaga: true,
  sagaName: "Saga Divergente",
  externalLinks: [
    {
      platform: "prime video",
      url: "https://www.primevideo.com/-/pt/detail/Divergente/0QBS5DTGTN1X5C8BRMZTVJSXGZ",
    },
  ],
  externalId: "divirgente-2014",
};

const seedMovie = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");

    await Movie.deleteMany();
    console.log("Filmes antigos removidos");

    await Movie.insertMany([movie]);
    console.log("Filmes adicionados");

    await mongoose.connection.close();
  } catch (err) {
    console.error("Erro no seed", err);
  }
};

seedMovie();