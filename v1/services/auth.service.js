import bcrypt from "bcryptjs";

import Usuario from "../models/usuario.model.js";

export async function registrarUsuario(datos) {

    const passwordHasheada = await bcrypt.hash(datos.password, 10);

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

    return usuario;
}