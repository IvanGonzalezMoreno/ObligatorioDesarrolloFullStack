import express from "express";

import establecimientosRoutes from "./v1/routes/establecimientos.routes.js";
import animalesRoutes from "./v1/routes/animales.routes.js";
import razasRoutes from "./v1/routes/razas.routes.js";
import movimientosRoutes from "./v1/routes/movimientos.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/v1/animales", animalesRoutes);

app.use("/v1/establecimientos", establecimientosRoutes);

app.use("/v1/razas", razasRoutes);

app.use("/v1/movimientos", movimientosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});