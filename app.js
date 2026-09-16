const express = require("express");

const establecimientosRoutes = require("./v1/routes/establecimientos.routes");

const animalesRoutes = require("./v1/routes/animales.routes");

const razasRoutes = require("./v1/routes/razas.routes");

const movimientosRoutes = require("./v1/routes/movimientos.routes");

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