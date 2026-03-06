const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const { name, email, cpf, password } = data;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("Email já cadastrado");
  }

  const user = await User.create({
    name,
    email,
    cpf,
    password,
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
};

const getUsers = async () => {
  return User.find({ deletedAt: null });
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
};

const deleteUser = async (id, reason) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  user.deletedAt = new Date();
  user.deleteReason = reason || "Sem motivo informado";

  await user.save();

  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};