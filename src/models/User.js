const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[0-9]{11}$/, "CPF deve conter exatamente 11 números"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*\d).+$/,
        "A senha deve conter pelo menos uma letra minúscula e um número",
      ],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    deleteReason: {
      type: String,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
