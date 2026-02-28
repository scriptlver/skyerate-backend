const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("📦 Conectado ao banco");


    await User.deleteOne({ email: "admin@skyerate.com" });

    const user = new User({
      name: "Admin Teste",
      email: "admin@skyerate.com",
      cpf: "12345678901",
      password: "admin123", 
      role: "admin",
      bio: "Usuário administrador para testes",
    });

    await user.save();

    console.log("Usuário seed criado com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar seed:", error);
    process.exit(1);
  }
}

seedUser();
