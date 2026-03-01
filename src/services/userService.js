const User = require("../models/User");

async function createUserService(data) {
  const { name, email, cpf, password, role } = data;

  const userExists = await User.findOne({
    $or: [{ email }, { cpf }],
  });

  if (userExists) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const user = await User.create({
    name,
    email,
    cpf,
    password,
    role,
  });

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

async function getUsersService() {
  const users = await User.find().select("-password");
  return users;
}

async function deleteUserService(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await User.findByIdAndDelete(id);

  return { message: "Usuário excluído com sucesso." };
}

module.exports = {
  createUserService,
  getUsersService,
  deleteUserService,
};
