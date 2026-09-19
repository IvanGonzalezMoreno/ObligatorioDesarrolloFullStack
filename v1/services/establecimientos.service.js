import Establecimiento from "../models/establecimiento.model.js";

import Usuario from "../models/usuario.model.js";

export async function listarEstablecimientos() {
    return await Establecimiento.find();
}

export async function obtenerEstablecimiento(id) {
    return await Establecimiento.findById(id);
}

export async function crearEstablecimiento(datos, usuarioId) {

    const usuario = await Usuario.findById(usuarioId);

    const cantidadEstablecimientos = await Establecimiento.countDocuments({
        usuario: usuarioId
    });

    if (usuario.plan === "plus" && cantidadEstablecimientos >= 4) {
        return null;
    }

    return await Establecimiento.create({
        ...datos, usuario: usuarioId
    });
}

export async function modificarEstablecimiento(id, datos) {
    return await Establecimiento.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarEstablecimiento(id) {
    return await Establecimiento.findByIdAndDelete(id);
}