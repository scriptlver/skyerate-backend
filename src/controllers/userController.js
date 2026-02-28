const { createUserService, getUsersService } = require("../services/userService");

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

module.exports = {
  createUser,
  getUsers,
};
