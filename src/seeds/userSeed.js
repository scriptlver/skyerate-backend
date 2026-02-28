const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao banco");

    await User.deleteOne({ email: "admin@skyerate.com" });
    await User.deleteOne({ email: "user@skyerate.com" });


    const admin = new User({
      name: "Admin Teste",
      email: "admin@skyerate.com",
      cpf: "12345678901",
      password: "admin123",
      role: "admin",
      bio: "Usuário administrador para testes",
    });


    const user = new User({
      name: "Usuário Teste",
      email: "user@skyerate.com",
      cpf: "98765432100",
      password: "user1234",
      role: "user",
      bio: "Usuário comum para testes",
    });

    await admin.save();
    await user.save();

    console.log("Admin e Usuário criados com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar seed:", error);
    process.exit(1);
  }
}

seedUser();
