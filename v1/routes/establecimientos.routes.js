import express from "express";

import * as establecimientosController from "../controllers/establecimientos.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { crearEstablecimientoSchema, modificarEstablecimientoSchema } from "../validators/establecimientos.validators.js";

const router = express.Router();

router.get("/", establecimientosController.listarEstablecimientos);

router.get("/:id/analisis", establecimientosController.analizarEstablecimiento);

router.get("/:id", establecimientosController.obtenerEstablecimiento);

router.post("/", validateBodyMiddleware(crearEstablecimientoSchema), establecimientosController.crearEstablecimiento);

router.put("/:id", validateBodyMiddleware(modificarEstablecimientoSchema), establecimientosController.modificarEstablecimiento);

router.delete("/:id", establecimientosController.eliminarEstablecimiento);

export default router;