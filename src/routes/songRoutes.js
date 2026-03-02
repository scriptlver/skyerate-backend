const express = require("express");
const router = express.Router();

const {
  createSong,
  getAllSongs,
  getSongsByGenre,
  getSongsByArtist,
  getSongById,
  updateSong,
  deleteSong,
} = require("../controllers/songController");

// criar música
router.post("/", createSong);

// listar por gênero e artista
router.get("/genre/:genre", getSongsByGenre);
router.get("/artist/:artist", getSongsByArtist);

// listar todas
router.get("/", getAllSongs);

// buscar por id
router.get("/:id", getSongById);

// atualizar
router.put("/:id", updateSong);

// deletar
router.delete("/:id", deleteSong);

module.exports = router;