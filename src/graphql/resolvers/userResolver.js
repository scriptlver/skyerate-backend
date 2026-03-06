const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const userResolver = {
  Query: {
    users: async () => {
      return await User.find({ deletedAt: null });
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

    deleteUser: async (_, { id, reason }) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      user.deletedAt = new Date();
      user.deleteReason = reason || "Sem motivo informado";

      await user.save();

      return user;
    },
  },
};

module.exports = userResolver;