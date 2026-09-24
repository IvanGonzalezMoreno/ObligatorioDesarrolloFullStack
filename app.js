import express from "express";

import v1Routes from "./v1.routes.js";
import { conectarBaseDeDatos } from "./v1/config/database.js";

const app = express();

app.use(express.json());

app.use("/v1", v1Routes);

conectarBaseDeDatos();

export default app;