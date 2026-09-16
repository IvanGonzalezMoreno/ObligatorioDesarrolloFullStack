import Raza from "../models/raza.model.js";

import Animal from "../models/animal.model.js";

export async function listarRazas() {
    return await Raza.find();
}

export async function obtenerRaza(id) {
    return await Raza.findById(id);
}

export async function crearRaza(datos) {
    return await Raza.create(datos);
}

export async function modificarRaza(id, datos) {
    return await Raza.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarRaza(id) {
    const animales = await Animal.find({ raza: id });

    if(animales.length > 0) {
        return null;
    }

    return await Raza.findByIdAndDelete(id);
}