function listarRazas(req, res) {
    res.send("Listado de Razas");
}

function obtenerRaza(req, res) {
    res.send("Raza " + req.params.id);
}

function crearRaza(req, res) {
    res.send("Crear Raza");
}

function modificarRaza(req, res) {
    res.send("Modificar Raza " + req.params.id);
}

function eliminarRaza(req, res) {
    res.send("Eliminar Raza " + req.params.id);
}

module.exports = {listarRazas, obtenerRaza, crearRaza, modificarRaza, eliminarRaza};