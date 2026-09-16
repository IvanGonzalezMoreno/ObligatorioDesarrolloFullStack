export function listarRazas(req, res) {
    res.send("Listado de Razas");
}

export function obtenerRaza(req, res) {
    res.send("Raza " + req.params.id);
}

export function crearRaza(req, res) {
    res.send("Crear Raza");
}

export function modificarRaza(req, res) {
    res.send("Modificar Raza " + req.params.id);
}

export function eliminarRaza(req, res) {
    res.send("Eliminar Raza " + req.params.id);
}