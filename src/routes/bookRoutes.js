const express = require("express");
const {
  createBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/",createBook);
router.get("/", getBooks);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteBook);

module.exports = router;
