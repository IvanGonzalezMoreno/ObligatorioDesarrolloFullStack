import Raza from "../models/raza.model.js";

import Animal from "../models/animal.model.js";

export async function listarRazas(paginacion = {}) {

    const { page, limit } = parsearPaginacion(paginacion.page, paginacion.limit);

    const skip = (page - 1) * limit;

    const [razas, total] = await Promise.all([
        Raza.find().skip(skip).limit(limit),
        Raza.countDocuments()
    ]);

    return {
        data: razas,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
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