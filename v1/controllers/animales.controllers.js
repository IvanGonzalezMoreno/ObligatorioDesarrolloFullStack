export function listarAnimales(req, res) {
    res.send("Listado de Animales");
}

export function obtenerAnimal(req, res) {
    res.send("Animal " + req.params.id);
}

export function crearAnimal(req, res) {
    res.send("Crear Animal");
}

export function modificarAnimal(req, res) {
    res.send("Modificar Animal " + req.params.id);
}

export function eliminarAnimal(req, res) {
    res.send("Eliminar Animal " + req.params.id);
}