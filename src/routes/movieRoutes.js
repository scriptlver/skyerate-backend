const express = require("express");
const{
    createMovie,
    getAllMovie,
    getMovieByGenre,
    getMovieById,
    updateMovie,
    deleteMovie,
} = require("../controllers/movieController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// criar filme 
router.post("/", authMiddleware, roleMiddleware("admin"), createMovie);

// listar todos e por gênero
router.get("/", getAllMovie);
router.get("/genre/:genre", getMovieByGenre);

// buscar por id
router.get("/:id", getMovieById);

// atualizar 
router.patch("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);

// deletar 
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

module.exports = router;