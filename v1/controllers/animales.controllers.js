import { listarAnimales as listarAnimalesService } from "../services/animales.service.js";

import { obtenerAnimal as obtenerAnimalService } from "../services/animales.service.js";

import { crearAnimal as crearAnimalService } from "../services/animales.service.js";

import { modificarAnimal as modificarAnimalService } from "../services/animales.service.js";

import { eliminarAnimal as eliminarAnimalService } from "../services/animales.service.js";

export async function listarAnimales(req, res) {
    const animales = await listarAnimalesService();

    res.status(200).json(animales);
}

export async function obtenerAnimal(req, res) {
    const animal = await obtenerAnimalService(req.params.id);

    res.status(200).json(animal);
}

export async function crearAnimal(req, res) {
    const animal = await crearAnimalService(req.body);

    res.status(201).json(animal);
}

export async function modificarAnimal(req, res) {
    const animal = await modificarAnimalService(req.params.id, req.body);

    res.status(200).json(animal);
}

export async function eliminarAnimal(req, res) {
    const animal = await eliminarAnimalService(req.params.id);

    res.status(200).json(animal);
}