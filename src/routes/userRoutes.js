const express = require("express");

const { createUser, getUsers, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();


router.post("/", createUser);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getUsers
);

router.delete("/:id", deleteUser);

module.exports = router;
