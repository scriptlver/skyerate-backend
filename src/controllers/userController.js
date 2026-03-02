const {
  createUserService,
  getUsersService,
} = require("../services/userService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function createUser(req, res, next) {
  try {
    const user = await createUserService(req.body);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (err) {
    if (err.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Usuário já existe",
      });
    }

    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await getUsersService();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const result = await deleteUserService(id);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // gerar token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  login,
};
