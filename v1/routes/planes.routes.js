import express from "express";
import * as planesController from "../controllers/planes.controllers.js";
import { autenticarUsuario } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put(
    "/premium",
    autenticarUsuario,
    planesController.cambiarPlan
);

export default router;