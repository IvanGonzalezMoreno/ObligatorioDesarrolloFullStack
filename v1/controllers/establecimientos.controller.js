function listarEstablecimientos(req, res) {
    res.send("Listado de Establecimientos");
}

function obtenerEstablecimiento(req, res) {
    res.send("Establecimiento " + req.params.id);
}

function crearEstablecimiento(req, res) {
    res.send("Crear Establecimiento");
}

function modificarEstablecimiento(req, res) {
    res.send("Modificar Establecimiento " + req.params.id);
}

function eliminarEstablecimiento(req, res) {
    res.send("Eliminar Establecimiento " + req.params.id);
}

module.exports = {listarEstablecimientos, obtenerEstablecimiento, crearEstablecimiento, modificarEstablecimiento, eliminarEstablecimiento};