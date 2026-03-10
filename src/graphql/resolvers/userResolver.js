const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const roleMiddleware = require("../../middlewares/roleMiddleware");

const userResolver = {
  Query: {

    users: async (_, __, context) => {

      roleMiddleware(context.user, "admin");

      return await User.find({ deletedAt: null }).select("+password");
    },

    user: async (_, { id }) => {

      const user = await User.findById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    },

  },

  Mutation: {

    createUser: async (_, { name, email, cpf, password }) => {

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

      return user;
    },

    loginUser: async (_, { email, password }) => {

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new Error("Senha inválida");
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        user,
      };
    },

    deleteUser: async (_, { id }, context) => {

      roleMiddleware(context.user, "admin");

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    },

  },
};

module.exports = userResolver;