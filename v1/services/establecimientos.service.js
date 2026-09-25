import Establecimiento from "../models/establecimiento.model.js";

import Usuario from "../models/usuario.model.js";

import Animal from "../models/animal.model.js";

import { generarRespuesta } from "./ai.services.js";

import { obtenerClimaPorDepartamento } from "./clima.service.js";

export async function listarEstablecimientos() {
    return await Establecimiento.find();
}

export async function obtenerEstablecimiento(id) {
    return await Establecimiento.findById(id);
}

export async function crearEstablecimiento(datos, usuarioId) {

    const usuario = await Usuario.findById(usuarioId);

    const cantidadEstablecimientos = await Establecimiento.countDocuments({
        usuario: usuarioId
    });

    if (usuario.plan === "plus" && cantidadEstablecimientos >= 4) {
        return null;
    }

    return await Establecimiento.create({
        ...datos, usuario: usuarioId
    });
}

export async function modificarEstablecimiento(id, datos) {
    return await Establecimiento.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarEstablecimiento(id) {
    return await Establecimiento.findByIdAndDelete(id);
}

export async function obtenerAnimalesDelEstablecimiento(id) {
    return await Animal.find({
        establecimiento: id
    });
}

export async function analizarEstablecimiento(id) {

    const animales = await obtenerAnimalesDelEstablecimiento(id);

    const prompt = `Analiza los siguientes animales de un establecimiento ganadero.

                    Datos de los animales: ${JSON.stringify(animales)}

                    Calcula el peso promedio, identifica el animal más pesado y el más liviano, y realiza una breve interpretación de los datos. 

                    IMPORTANTE:
                    - Responde únicamente en texto plano.
                    - No uses Markdown.
                    - No uses tablas.
                    - No uses LaTeX.
                    - No uses símbolos matemáticos.
                    - Usa solamente caracteres ASCII cuando sea posible.
                    - Usa espacios normales.
                    - Usa solamente el guion normal (-).
                    - No uses emojis.
                    - No agregues caracteres especiales de formato.
                    - Sé breve y claro.

                    Formato:
                    Peso promedio: X kg
                    Animal más pesado: X kg (caravana XXX)
                    Animal más liviano: X kg (caravana XXX)

                    Interpretación: ...      
                    `;

    const analisis = await generarRespuesta(prompt);

    if (!analisis) {
        return null;
    }

    return analisis;
}

export async function obtenerClimaEstablecimiento(id) {

    const establecimiento = await Establecimiento.findById(id);

    if (!establecimiento) {
        return { encontrado: false };
    }

    const clima = await obtenerClimaPorDepartamento(establecimiento.departamento);

    if (!clima) {
        return { encontrado: true, clima: null };
    }

    return { encontrado: true, clima };
}