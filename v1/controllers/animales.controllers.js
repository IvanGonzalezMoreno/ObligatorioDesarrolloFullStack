import { listarAnimales as listarAnimalesService } from "../services/animales.service.js";
import { obtenerAnimal as obtenerAnimalService } from "../services/animales.service.js";
import { crearAnimal as crearAnimalService } from "../services/animales.service.js";
import { modificarAnimal as modificarAnimalService } from "../services/animales.service.js";
import { eliminarAnimal as eliminarAnimalService } from "../services/animales.service.js";
import { obtenerEstablecimiento as obtenerEstablecimientoService } from "../services/establecimientos.service.js";
import { esDueñoOAdmin } from "../utils/autorizacion.utils.js";

export async function listarAnimales(req, res) {

    const { raza, establecimiento, pesoMin, pesoMax, page, limit } = req.query;

    const resultado = await listarAnimalesService(
        { raza, establecimiento, pesoMin, pesoMax },
        { page, limit },
        req.usuario
    );

    res.status(200).json(resultado);
}

export async function crearAnimal(req, res) {

    const establecimiento = await obtenerEstablecimientoService(req.body.establecimiento);

    if (!establecimiento) {
        return res.status(404).json({ error: "Establecimiento no encontrado" });
    }

    if (!esDueñoOAdmin(establecimiento, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre ese establecimiento" });
    }

    const animal = await crearAnimalService(req.body);

    if (!animal) {
        return res.status(409).json({ error: "Ya existe un animal con esa caravana" });
    }

    res.status(201).json(animal);
}

export async function obtenerAnimal(req, res) {

    const animal = await obtenerAnimalService(req.params.id);

    if (!animal) {
        return res.status(404).json({ error: "Animal no encontrado" });
    }

    if (!esDueñoOAdmin(animal.establecimiento, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este animal" });
    }

    res.status(200).json(animal);
}

export async function modificarAnimal(req, res) {

    const animal = await obtenerAnimalService(req.params.id);

    if (!animal) {
        return res.status(404).json({ error: "Animal no encontrado" });
    }

    if (!esDueñoOAdmin(animal.establecimiento, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este animal" });
    }

    const animalActualizado = await modificarAnimalService(req.params.id, req.body);

    res.status(200).json(animalActualizado);
}

export async function eliminarAnimal(req, res) {

    const animal = await obtenerAnimalService(req.params.id);

    if (!animal) {
        return res.status(404).json({ error: "Animal no encontrado" });
    }

    if (!esDueñoOAdmin(animal.establecimiento, req.usuario)) {
        return res.status(403).json({ error: "No tenés permiso sobre este animal" });
    }

    const animalEliminado = await eliminarAnimalService(req.params.id);

    res.status(200).json(animalEliminado);
}