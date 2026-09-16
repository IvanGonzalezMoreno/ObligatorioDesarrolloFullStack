const express = require("express");

const establecimientosController = require("../controllers/establecimientos.controller");

const router = express.Router();

router.get("/", establecimientosController.listarEstablecimientos);

router.get("/:id", establecimientosController.obtenerEstablecimiento);

router.post("/", establecimientosController.crearEstablecimiento);

router.put("/:id", establecimientosController.modificarEstablecimiento);

router.delete("/:id", establecimientosController.eliminarEstablecimiento);

module.exports = router;