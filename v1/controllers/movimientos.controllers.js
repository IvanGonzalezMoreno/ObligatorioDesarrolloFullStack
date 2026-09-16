export function listarMovimientos(req, res) {
    res.send("Listado de Movimientos");
}

export function obtenerMovimiento(req, res) {
    res.send("Movimiento " + req.params.id);
}

export function crearMovimiento(req, res) {
    res.send("Crear Movimiento");
}

export function modificarMovimiento(req, res) {
    res.send("Modificar Movimiento " + req.params.id);
}

export function eliminarMovimiento(req, res) {
    res.send("Eliminar Movimiento " + req.params.id);
}