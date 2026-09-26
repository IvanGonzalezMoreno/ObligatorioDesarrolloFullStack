import Movimiento from "../models/movimiento.model.js";

export async function listarMovimientos(filtros = {}, paginacion = {}) {

    const { animal, establecimientoOrigen, establecimientoDestino, fechaDesde, fechaHasta } = filtros;
    const { page = 1, limit = 10 } = paginacion;

    const query = {};

    if (animal) query.animal = animal;
    if (establecimientoOrigen) query.establecimientoOrigen = establecimientoOrigen;
    if (establecimientoDestino) query.establecimientoDestino = establecimientoDestino;

    if (fechaDesde || fechaHasta) {
        query.fecha = {};
        if (fechaDesde) query.fecha.$gte = new Date(fechaDesde);
        if (fechaHasta) query.fecha.$lte = new Date(fechaHasta);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [movimientos, total] = await Promise.all([
        Movimiento.find(query).skip(skip).limit(Number(limit)),
        Movimiento.countDocuments(query)
    ]);

    return {
        data: movimientos,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit))
        }
    };
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