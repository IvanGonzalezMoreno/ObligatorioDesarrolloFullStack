import { COORDENADAS_DEPARTAMENTOS } from "../utils/departamentos.utils.js";

export async function obtenerClimaPorDepartamento(departamento) {

    const coordenadas = COORDENADAS_DEPARTAMENTOS[departamento];

    if (!coordenadas) {
        return null;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${coordenadas.lat},${coordenadas.lon}`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            return null;
        }

        const datos = await respuesta.json();

        return {
            departamento,
            temperatura: datos.current.temp_c,
            humedad: datos.current.humidity,
            precipitacion: datos.current.precip_mm,
            viento: datos.current.wind_kph,
            unidad_temperatura: "°C",
            medido_en: datos.current.last_updated
        };

    } catch (error) {
        return null;
    }
}