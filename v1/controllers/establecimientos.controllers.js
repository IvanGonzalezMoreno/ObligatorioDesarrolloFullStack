import { listarEstablecimientos as listarEstablecimientosService } from "../services/establecimientos.service.js";
import { obtenerEstablecimiento as obtenerEstablecimientoService } from "../services/establecimientos.service.js";
import { crearEstablecimiento as crearEstablecimientoService } from "../services/establecimientos.service.js";
import { modificarEstablecimiento as modificarEstablecimientoService } from "../services/establecimientos.service.js";
import { eliminarEstablecimiento as eliminarEstablecimientoService } from "../services/establecimientos.service.js";
import { analizarEstablecimiento as analizarEstablecimientoService } from "../services/establecimientos.service.js";
import { obtenerClimaEstablecimiento as obtenerClimaEstablecimientoService } from "../services/establecimientos.service.js";
import { esDueñoOAdmin } from "../utils/autorizacion.utils.js";
import { generarAlertaClimatica as generarAlertaClimaticaService } from "../services/establecimientos.service.js";
import { obtenerResumenEstablecimiento as obtenerResumenEstablecimientoService } from "../services/establecimientos.service.js";

export async function listarEstablecimientos(req, res) {

    const { departamento, page, limit } = req.query;

    const resultado = await listarEstablecimientosService({ departamento }, { page, limit });

    res.status(200).json(resultado);
}

export async function obtenerEstablecimiento(req, res) {

    const establecimiento = await obtenerEstablecimientoService(req.params.id);

    if (!establecimiento) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!esDueñoOAdmin(establecimiento, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este establecimiento" });
    }

    res.status(200).json(establecimiento);
}

export async function crearEstablecimiento(req, res) {

    const establecimiento = await crearEstablecimientoService(req.body, req.usuario.id);

    if (establecimiento === null) {
        return res.status(400).json({
            error: "El usuario alcanzó el límite de 4 establecimientos del plan plus"
        });
    }

    res.status(201).json(establecimiento);
}

export async function modificarEstablecimiento(req, res) {

    const establecimientoActual = await obtenerEstablecimientoService(req.params.id);

    if (!establecimientoActual) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!esDueñoOAdmin(establecimientoActual, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este establecimiento" });
    }

    const establecimiento = await modificarEstablecimientoService(req.params.id, req.body);

    res.status(200).json(establecimiento);
}

export async function eliminarEstablecimiento(req, res) {

    const establecimientoActual = await obtenerEstablecimientoService(req.params.id);

    if (!establecimientoActual) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!esDueñoOAdmin(establecimientoActual, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este establecimiento" });
    }

    const establecimiento = await eliminarEstablecimientoService(req.params.id);

    res.status(200).json(establecimiento);
}

export async function analizarEstablecimiento(req, res) {

    const analisis = await analizarEstablecimientoService(req.params.id);

    if (!analisis) {
        return res.status(503).json({ error: "El servicio de análisis no está disponible" });
    }

    res.status(200).json({ analisis });
}

export async function obtenerClimaEstablecimiento(req, res) {

    const resultado = await obtenerClimaEstablecimientoService(req.params.id);

    if (!resultado.encontrado) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!resultado.clima) {
        return res.status(503).json({ error: "El servicio de clima no está disponible" });
    }

    res.status(200).json(resultado.clima);
}

export async function generarAlertaClimatica(req, res) {

    const resultado = await generarAlertaClimaticaService(req.params.id);

    if (!resultado.encontrado) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!resultado.alerta) {
        return res.status(503).json({ error: "El servicio de alertas no está disponible" });
    }

    res.status(200).json(resultado);
}

export async function obtenerResumenEstablecimiento(req, res) {

    const resultado = await obtenerResumenEstablecimientoService(req.params.id);

    if (!resultado.encontrado) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    res.status(200).json(resultado.resumen);
}