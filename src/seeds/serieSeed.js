require("dotenv").config();
const mongoose = require("mongoose");
const Serie = require("../models/Serie");

async function seedSeries() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");

    await Serie.deleteMany();
    console.log("Séries antigas removidas");

    await Serie.insertMany([
      {
        title: "Stranger Things",
        genre: ["sci-fi", "drama"],
        seasons: 4,
        releaseYear: 2016,
        description:
          "Um grupo de amigos enfrenta eventos sobrenaturais em uma pequena cidade enquanto tenta encontrar um garoto desaparecido.",
      },
      {
        title: "Grey's Anatomy",
        genre: ["drama", "medical"],
        seasons: 19,
        releaseYear: 2005,
        description:
          "A série acompanha a vida pessoal e profissional de médicos cirurgiões no hospital Grey Sloan Memorial.",
      },
      {
        title: "Outer Banks",
        genre: ["aventura", "drama"],
        seasons: 3,
        releaseYear: 2020,
        description:
          "Um grupo de adolescentes procura um tesouro lendário enquanto enfrenta conflitos entre classes sociais.",
      },
    ]);

    console.log("Seed de séries criado com sucesso");
    process.exit();
  } catch (err) {
    console.error("Erro ao rodar seed:", err);
    process.exit(1);
  }
}

seedSeries();