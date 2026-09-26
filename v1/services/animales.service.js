import Animal from "../models/animal.model.js";

export async function listarAnimales(filtros = {}, paginacion = {}) {

    const { raza, establecimiento, pesoMin, pesoMax } = filtros;
    const { page = 1, limit = 10 } = paginacion;

    const query = {};

    if (raza) query.raza = raza;
    if (establecimiento) query.establecimiento = establecimiento;

    if (pesoMin || pesoMax) {
        query.peso = {};
        if (pesoMin) query.peso.$gte = Number(pesoMin);
        if (pesoMax) query.peso.$lte = Number(pesoMax);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [animales, total] = await Promise.all([
        Animal.find(query).skip(skip).limit(Number(limit)),
        Animal.countDocuments(query)
    ]);

    return {
        data: animales,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit))
        }
    };
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