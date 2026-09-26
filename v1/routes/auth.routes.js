import express from "express";

import * as authController from "../controllers/auth.controllers.js";

import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";

import { registroSchema, loginSchema } from "../validators/auth.validators.js";

const router = express.Router();

router.post("/registro", validateBodyMiddleware(registroSchema), authController.registrarUsuario);

router.post("/login", validateBodyMiddleware(loginSchema), authController.iniciarSesion);

export default router;