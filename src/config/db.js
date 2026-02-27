const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI não configurado no arquivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
