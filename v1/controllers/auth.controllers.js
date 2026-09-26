import { registrarUsuario as registrarUsuarioService } from "../services/auth.service.js";

import { iniciarSesion as iniciarSesionService } from "../services/auth.service.js";

export async function registrarUsuario(req, res) {

    const usuario = await registrarUsuarioService(req.body);

    if (!usuario) {
        return res.status(409).json({
            error: "Ya existe un usuario con ese username"
        });
    }

    const usuarioRespuesta = {
        id: usuario._id,
        username: usuario.username,
        plan: usuario.plan,
        rol: usuario.rol
    };

    res.status(201).json(usuarioRespuesta);
}

export async function iniciarSesion(req, res) {

    const usuario = await iniciarSesionService(req.body);

    if (!usuario) {
        return res.status(401).json({
            error: "Usuario o contraseña incorrectos"
        });
    }

    res.status(200).json(usuario);
}