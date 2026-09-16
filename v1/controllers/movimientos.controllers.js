import { listarMovimientos as listarMovimientosService } from "../services/movimientos.service.js";

import { obtenerMovimiento as obtenerMovimientoService } from "../services/movimientos.service.js";

import { crearMovimiento as crearMovimientoService } from "../services/movimientos.service.js";

import { modificarMovimiento as modificarMovimientoService } from "../services/movimientos.service.js";

import { eliminarMovimiento as eliminarMovimientoService } from "../services/movimientos.service.js";

export async function listarMovimientos(req, res) {
    const movimientos = await listarMovimientosService();

    res.status(200).json(movimientos);
}

export async function obtenerMovimiento(req, res) {
    const movimiento = await obtenerMovimientoService(req.params.id);

    res.status(200).json(movimiento);
}

export async function crearMovimiento(req, res) {
    const movimiento = await crearMovimientoService(req.body);
    
    res.status(201).json(movimiento);
}

export async function modificarMovimiento(req, res) {
    const movimiento = await modificarMovimientoService(req.params.id, req.body);

    res.status(200).json(movimiento);
}

export async function eliminarMovimiento(req, res) {
    const movimiento = await eliminarMovimientoService(req.params.id);

    res.status(200).json(movimiento);
}