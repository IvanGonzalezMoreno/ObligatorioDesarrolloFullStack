function listarAnimales(req, res) {
    res.send("Listado de Animales");
}

function obtenerAnimal(req, res) {
    res.send("Animal " + req.params.id);
}

function crearAnimal(req, res) {
    res.send("Crear Animal");
}

function modificarAnimal(req, res) {
    res.send("Modificar Animal " + req.params.id);
}

function eliminarAnimal(req, res) {
    res.send("Eliminar Animal " + req.params.id);
}

module.exports = {listarAnimales, obtenerAnimal, crearAnimal, modificarAnimal, eliminarAnimal};