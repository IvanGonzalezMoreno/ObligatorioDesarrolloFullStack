import { COORDENADAS_DEPARTAMENTOS } from "../utils/departamentos.utils.js";

export async function obtenerClimaPorDepartamento(departamento) {

    const coordenadas = COORDENADAS_DEPARTAMENTOS[departamento];

    if (!coordenadas) {
        return null;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordenadas.lat}&longitude=${coordenadas.lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=America%2FMontevideo`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            return null;
        }

        const datos = await respuesta.json();

        return {
            departamento,
            temperatura: datos.current.temperature_2m,
            humedad: datos.current.relative_humidity_2m,
            precipitacion: datos.current.precipitation,
            viento: datos.current.wind_speed_10m,
            unidad_temperatura: datos.current_units.temperature_2m,
            medido_en: datos.current.time
        };

    } catch (error) {
        return null;
    }
}