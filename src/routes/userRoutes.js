const express = require("express");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const { createUser } = require("../controllers/userController");
const loginController = require("../controllers/authController");

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginController);

module.exports = router;
