const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

async function seedUser() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao banco");

  
    await User.deleteMany({
      email: { $in: ["admin@skyerate.com", "user@skyerate.com"] }
    });

  
    const admin = new User({
      name: "Admin",
      email: "admin@skyerate.com",
      cpf: "12345678901",
      password: "admin123",
      role: "admin",
      bio: "Usuário administrador para testes"
    });

  
    const user = new User({
      name: "Usuário",
      email: "user@skyerate.com",
      cpf: "98765432100",
      password: "user1234",
      role: "user",
      bio: "Usuário comum para testes"
    });

    await admin.save();
    await user.save();

    console.log("Admin e usuário criados com sucesso!");

    console.log("Login admin:");
    console.log("email: admin@skyerate.com");
    console.log("senha: admin123");

    console.log("Login user:");
    console.log("email: user@skyerate.com");
    console.log("senha: user1234");

    await mongoose.connection.close();

    process.exit();

  } catch (error) {

    console.error("Erro ao criar seed:", error);
    process.exit(1);

  }
}

seedUser();