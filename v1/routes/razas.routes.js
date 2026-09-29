import express from "express";

import * as razasController from "../controllers/razas.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { crearRazaSchema, modificarRazaSchema } from "../validators/razas.validators.js";

import { verificarAdmin } from "../middlewares/rol.middleware.js";

const router = express.Router();

router.get("/", razasController.listarRazas);

router.get("/:id", razasController.obtenerRaza);

router.post("/", verificarAdmin, validateBodyMiddleware(crearRazaSchema), razasController.crearRaza);

router.put("/:id", verificarAdmin, validateBodyMiddleware(modificarRazaSchema), razasController.modificarRaza);

router.delete("/:id", verificarAdmin, razasController.eliminarRaza);

export default router;