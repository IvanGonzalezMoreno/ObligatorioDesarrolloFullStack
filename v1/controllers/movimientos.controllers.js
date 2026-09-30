import { listarMovimientos as listarMovimientosService } from "../services/movimientos.service.js";
import { obtenerMovimiento as obtenerMovimientoService } from "../services/movimientos.service.js";
import { crearMovimiento as crearMovimientoService } from "../services/movimientos.service.js";
import { modificarMovimiento as modificarMovimientoService } from "../services/movimientos.service.js";
import { eliminarMovimiento as eliminarMovimientoService } from "../services/movimientos.service.js";
import { obtenerEstablecimiento as obtenerEstablecimientoService } from "../services/establecimientos.service.js";
import { esDueñoOAdmin } from "../utils/autorizacion.utils.js";

export async function listarMovimientos(req, res) {

    const { animal, establecimientoOrigen, establecimientoDestino, fechaDesde, fechaHasta, page, limit } = req.query;

    const resultado = await listarMovimientosService(
        { animal, establecimientoOrigen, establecimientoDestino, fechaDesde, fechaHasta },
        { page, limit },
        req.usuario
    );

    res.status(200).json(resultado);
}

export async function crearMovimiento(req, res) {

    const origen = await obtenerEstablecimientoService(req.body.establecimientoOrigen);
    const destino = await obtenerEstablecimientoService(req.body.establecimientoDestino);

    if (!origen || !destino) {
        return res.status(404).json({ error: "Establecimiento de origen o destino no encontrado" });
    }

    if (!esDueñoOAdmin(origen, req.usuario) || !esDueñoOAdmin(destino, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre esos establecimientos" });
    }

    const movimiento = await crearMovimientoService(req.body);

    if (!movimiento) {
        return res.status(400).json({
            error: "El animal no está en el establecimiento de origen indicado, o no existe"
        });
    }

    res.status(201).json(movimiento);
}

export async function obtenerMovimiento(req, res) {

    const movimiento = await obtenerMovimientoService(req.params.id);

    if (!movimiento) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    const autorizado = esDueñoOAdmin(movimiento.establecimientoOrigen, req.usuario)
        && esDueñoOAdmin(movimiento.establecimientoDestino, req.usuario);

    if (!autorizado) {
        return res.status(403).json({ error: "No tenés permiso sobre este movimiento" });
    }

    res.status(200).json(movimiento);
}

export async function modificarMovimiento(req, res) {

    const movimiento = await obtenerMovimientoService(req.params.id);

    if (!movimiento) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    const autorizado = esDueñoOAdmin(movimiento.establecimientoOrigen, req.usuario)
        && esDueñoOAdmin(movimiento.establecimientoDestino, req.usuario);

    if (!autorizado) {
        return res.status(403).json({ error: "No tenés permiso sobre este movimiento" });
    }

    const movimientoActualizado = await modificarMovimientoService(req.params.id, req.body);

    res.status(200).json(movimientoActualizado);
}

export async function eliminarMovimiento(req, res) {

    const movimiento = await obtenerMovimientoService(req.params.id);

    if (!movimiento) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
    }

    const autorizado = esDueñoOAdmin(movimiento.establecimientoOrigen, req.usuario)
        && esDueñoOAdmin(movimiento.establecimientoDestino, req.usuario);

    if (!autorizado) {
        return res.status(403).json({ error: "No tenés permiso sobre este movimiento" });
    }

    const movimientoEliminado = await eliminarMovimientoService(req.params.id);

    res.status(200).json(movimientoEliminado);
}