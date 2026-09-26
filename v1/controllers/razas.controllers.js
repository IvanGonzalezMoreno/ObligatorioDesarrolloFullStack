import { listarRazas as listarRazasService } from "../services/razas.service.js";

import { obtenerRaza as obtenerRazaService } from "../services/razas.service.js";

import { crearRaza as crearRazaService } from "../services/razas.service.js";

import { modificarRaza as modificarRazaService } from "../services/razas.service.js";

import { eliminarRaza as eliminarRazaService } from "../services/razas.service.js";

export async function listarRazas(req, res) {

    const { page, limit } = req.query;

    const resultado = await listarRazasService({ page, limit });

    res.status(200).json(resultado);
}

export async function obtenerRaza(req, res) {
    const raza = await obtenerRazaService(req.params.id);

    res.status(200).json(raza);
}

export async function crearRaza(req, res) {
    const raza = await crearRazaService(req.body);

    res.status(201).json(raza);
}

export async function modificarRaza(req, res) {
    const raza = await modificarRazaService(req.params.id, req.body);

    res.status(200).json(raza);
}

export async function eliminarRaza(req, res) {
    const raza = await eliminarRazaService(req.params.id);
    
    if(raza === null) {
        return res.status(400).json({
            error: "No se puede eliminar la raza porque tiene animales asociados"
        });
    }

    res.status(200).json(raza);
}