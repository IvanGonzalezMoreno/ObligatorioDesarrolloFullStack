import Establecimiento from "../models/establecimiento.model.js";

import Usuario from "../models/usuario.model.js";

import Animal from "../models/animal.model.js";

import { generarRespuesta } from "./ai.services.js";

import { obtenerClimaPorDepartamento } from "./clima.service.js";

export async function listarEstablecimientos(filtros = {}, paginacion = {}, usuario) {

    const { departamento } = filtros;
    const { page = 1, limit = 10 } = paginacion;

    const query = {};

    if (departamento) query.departamento = departamento;

    if (usuario.rol !== "admin") {
        query.usuario = usuario.id;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [establecimientos, total] = await Promise.all([
        Establecimiento.find(query)
            .skip(skip)
            .limit(Number(limit))
            .populate("usuario", "-password"),
        Establecimiento.countDocuments(query)
    ]);

    return {
        data: establecimientos,
        pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit))
        }
    };
}

export async function obtenerEstablecimiento(id) {
    return await Establecimiento.findById(id).populate("usuario", "-password");
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

export async function generarAlertaClimatica(id) {

    const establecimiento = await Establecimiento.findById(id);

    if (!establecimiento) {
        return { encontrado: false };
    }

    const clima = await obtenerClimaPorDepartamento(establecimiento.departamento);

    if (!clima) {
        return { encontrado: true, alerta: null };
    }

    const prompt = `Sos un asistente agropecuario. La temperatura actual en un establecimiento ganadero es de ${clima.temperatura}°C, con ${clima.humedad}% de humedad y viento de ${clima.viento} km/h.

    Si estas condiciones representan un riesgo para el bienestar del ganado (frío o calor extremo, viento fuerte), escribí una alerta breve de 1-2 oraciones explicando el riesgo y una recomendación concreta.

    Si las condiciones son normales y no hay riesgo, respondé únicamente: "Condiciones climáticas normales, sin riesgo para el ganado."

    Responde en texto plano, sin Markdown, sin símbolos especiales, breve y claro.`;

    const alerta = await generarRespuesta(prompt);

    if (!alerta) {
        return { encontrado: true, alerta: null };
    }

    return { encontrado: true, clima, alerta };
}

export async function obtenerResumenEstablecimiento(id) {

    const establecimiento = await Establecimiento.findById(id);

    if (!establecimiento) {
        return { encontrado: false };
    }

    const animales = await Animal.find({ establecimiento: id }).populate("raza");

    if (animales.length === 0) {
        return {
            encontrado: true,
            resumen: { cantidadAnimales: 0, pesoPromedio: 0, porRaza: [] }
        };
    }

    const pesoTotal = animales.reduce((suma, animal) => suma + animal.peso, 0);
    const pesoPromedio = Number((pesoTotal / animales.length).toFixed(2));

    const conteoPorRaza = {};

    animales.forEach(animal => {
        const nombreRaza = animal.raza?.nombre || "Sin raza";
        conteoPorRaza[nombreRaza] = (conteoPorRaza[nombreRaza] || 0) + 1;
    });

    const porRaza = Object.entries(conteoPorRaza).map(([raza, cantidad]) => ({ raza, cantidad }));

    return {
        encontrado: true,
        resumen: { cantidadAnimales: animales.length, pesoPromedio, porRaza }
    };
}