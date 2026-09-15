const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Listado de establecimientos");
});

router.get("/:id", (req, res) => {
    res.send("Establecimiento " + req.params.id);
});

router.post("/", (req, res) => {
    res.send("Crear establecimiento");
});

router.put("/:id", (req, res) => {
    res.send("Modificar establecimiento " + req.params.id);
});

router.delete("/:id", (req, res) => {
    res.send("Eliminar establecimiento " + req.params.id);
});

module.exports = router;