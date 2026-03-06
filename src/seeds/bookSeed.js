require("dotenv").config(); 
const mongoose = require("mongoose");
const Book = require("../models/Book"); 

const book = {
  title: "O Ladrão de Raios",
  author: "Rick Riordan",
  description: "Primeiro livro da série Percy Jackson e os Olimpianos.",
  isbn: "9788580414970",
  pages: 377,
  cover: "https://example.com/ladrao_de_raios.jpg",
  categories: ["fantasia", "aventura"],
  publishYear: 2005,
  publisher: "Intrínseca",
  editionNumber: 1,
  isSeries: true,
  seriesName: "Percy Jackson e os Olimpianos",
};

const seedBook = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB conectado para seed!");

    await Book.deleteMany(); 
    const insertedBook = await Book.create(book);
    console.log(`Livro "${insertedBook.title}" adicionado com sucesso!`);
  } catch (err) {
    console.error("Erro ao adicionar o livro:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedBook();