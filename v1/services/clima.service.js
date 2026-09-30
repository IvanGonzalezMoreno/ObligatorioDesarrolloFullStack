import { COORDENADAS_DEPARTAMENTOS } from "../utils/departamentos.utils.js";

export async function obtenerClimaPorDepartamento(departamento) {

    const coordenadas = COORDENADAS_DEPARTAMENTOS[departamento];

    if (!coordenadas) {
        return null;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${coordenadas.lat},${coordenadas.lon}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const respuesta = await fetch(url, { signal: controller.signal });

        clearTimeout(timeoutId);

        if (!respuesta.ok) {
            return null;
        }

        const datos = await respuesta.json();

        const datosValidos = datos?.current
            && typeof datos.current.temp_c === "number"
            && typeof datos.current.humidity === "number"
            && typeof datos.current.precip_mm === "number"
            && typeof datos.current.wind_kph === "number";

        if (!datosValidos) {
            return null;
        }

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
        clearTimeout(timeoutId);
        return null;
    }
}