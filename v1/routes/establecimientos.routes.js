import express from "express";

import * as establecimientosController from "../controllers/establecimientos.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { crearEstablecimientoSchema, modificarEstablecimientoSchema } from "../validators/establecimientos.validators.js";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", autenticarUsuario, establecimientosController.listarEstablecimientos);

router.get("/:id/analisis", autenticarUsuario, establecimientosController.analizarEstablecimiento);

router.get("/:id", autenticarUsuario, establecimientosController.obtenerEstablecimiento);

router.post("/", autenticarUsuario, validateBodyMiddleware(crearEstablecimientoSchema), establecimientosController.crearEstablecimiento);

router.put("/:id", autenticarUsuario, validateBodyMiddleware(modificarEstablecimientoSchema), establecimientosController.modificarEstablecimiento);

router.delete("/:id", autenticarUsuario, establecimientosController.eliminarEstablecimiento);

export default router;