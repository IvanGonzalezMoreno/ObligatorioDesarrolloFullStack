import express from "express";

import * as authController from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/registro", authController.registrarUsuario);

router.post("/login", authController.iniciarSesion);

export default router;