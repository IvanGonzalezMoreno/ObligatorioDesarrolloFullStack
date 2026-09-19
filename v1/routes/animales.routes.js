import express from "express";

import * as animalesController from "../controllers/animales.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { crearAnimalSchema, modificarAnimalSchema } from "../validators/animales.validators.js";

import { autenticarUsuario } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", autenticarUsuario, animalesController.listarAnimales);

router.get("/:id", animalesController.obtenerAnimal);

router.post("/", validateBodyMiddleware(crearAnimalSchema), animalesController.crearAnimal);

router.put("/:id", validateBodyMiddleware(modificarAnimalSchema), animalesController.modificarAnimal);

router.delete("/:id", animalesController.eliminarAnimal);

export default router;