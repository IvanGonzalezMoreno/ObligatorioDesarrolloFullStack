function listarMovimientos(req, res) {
    res.send("Listado de Movimientos");
}

function obtenerMovimiento(req, res) {
    res.send("Movimiento " + req.params.id);
}

function crearMovimiento(req, res) {
    res.send("Crear Movimiento");
}

function modificarMovimiento(req, res) {
    res.send("Modificar Movimiento " + req.params.id);
}

function eliminarMovimiento(req, res) {
    res.send("Eliminar Movimiento " + req.params.id);
}

module.exports = {listarMovimientos, obtenerMovimiento, crearMovimiento, modificarMovimiento, eliminarMovimiento};