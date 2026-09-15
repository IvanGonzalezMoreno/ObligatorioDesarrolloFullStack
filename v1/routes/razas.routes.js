const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Listado de razas");
});

router.get("/:id", (req, res) => {
    res.send("Raza " + req.params.id);
});

router.post("/", (req, res) => {
    res.send("Crear raza");
});

router.put("/:id", (req, res) => {
    res.send("Modificar raza " + req.params.id);
});

router.delete("/:id", (req, res) => {
    res.send("Eliminar raza " + req.params.id);
});

module.exports = router;