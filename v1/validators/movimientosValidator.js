import Joi from "joi";

export const crearMovimientoSchema = Joi.object({
    animalId: Joi.number().required(),
    establecimientoOrigenId: Joi.number().required(),
    establecimientoDestinoId: Joi.number().required(),
    fecha: Joi.date().required()
});

export const modificarMovimientoSchema = Joi.object({
    animalId: Joi.number(),
    establecimientoOrigenId: Joi.number(),
    establecimientoDestinoId: Joi.number(),
    fecha: Joi.date()
});