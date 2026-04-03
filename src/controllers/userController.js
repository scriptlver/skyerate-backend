const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

const createUser = async (_, { name, email, cpf, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email já cadastrado");

  const user = await User.create({ name, email, cpf, password });

  const username =
    name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000);

  const profile = await Profile.create({
    user: user._id,
    username,
    bio: "",
    profileImage: "",
  });

  const populatedProfile = await Profile.findById(profile._id).populate("user");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { token, user, profile: populatedProfile };
};

const loginUser = async (_, { email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Usuário não encontrado");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Senha inválida");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const profile = await Profile.findOne({ user: user._id }).populate("user");

  return { token, user, profile };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

const deleteUser = async (id, reason) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");

  user.deletedAt = new Date();
  user.deleteReason = reason || "Sem motivo informado";
  await user.save();
  return user;
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  deleteUser,
};
