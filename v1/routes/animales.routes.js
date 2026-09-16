const express = require("express");

const animalesController = require("../controllers/animales.controller");

const router = express.Router();

router.get("/", animalesController.listarAnimales);

router.get("/:id", animalesController.obtenerAnimal);

router.post("/", animalesController.crearAnimal);

router.put("/:id", animalesController.modificarAnimal);

router.delete("/:id", animalesController.eliminarAnimal);

module.exports = router;