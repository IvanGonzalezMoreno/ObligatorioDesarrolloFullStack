const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Listado de animales");
});

router.get("/:id", (req, res) => {
    res.send("Animal " + req.params.id);
});

router.post("/", (req, res) => {
    res.send("Crear animal");
});

router.put("/:id", (req, res) => {
    res.send("Modificar animal " + req.params.id);
});

router.delete("/:id", (req, res) => {
    res.send("Eliminar animal " + req.params.id);
});

module.exports = router;