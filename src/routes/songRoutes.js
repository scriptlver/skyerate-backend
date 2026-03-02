const express = require("express");
const router = express.Router();

const {
  createSong,
  getAllSongs,
  getSongsByGenre,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

// criar música
router.post("/", createSong);

// listar músicas por gênero 
router.get("/:genre", getSongsByGenre);

// listar todas
router.get("/", getAllSongs);

// buscar por id
router.get("/:id", getSongById);

// atualizar
router.put("/:id", updateSong);

// deletar
router.delete("/:id", deleteSong);

module.exports = router;