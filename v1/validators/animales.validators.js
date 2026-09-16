import Joi from "joi";

export const crearAnimalSchema = Joi.object({
    caravana: Joi.string().required().messages({
        "string.base": "La caravana debe ser un texto",
        "string.empty": "La caravana no puede estar vacía",
        "any.required": "La caravana es obligatoria"
    }),

    raza: Joi.string().required().messages({
        "string.base": "La raza debe ser un texto",
        "string.empty": "La raza no puede estar vacía",
        "any.required": "La raza es obligatoria"
    }),

    peso: Joi.number().required().messages({
        "number.base": "El peso debe ser un número",
        "any.required": "El peso es obligatorio"
    }),

    establecimiento: Joi.string().required()
});

export const modificarAnimalSchema = Joi.object({
    caravana: Joi.string().messages({
        "string.base": "La caravana debe ser un texto",
        "string.empty": "La caravana no puede estar vacía",
    }),

    raza: Joi.string().messages({
        "string.base": "La raza debe ser un texto",
        "string.empty": "La raza no puede estar vacía",
    }),

    peso: Joi.number().messages({
        "number.base": "El peso debe ser un número",
    })
});