const roleMiddleware = require("../../middlewares/roleMiddleware");
const {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");
const User = require("../../models/User");

const userResolver = {
  Query: {
    users: async (_, __, context) => {
      roleMiddleware(context.user, "admin");
      return await User.find({ deletedAt: null }).select("+password");
    },

    user: async (_, { id }) => {
      return await getUserById(id);
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      return await createUser(_, args);
    },

    loginUser: async (_, args) => {
      return await loginUser(_, args);
    },
    updateUser: async (_, args) => {
  return await updateUser(_, args);
},

    deleteUser: async (_, { id, reason }, context) => {
  if (!context.user) {
    throw new Error("Não autenticado");
  }

  if (context.user.role !== "admin" && context.user.id !== id) {
    throw new Error("Acesso negado");
  }

  return await deleteUser(id, reason);
}
  },
};

module.exports = userResolver;
