import express from "express";

import authRoutes from "./v1/routes/auth.routes.js";
import animalesRoutes from "./v1/routes/animales.routes.js";
import establecimientosRoutes from "./v1/routes/establecimientos.routes.js";
import razasRoutes from "./v1/routes/razas.routes.js";
import movimientosRoutes from "./v1/routes/movimientos.routes.js";
import planesRoutes from "./v1/routes/planes.routes.js";
import uploadsRoutes from "./v1/routes/uploads.routes.js";

import { autenticarUsuario } from "./v1/middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });

// rutas desprotegidas
router.use("/auth", authRoutes);

// middleware de validación de token
router.use(autenticarUsuario);

// rutas protegidas
router.use("/animales", animalesRoutes);
router.use("/establecimientos", establecimientosRoutes);
router.use("/razas", razasRoutes);
router.use("/movimientos", movimientosRoutes);
router.use("/planes", planesRoutes);
router.use("/uploads", uploadsRoutes);

export default router;