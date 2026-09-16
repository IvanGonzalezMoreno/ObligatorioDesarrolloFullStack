import Movimiento from "../models/movimiento.model.js";

export async function listarMovimientos() {
    return await Movimiento.find();
}

export async function obtenerMovimiento(id) {
    return await Movimiento.findById(id);
}

export async function crearMovimiento(datos) {
    return await Movimiento.create(datos);
}

export async function modificarMovimiento(id, datos) {
    return await Movimiento.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarMovimiento(id) {
    return await Movimiento.findByIdAndDelete(id);
}