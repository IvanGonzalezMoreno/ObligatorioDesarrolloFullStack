import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import Usuario from "../models/usuario.model.js";

export async function registrarUsuario(datos) {

    const usuarioExistente = await Usuario.findOne({
        username: datos.username
    });

    if (usuarioExistente) {
        return null;
    }

    const passwordHasheada = await bcrypt.hash(datos.password, Number(process.env.SALT_ROUNDS));

    const usuario = await Usuario.create({
        username: datos.username,
        password: passwordHasheada
    });

    return usuario;
}

export async function iniciarSesion(datos) {

    const usuario = await Usuario.findOne({
        username: datos.username
    });

    if (!usuario) {
        return null;
    }

    const passwordCorrecta = await bcrypt.compare(
        datos.password,
        usuario.password
    );

    if (!passwordCorrecta) {
        return null;
    }

    const token = jwt.sign(
        {
            id: usuario._id,
            username: usuario.username,
            rol: usuario.rol,
            plan: usuario.plan
        },
        process.env.JWT_SECRET  ,
        {
            expiresIn: "1h"
        }
    );

    return {
        token
    };
}