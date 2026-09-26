import Joi from "joi";

export const registroSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.base": "El username debe ser un texto",
        "string.empty": "El username no puede estar vacío",
        "any.required": "El username es obligatorio"
    }),

    password: Joi.string().min(6).required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "any.required": "La contraseña es obligatoria"
    })
});

export const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.base": "El username debe ser un texto",
        "string.empty": "El username no puede estar vacío",
        "any.required": "El username es obligatorio"
    }),

    password: Joi.string().required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria"
    })
});