import express from "express";

import { subirImagen } from "../controllers/uploads.controllers.js"

const router = express.Router();

router.post("/cloudinary", subirImagen);

export default router;  