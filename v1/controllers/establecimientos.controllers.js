export function listarEstablecimientos(req, res) {
    res.send("Listado de Establecimientos");
}

export function obtenerEstablecimiento(req, res) {
    res.send("Establecimiento " + req.params.id);
}

export function crearEstablecimiento(req, res) {
    res.send("Crear Establecimiento");
}

export function modificarEstablecimiento(req, res) {
    res.send("Modificar Establecimiento " + req.params.id);
}

export function eliminarEstablecimiento(req, res) {
    res.send("Eliminar Establecimiento " + req.params.id);
}