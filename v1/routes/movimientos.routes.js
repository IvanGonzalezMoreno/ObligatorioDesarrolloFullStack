import express from "express";

import * as movimientosController from "../controllers/movimientos.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { crearMovimientoSchema, modificarMovimientoSchema } from "../validators/movimientos.validators.js";

const router = express.Router();

router.get("/", movimientosController.listarMovimientos);

router.get("/:id", movimientosController.obtenerMovimiento);

router.post("/", validateBodyMiddleware(crearMovimientoSchema), movimientosController.crearMovimiento);

router.put("/:id", validateBodyMiddleware(modificarMovimientoSchema), movimientosController.modificarMovimiento);

router.delete("/:id", movimientosController.eliminarMovimiento);

export default router;