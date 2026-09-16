import Joi from "joi";

export const crearMovimientoSchema = Joi.object({
    animal: Joi.string().required(),
    establecimientoOrigen: Joi.string().required(),
    establecimientoDestino: Joi.string().required(),
    fecha: Joi.date().required()
});

export const modificarMovimientoSchema = Joi.object({
    animal: Joi.string(),
    establecimientoOrigen: Joi.string(),
    establecimientoDestino: Joi.string(),
    fecha: Joi.date()
});