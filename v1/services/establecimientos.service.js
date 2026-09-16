import Establecimiento from "../models/establecimiento.model.js";

export async function listarEstablecimientos() {
    return await Establecimiento.find();
}

export async function obtenerEstablecimiento(id) {
    return await Establecimiento.findById(id);
}

export async function crearEstablecimiento(datos) {
    return await Establecimiento.create(datos);
}

export async function modificarEstablecimiento(id, datos) {
    return await Establecimiento.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarEstablecimiento(id) {
    return await Establecimiento.findByIdAndDelete(id);
}