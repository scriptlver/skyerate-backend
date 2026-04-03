const roleMiddleware = require("../../middlewares/roleMiddleware");
const {
  createUser,
  loginUser,
  getUserById,
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

    deleteUser: async (_, { id }, context) => {
      roleMiddleware(context.user, "admin");
      return await deleteUser(id);
    },
  },
};

module.exports = userResolver;
