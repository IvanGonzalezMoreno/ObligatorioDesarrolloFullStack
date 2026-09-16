import Joi from "joi";

export const crearEstablecimientoSchema = Joi.object({
    nombre: Joi.string().required(),
    departamento: Joi.string().required(),
    superficie: Joi.number().required()
});

export const modificarEstablecimientoSchema = Joi.object({
    nombre: Joi.string(),
    departamento: Joi.string(),
    superficie: Joi.number()
});