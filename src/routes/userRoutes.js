const express = require("express");

const {
  createUser,
  getUsers,
  deleteUser,
  login,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// criar usuário
router.post("/", createUser);

// login
router.post("/login", login); // nn sei se isso ta certo nn kkkkkkkkkk

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
