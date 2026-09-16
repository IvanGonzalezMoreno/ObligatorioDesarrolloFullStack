const express = require("express");

const movimientosController = require("../controllers/movimientos.controller");

const router = express.Router();

router.get("/", movimientosController.listarMovimientos);

router.get("/:id", movimientosController.obtenerMovimiento);

router.post("/", movimientosController.crearMovimiento);

router.put("/:id", movimientosController.modificarMovimiento);

router.delete("/:id", movimientosController.eliminarMovimiento);

module.exports = router;