import Joi from "joi";

export const crearRazaSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required()
});

export const modificarRazaSchema = Joi.object({
    nombre: Joi.string(),
    descripcion: Joi.string()
});