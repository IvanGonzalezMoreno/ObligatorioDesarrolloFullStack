import { listarEstablecimientos as listarEstablecimientosService } from "../services/establecimientos.service.js";

import { obtenerEstablecimiento as obtenerEstablecimientoService } from "../services/establecimientos.service.js";

import { crearEstablecimiento as crearEstablecimientoService } from "../services/establecimientos.service.js";

import { modificarEstablecimiento as modificarEstablecimientoService } from "../services/establecimientos.service.js";

import { eliminarEstablecimiento as eliminarEstablecimientoService } from "../services/establecimientos.service.js";

import { analizarEstablecimiento as analizarEstablecimientoService } from "../services/establecimientos.service.js";

export async function listarEstablecimientos(req, res) {
    const establecimientos = await listarEstablecimientosService();

    res.status(200).json(establecimientos);
}

export async function obtenerEstablecimiento(req, res) {
    const establecimiento = await obtenerEstablecimientoService(req.params.id);

    res.status(200).json(establecimiento);
}

export async function crearEstablecimiento(req, res) {

    const establecimiento = await crearEstablecimientoService(
        req.body, req.usuario.id
    );

    if (establecimiento === null) {
        return res.status(400).json({
            error: "El usuario alcanzó el límite de 4 establecimientos del plan plus"
        });
    }

    res.status(201).json(establecimiento);
}

export async function modificarEstablecimiento(req, res) {
    const establecimiento = await modificarEstablecimientoService(req.params.id, req.body);

    res.status(200).json(establecimiento);
}

export async function eliminarEstablecimiento(req, res) {
    const establecimiento = await eliminarEstablecimientoService(req.params.id);

    res.status(200).json(establecimiento);
}

export async function analizarEstablecimiento(req, res) {
    const analisis = await analizarEstablecimientoService(
        req.params.id
    );

    if (!analisis) {
        return res.status(503).json({
            error: "El servicio de análisis no está disponible"
        });
    }

    res.status(200).json({
        analisis
    });
}