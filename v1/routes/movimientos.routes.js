const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Listado de movimientos");
});

router.get("/:id", (req, res) => {
    res.send("Movimiento " + req.params.id);
});

router.post("/", (req, res) => {
    res.send("Crear movimiento");
});

router.put("/:id", (req, res) => {
    res.send("Modificar movimiento " + req.params.id);
});

router.delete("/:id", (req, res) => {
    res.send("Eliminar movimiento " + req.params.id);
});

module.exports = router;