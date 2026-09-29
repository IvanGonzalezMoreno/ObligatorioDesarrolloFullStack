import express from "express";
import cors from "cors";

import v1Routes from "./v1.routes.js";
import { conectarBaseDeDatos } from "./v1/config/database.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/v1", v1Routes);

app.use((req, res) => {
    res.status(404).json({ error: "Endpoint no encontrado" });
});

app.use((err, req, res, next) => {

    console.error(err);

    if (err.code === 11000) {
        return res.status(409).json({ error: "Ya existe un registro con ese valor único" });
    }

    if (err.name === "CastError") {
        return res.status(400).json({ error: "ID con formato inválido" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Error interno del servidor" });
});

conectarBaseDeDatos();

export default app;