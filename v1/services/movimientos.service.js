import Movimiento from "../models/movimiento.model.js";
import Animal from "../models/animal.model.js";
import Establecimiento from "../models/establecimiento.model.js";

export async function listarMovimientos(filtros = {}, paginacion = {}, usuario) {

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

    if (usuario.rol !== "admin") {
        const establecimientosPropios = await Establecimiento.find({ usuario: usuario.id }).select("_id");
        const ids = establecimientosPropios.map(e => e._id);

        query.$and = [
            { $or: [{ establecimientoOrigen: { $in: ids } }, { establecimientoDestino: { $in: ids } }] }
        ];

        if (establecimientoOrigen) query.$and.push({ establecimientoOrigen });
        if (establecimientoDestino) query.$and.push({ establecimientoDestino });
        delete query.establecimientoOrigen;
        delete query.establecimientoDestino;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [movimientos, total] = await Promise.all([
        Movimiento.find(query)
            .skip(skip)
            .limit(Number(limit))
            .populate("animal")
            .populate("establecimientoOrigen")
            .populate("establecimientoDestino"),
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
    return await Movimiento.findById(id)
        .populate("animal")
        .populate("establecimientoOrigen")
        .populate("establecimientoDestino");
}

export async function crearMovimiento(datos) {

    const animal = await Animal.findById(datos.animal);

    if (!animal) {
        return null;
    }

    if (animal.establecimiento.toString() !== datos.establecimientoOrigen) {
        return null;
    }

    const movimiento = await Movimiento.create(datos);

    await Animal.findByIdAndUpdate(datos.animal, {
        establecimiento: datos.establecimientoDestino
    });

    return movimiento;
}

export async function modificarMovimiento(id, datos) {

    const movimiento = await Movimiento.findByIdAndUpdate(id, datos, { new: true });

    if (!movimiento) {
        return null;
    }

    if (datos.establecimientoDestino) {
        await Animal.findByIdAndUpdate(movimiento.animal, {
            establecimiento: datos.establecimientoDestino
        });
    }

    return movimiento;
}

export async function eliminarMovimiento(id) {

    const movimiento = await Movimiento.findByIdAndDelete(id);

    if (!movimiento) {
        return null;
    }

    await Animal.findByIdAndUpdate(movimiento.animal, {
        establecimiento: movimiento.establecimientoOrigen
    });

    return movimiento;
}