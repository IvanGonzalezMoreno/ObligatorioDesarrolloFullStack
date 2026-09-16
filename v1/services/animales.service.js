import Animal from "../models/animal.model.js";

export async function listarAnimales() {
    return await Animal.find();
}

export async function obtenerAnimal(id) {
    return await Animal.findById(id);
}

export async function crearAnimal(datos) {
    return await Animal.create(datos);
}

export async function modificarAnimal(id, datos) {
    return await Animal.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarAnimal(id) {
    return await Animal.findByIdAndDelete(id);
}