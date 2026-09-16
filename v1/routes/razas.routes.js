const express = require("express");

const razasController = require("../controllers/razas.controller");

const router = express.Router();

router.get("/", razasController.listarRazas);

router.get("/:id", razasController.obtenerRaza);

router.post("/", razasController.crearRaza);

router.put("/:id", razasController.modificarRaza);

router.delete("/:id", razasController.eliminarRaza);

module.exports = router;